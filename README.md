# js2wordcloud.js

[![Build](https://img.shields.io/travis/liangbizhi/js2wordcloud.svg)](https://travis-ci.org/liangbizhi/js2wordcloud)
[![Github Releases](https://img.shields.io/github/downloads/liangbizhi/js2wordcloud/latest/total.svg)]()
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

[![NPM](https://nodei.co/npm/js2wordcloud.png)](https://nodei.co/npm/js2wordcloud/)

JavaScript生成词云图。基于[wordcloud2.js](https://github.com/timdream/wordcloud2.js)

由于Baidu Echarts 2的词云图在设置值较小、值相同的词语时，会出现字符重叠的问题；而又在不能使用Ecahrts 3的情况下……

wordcloud2.js能较好解决这个问题，但某些功能仍未能满足项目需求，故在此进行二次封装，做一些微小的工作。

## Installation

* 通过`script`标签引入：

```html
<script src="dist/js2wordcloud.js"></script>
```

* npm安装：

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

## Licence

MIT

