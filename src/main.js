var WordCloud = require('./wordcloud2')
var spinCss = require('./css/spin.css')
var util = require('./util').default

const LODAING_WRAPPTER_HTML_PRE = '<div class="__wc_loading_wrapper__">' +
                                    '<div style="padding-left: 60px;" class="__wc_loading_wrapper_item__">' +
                                    '<div class="__wc_loading_wrapper_item_inner__">'
const LODAING_WRAPPTER_HTML_END = '</div></div></div>'

export class Js2WordCloud {
    constructor(element) {
        this._container = element
        this._wrapper = null
        this._canvas = null
        this._maskCanvas = null
        this._dataMask = null
        this._tooltip = null

        this._wordcloud2 = null
        this._option = null
        this._init()
    }

    setOption(option) {
        this._option = util.copy(option, true)
        var __originHoverCb = this._option.hover
        this._option.fontFamily = this._option.fontFamily || 'Microsoft YaHei,Helvetica,Times,serif'
        this._fixWeightFactor(this._option)
        this._maskCanvas = null
        var hoverCb = (item, dimension, event) => {
            if(item) {
                var html = item[0] + ': ' + item[1]
                if(typeof this._option.tooltip.formatter === 'function') {
                    html = this._option.tooltip.formatter(item)
                }
                this._tooltip.innerHTML = html
                this._tooltip.style.top = (event.offsetY + 10) + 'px'
                this._tooltip.style.left = (event.offsetX + 15) + 'px'
                this._tooltip.style.display = 'block'
                this._wrapper.style.cursor = 'pointer'
            } else {
                this._tooltip.style.display = 'none'
                this._wrapper.style.cursor = 'default'
            }
            __originHoverCb && __originHoverCb(item, dimension, event)
        }
        if (option.tooltip && option.tooltip.show === true) {
            if(!this._tooltip) {
                this._tooltip = window.document.createElement('div')
                this._tooltip.className="__wc_tooltip__"
                this._tooltip.style.backgroundColor = option.tooltip.backgroundColor || 'rgba(0, 0, 0, 0.701961)'
                this._tooltip.style.color = '#fff'
                this._tooltip.style.padding = '5px'
                this._tooltip.style.borderRadius = '5px'
                this._tooltip.style.fontSize = '12px'
                this._tooltip.style.fontFamily = option.fontFamily || this._option.fontFamily
                this._tooltip.style.lineHeight = 1.4
                this._tooltip.style.webkitTransition = 'left 0.2s, top 0.2s'
                this._tooltip.style.mozTransition = 'left 0.2s, top 0.2s'
                this._tooltip.style.transition = 'left 0.2s, top 0.2s'
                this._tooltip.style.position = 'absolute'
                this._tooltip.style.whiteSpace = 'nowrap'
                this._tooltip.style.zIndex = 999
                this._tooltip.style.display = 'none'
                this._wrapper.appendChild(this._tooltip)
                this._container.onmouseout = () => {
                    this._tooltip.style.display = 'none'
                }
            }
            this._option.hover = hoverCb
        }
        _sortWorldCloud(this._option);
        
        if (this._option && /\.(jpg|png)$/.test(this._option.imageShape)) {
            _imageShape.call(this, this._option)
        } else if (this._option.shape === 'circle') {
            _circle.call(this, this._option)
        } else {
            _renderShape.call(this, this._option)
        }
    }
    /**
     * 事件绑定
     * @todo
     */
    on() {

    }

    showLoading(loadingOption) {
        var loadingTxt;
        const DEFAULT_LOADING_TEXT = '正在加载...'
        const LOADING_LOGO_HTML = '<div class="__wc_loading__">' +
                                '<div></div>' +
                                '<div></div>' +
                                '<div></div>' +
                                '<div></div>' +
                                '<div></div>' +
                                '<div></div>' +
                                '<div></div>' +
                                '<div></div>' +
                            '</div>'
        if (loadingOption) {
            if(loadingOption.backgroundColor) {
                this._dataMask.style.backgroundColor = loadingOption.backgroundColor
            }
            loadingTxt = loadingOption.text === undefined ? DEFAULT_LOADING_TEXT : loadingOption.text
            if(loadingOption.effect === 'spin') {
                this._showMask(LODAING_WRAPPTER_HTML_PRE + LOADING_LOGO_HTML + loadingTxt + LODAING_WRAPPTER_HTML_END)
                var dom = this._dataMask.childNodes[0].childNodes[0]
                var paddingLeft = dom.style.paddingLeft
                dom.style.paddingLeft = (parseInt(paddingLeft) + 45) + 'px'
            } else {
                this._showMask(LODAING_WRAPPTER_HTML_PRE + loadingTxt + LODAING_WRAPPTER_HTML_END)
            }
        } else {
            this._showMask(LODAING_WRAPPTER_HTML_PRE + LOADING_LOGO_HTML + DEFAULT_LOADING_TEXT + LODAING_WRAPPTER_HTML_END)
        }
    }

