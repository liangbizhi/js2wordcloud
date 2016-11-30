var WordCloud = require('./wordcloud2')
var spinCss = require('./css/spin.css')

export class Js2WordCloud {
    constructor(element) {
        this._container = element
        this._wrapper = null
        this._canvas = null
        this._dataMask = null
        this._tooltip = null

        this._wordcloud2 = null
        this._option = null
        this._init()
    }

    setOption(option) {
        var __originHoverCb = option.hover
        var self = this
        option.fontFamily = option.fontFamily || 'Microsoft YaHei,Helvetica,Times,serif'
        self._fixWeightFactor(option)
        var hoverCb = function(item, dimension, event) {
            if(item) {
                var html = item[0] + ': ' + item[1]
                if(typeof option.tooltip.formatter === 'function') {
                    html = option.tooltip.formatter(item)
                }
                self._tooltip.innerHTML = html
                self._tooltip.style.top = (event.offsetY + 10) + 'px'
                self._tooltip.style.left = (event.offsetX + 15) + 'px'
                self._tooltip.style.display = 'block'
                self._wrapper.style.cursor = 'pointer'
            } else {
                self._tooltip.style.display = 'none'
                self._wrapper.style.cursor = 'default'
            }
            __originHoverCb && __originHoverCb(item, dimension, event)
        }
        if (option.tooltip && option.tooltip.show === true) {
            if(!this._tooltip) {
                this._tooltip = window.document.createElement('div')
                this._tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.701961)'
                this._tooltip.style.color = '#fff'
                this._tooltip.style.padding = '5px'
                this._tooltip.style.borderRadius = '5px'
                this._tooltip.style.fontSize = '12px'
                this._tooltip.style.fontFamily = option.fontFamily
                this._tooltip.style.lineHeight = 1.4
                this._tooltip.style.webkitTransition = 'left 0.2s, top 0.2s'
                this._tooltip.style.mozTransition = 'left 0.2s, top 0.2s'
                this._tooltip.style.transition = 'left 0.2s, top 0.2s'
                this._tooltip.style.position = 'absolute'
                this._tooltip.style.whiteSpace = 'nowrap'
                this._tooltip.style.zIndex = 999
                this._tooltip.style.display = 'none'
                this._wrapper.appendChild(this._tooltip)
                this._container.onmouseout = function() {
                    self._tooltip.style.display = 'none'
                }
            }
            option.hover = hoverCb
        }

        this._option = option
        if(this._dataEmpty() && option.noDataLoadingOption) {
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
                this._wrapper.style.backgroundColor = option.noDataLoadingOption.backgroundColor
            }
            var TEXT = option.noDataLoadingOption.text || ''
            this._showMask('<span class="__wc_no_data_text__" style="' + STYLE + '">' + TEXT + '</span>')
        } else {
            this._showMask('');
            this._wordcloud2 = WordCloud(this._canvas, option)
        }
    }
    /**
     * 事件绑定
     * @todo
     */
    on() {

    }

    showLoading(loadingOption) {
        var DEFAULT_LOADING_TEXT = '正在加载...'
        var LOADING_TEXT_HTML_PRE = '<span class="__wc_loadding_text__">'
        var LODAING_WRAPPTER_HTML_PRE = '<div class="__wc_loading_wrapper__">'
        var LOADING_LOGO_HTML = '<div class="__wc_loading__">' +
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
            if(typeof loadingOption.text === 'string') {
                LOADING_TEXT_HTML_PRE += (loadingOption.text + '</span>')
            } else {
                LOADING_TEXT_HTML_PRE += (DEFAULT_LOADING_TEXT + '</span>')
            }
            if(loadingOption.effect === 'spin') {
                this._showMask(LODAING_WRAPPTER_HTML_PRE + LOADING_LOGO_HTML + LOADING_TEXT_HTML_PRE + '</div>')
            } else {
                this._showMask(LOADING_TEXT_HTML_PRE += (typeof loadingOption.text === 'string' ? loadingOption.text : DEFAULT_LOADING_TEXT + '</span>'))
            }
        } else {
            this._showMask(LODAING_WRAPPTER_HTML_PRE + LOADING_LOGO_HTML + LOADING_TEXT_HTML_PRE + DEFAULT_LOADING_TEXT + '</span></div>')
        }
    }

    hideLoading() {
        if(this._dataMask) {
            this._dataMask.style.display = 'none'
        }
    }

    resize() {
        if(!this._dataEmpty()) {
            this._canvas.width = this._container.clientWidth
            this._canvas.height = this._container.clientHeight
            this._wordcloud2 = WordCloud(this._canvas, this._option)
        }
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
        this._dataMask.style.lineHeight = height + 'px'
        this._dataMask.style.textAlign = 'center'
        this._dataMask.style.color = '#888'
        this._dataMask.style.fontSize = '14px'
        this._dataMask.style.position = 'absolute'
        this._dataMask.style.left = '0'
        this._dataMask.style.right = '0'
        this._dataMask.display = 'none'

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
            this._dataMask.style.display = 'block'
        }
    }

    _dataEmpty() {
        return !this._option || !this._option.list || this._option.list.length <= 0
    }
}

module.exports = Js2WordCloud