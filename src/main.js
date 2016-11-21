var WordCloud = require('./wordcloud2')

export class Js2WordCloud {
    constructor(element) {
        this._container = window.document.getElementById(element)
        this._wrapper = null
        this._canvas = null
        this._loadingMask = null
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
        this._wordcloud2 = WordCloud(this._canvas, option)
    }
    /**
     * 事件绑定
     * @todo
     */
    on() {

    }

    showLoading() {
        if(this._loadingMask) {
            this._loadingMask.style.display = 'block'
        }
    }

    hideLoading() {
        this._wrapper && this._wrapper.removeChild(this._loadingMask)
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

        this._loadingMask = window.document.createElement('div')
        this._loadingMask.style.backgroundColor = '#eee'
        this._loadingMask.height = 'inherit'
        this._loadingMask.style.lineHeight = height + 'px'
        this._loadingMask.style.textAlign = 'center'
        this._loadingMask.style.color = '#888'
        this._loadingMask.style.position = 'absolute'
        this._loadingMask.style.left = '0'
        this._loadingMask.style.right = '0'
        this._loadingMask.innerHTML = '正在加载...'
        this._loadingMask.display = 'none'

        this._wrapper.appendChild(this._loadingMask)
        this._container.appendChild(this._wrapper)

        this._canvas = window.document.createElement('canvas')
        this._canvas.width = width
        this._canvas.height = height
        this._wrapper.appendChild(this._canvas)
    }
}

module.exports = Js2WordCloud