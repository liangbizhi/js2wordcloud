# js2wordcloud.js

JavaScript生成词云图。基于[wordcloud2.js](https://github.com/timdream/wordcloud2.js)

由于baidu Echarts 2出现值较小，甚至值相同时会出现字符重叠的BUG；wordcloud2.js能较好解决这个问题，但某些功能仍未能满足项目需求，故在此进行二次封装。

## Installation

简单地，可以通过`script`标签引入：

```html
<script src="dist/js2wordcloud.js"></script>
```

npm安装：

```bash
npm install js2wordcloud --save
```

## Usage

查看`index.html`，点击查看[demo](http://liangbizhi.github.io/js2wordcloud)

## Features

* 支持tooltip。包括tooltip的开关和数据格式化formatter；
* 支持showLoading和hideLoading加载数据loading；
* 支持resize。

## Document

### Options

在options原基础上增加：

```javascript
{
    // ...
    tooltip: {
        show: true,                                 // 默认：false
        formatter: function(item) {                 // 数据格式化函数，item为list的一项
        }
    }
    // ...
}
```

### API

* setOption(options)

options必须通过此API进行调用，才能显示词云

* showLoading()

显示loading

* hideLoading()

隐藏loading