    hideLoading() {
        if(this._dataMask) {
            this._dataMask.style.display = 'none'
        }
    }

    resize() {
        this._canvas.width = this._container.clientWidth
        this._canvas.height = this._container.clientHeight
        _renderShape.call(this, this._option)
        // this._wordcloud2 = WordCloud(this._canvas, this._option)
    }

    _init() {
        let width = this._container.clientWidth;
        let height = this._container.clientHeight;
        this._container.innerHTML = ''

        this._wrapper = window.document.createElement('div')
        this._wrapper.style.position = 'relative'
        this._wrapper.style.width = '100%'
        this._wrapper.style.height = 'inherit'

        this._dataMask = window.document.createElement('div')
        this._dataMask.height = 'inherit'
        this._dataMask.style.textAlign = 'center'
        this._dataMask.style.color = '#888'
        this._dataMask.style.fontSize = '14px'
        this._dataMask.style.position = 'absolute'
        this._dataMask.style.left = '0'
        this._dataMask.style.right = '0'
        this._dataMask.style.top = '0'
        this._dataMask.style.bottom = '0'
        this._dataMask.style.display = 'none'

        this._wrapper.appendChild(this._dataMask)
        this._container.appendChild(this._wrapper)

        this._canvas = window.document.createElement('canvas')
        this._canvas.width = width
        this._canvas.height = height
        this._wrapper.appendChild(this._canvas)
    }

    _fixWeightFactor(option) {
        option.maxFontSize = typeof option.maxFontSize === 'number' ? option.maxFontSize : 60
        option.minFontSize = typeof option.minFontSize === 'number' ? option.minFontSize : 12
        if(option.list && option.list.length > 0){
            var min = option.list[0][1]
            var max = 0
            for(var i = 0, len = option.list.length; i < len; i++ ) {
                if(min > option.list[i][1]) {
                    min = option.list[i][1]
                }
                if(max < option.list[i][1]) {
                    max = option.list[i][1]
                }
            }
            
            //用y=ax^r+b公式确定字体大小
            if(max > min){
                var r = typeof option.fontSizeFactor === 'number' ? option.fontSizeFactor : 1 / 10
                var a = (option.maxFontSize - option.minFontSize) / (Math.pow(max, r) - Math.pow(min, r))
                var b = option.maxFontSize - a * Math.pow(max, r)
                // var x = (option.maxFontSize - option.minFontSize) / (1 - min / max)
                // var y = option.maxFontSize - x
                option.weightFactor = function (size) {
                    return Math.ceil(a * Math.pow(size, r) + b)
                    // var s = Math.ceil((size / max) * x + y)
                    // return s
                }
            }else{
                option.weightFactor = function (size) {
                    return option.minFontSize
                }
            }
        }
    }

    _showMask(innerHTML) {
        if(this._dataMask) {
            this._dataMask.innerHTML = innerHTML
            if (innerHTML === '') {
                this._dataMask.style.display = 'none'
            } else {
                this._dataMask.style.display = 'block'
            }
        }
    }

    _dataEmpty() {
        return !this._option || !this._option.list || this._option.list.length <= 0
    }
}

function _sortWorldCloud(option) {
    option.list && option.list.sort((a, b) => b[1] - a[1])
}

