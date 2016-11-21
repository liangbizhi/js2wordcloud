var WordCloud = require('./wordcloud2')

export class Js2WordCloud {
    constructor(element) {
        this._container = window.document.getElementById(element)
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
                this._tooltip.style.backgroundColor = '#555'
                this._tooltip.style.color = '#fff'
                this._tooltip.style.padding = '10px'
                this._tooltip.style.borderRadius = '5px'
                this._tooltip.style.fontSize = '14px'
                this._tooltip.style.fontFamily = option.fontFamily
                this._tooltip.style.lineHeight = 1.4
                this._tooltip.style.transition = 'all 0.1s ease-out'
                this._tooltip.style.position = 'absolute'
                this._tooltip.style.whiteSpace = 'nowrap'
                this._tooltip.style.display = 'none'
                this._wrapper.appendChild(this._tooltip)
                this._container.onmouseout = function() {
                    self._tooltip.style.display = 'none'
                }
            }
            option.hover = hoverCb
        }

        this._option = option
        if(!option.list || option.list.length <= 0) {
            this._showMask('暂无数据')
        } else {
            this._wordcloud2 = WordCloud(this._canvas, option)
        }
    }
    /**
     * 事件绑定
     * @todo
     */
    on() {

    }

    showLoading() {
        this._showMask('正在加载...')   
    }

    hideLoading() {
        if(this._dataMask) {
            this._dataMask.style.display = 'none'
        }
    }

    resize() {
        this._canvas.width = this._container.clientWidth
        this._canvas.height = this._container.clientHeight
        this._wordcloud2 = WordCloud(this._canvas, this._option)
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
        this._dataMask.style.backgroundColor = '#eee'
        this._dataMask.height = 'inherit'
        this._dataMask.style.lineHeight = height + 'px'
        this._dataMask.style.textAlign = 'center'
        this._dataMask.style.color = '#888'
        this._dataMask.style.position = 'absolute'
        this._dataMask.style.left = '0'
        this._dataMask.style.right = '0'
        this._dataMask.innerHTML = '正在加载...'
        this._dataMask.display = 'none'

        this._wrapper.appendChild(this._dataMask)
        this._container.appendChild(this._wrapper)

        this._canvas = window.document.createElement('canvas')
        this._canvas.width = width
        this._canvas.height = height
        this._wrapper.appendChild(this._canvas)
    }

    _showMask(info) {
        if(this._dataMask) {
            this._dataMask.innerHTML = info
            this._dataMask.style.display = 'block'
        }
    }
}

module.exports = Js2WordCloud