function _renderShape(option) {
    if (this._maskCanvas) {
        option.clearCanvas = false

        /* Determine bgPixel by creating
         another canvas and fill the specified background color. */
        var bctx = window.document.createElement('canvas').getContext('2d')

        bctx.fillStyle = option.backgroundColor || '#fff'
        bctx.fillRect(0, 0, 1, 1)
        var bgPixel = bctx.getImageData(0, 0, 1, 1).data

        var maskCanvasScaled = window.document.createElement('canvas')
        maskCanvasScaled.width = this._canvas.width
        maskCanvasScaled.height = this._canvas.height
        var ctx = maskCanvasScaled.getContext('2d')

        ctx.drawImage(this._maskCanvas,
            0, 0, this._maskCanvas.width, this._maskCanvas.height,
            0, 0, maskCanvasScaled.width, maskCanvasScaled.height)

        var imageData = ctx.getImageData(0, 0, maskCanvasScaled.width, maskCanvasScaled.height)
        var newImageData = ctx.createImageData(imageData)
        for (var i = 0; i < imageData.data.length; i += 4) {
            if (imageData.data[i + 3] > 128) {
                newImageData.data[i] = bgPixel[0]
                newImageData.data[i + 1] = bgPixel[1]
                newImageData.data[i + 2] = bgPixel[2]
                newImageData.data[i + 3] = bgPixel[3]
            } else {
                // This color must not be the same w/ the bgPixel.
                newImageData.data[i] = bgPixel[0]
                newImageData.data[i + 1] = bgPixel[1]
                newImageData.data[i + 2] = bgPixel[2]
                newImageData.data[i + 3] = bgPixel[3] ? (bgPixel[3] - 1) : 1
            }
        }
        ctx.putImageData(newImageData, 0, 0)

        ctx = this._canvas.getContext('2d')
        ctx.clearRect(0, 0, this._canvas.width, this._canvas.height)
        ctx.drawImage(maskCanvasScaled, 0, 0);
    }

    if(this._dataEmpty() && option && option.noDataLoadingOption) {
        var STYLE = ''
        if(option.noDataLoadingOption.textStyle) {
            if(typeof option.noDataLoadingOption.textStyle.color === 'string') {
                STYLE += ('color: ' + option.noDataLoadingOption.textStyle.color + ';') 
            }
            if(typeof option.noDataLoadingOption.textStyle.fontSize === 'number') {
                STYLE += ('font-size: ' + option.noDataLoadingOption.textStyle.fontSize + 'px;') 
            }
        }
        if(typeof option.noDataLoadingOption.backgroundColor === 'string') {
            this._dataMask.style.backgroundColor = option.noDataLoadingOption.backgroundColor
        }
        var TEXT = option.noDataLoadingOption.text || ''
        this._showMask(LODAING_WRAPPTER_HTML_PRE + '<span class="__wc_no_data_text__" style="' + STYLE + '">' + TEXT + '</span>' + LODAING_WRAPPTER_HTML_END)
    } else {
        this._showMask('');
        this._wordcloud2 = WordCloud(this._canvas, option)
    }
}


function _circle(option) {
    this._maskCanvas = window.document.createElement('canvas')
    this._maskCanvas.width = 500
    this._maskCanvas.height = 500
    var ctx = this._maskCanvas.getContext('2d')
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.arc(250, 250, 240, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.fill()

    var imageData = ctx.getImageData(
        0, 0, this._maskCanvas.width, this._maskCanvas.height)
    var newImageData = ctx.createImageData(imageData)

    for (var i = 0; i < imageData.data.length; i += 4) {
        var tone = imageData.data[i] +
            imageData.data[i + 1] +
            imageData.data[i + 2]
        var alpha = imageData.data[i + 3]

        if (alpha < 128 || tone > 128 * 3) {
            // Area not to draw
            newImageData.data[i] =
                newImageData.data[i + 1] =
                    newImageData.data[i + 2] = 255
            newImageData.data[i + 3] = 0
        } else {
            // Area to draw
            newImageData.data[i] =
                newImageData.data[i + 1] =
                    newImageData.data[i + 2] = 0
            newImageData.data[i + 3] = 255
        }
    }
    ctx.putImageData(newImageData, 0, 0)
    _renderShape.call(this, option)
}

function _imageShape(option) {
    var img = window.document.createElement('img')
    img.crossOrigin = "Anonymous"
    img.onload = () => {
        this._maskCanvas = window.document.createElement('canvas')
        this._maskCanvas.width = img.width
        this._maskCanvas.height = img.height

        var ctx = this._maskCanvas.getContext('2d')
        ctx.drawImage(img, 0, 0, img.width, img.height)

        var imageData = ctx.getImageData(
            0, 0, this._maskCanvas.width, this._maskCanvas.height)
        var newImageData = ctx.createImageData(imageData)

        for (var i = 0; i < imageData.data.length; i += 4) {
            var tone = imageData.data[i] +
                imageData.data[i + 1] +
                imageData.data[i + 2];
            var alpha = imageData.data[i + 3];

            if (alpha < 128 || tone > 128 * 3) {
                // Area not to draw
                newImageData.data[i] =
                    newImageData.data[i + 1] =
                        newImageData.data[i + 2] = 255;
                newImageData.data[i + 3] = 0;
            } else {
                // Area to draw
                newImageData.data[i] =
                    newImageData.data[i + 1] =
                        newImageData.data[i + 2] = 0;
                newImageData.data[i + 3] = 255;
            }
        }
        ctx.putImageData(newImageData, 0, 0);
        _renderShape.call(this, option);
    };

    img.onerror = function(){
        _renderShape.call(this, option);
    };
    img.src = option.imageShape;
}

module.exports = Js2WordCloud