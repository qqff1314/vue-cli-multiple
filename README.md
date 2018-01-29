# vue-cli-multiple

>基于最新的 vue-cli 2.8.1 vue 2.5.2 修改多页面脚手架

[mint-ui](http://mint-ui.github.io/#!/zh-cn)
[axios](https://github.com/axios/axios)

### 页面

```
--src
  |---module
    |---index
      |---App.vue
      |---index.html
      |---index.js
```

在/src/module下创建每个模块，命名为FileName。在命名为FileName文件夹下，创建命名为FileName.html 、 FileName.js  和 App.vue。

#### FileName.js
```
import Vue from 'vue'
import App from './App.vue'
import 'mint-ui/lib/style.css';  #引用 mint-ui css
import '../../assets/css/reset.css'  #引用公用 css
import axiosPlugin from "../../utils/axios";  #引用封装过的axios
import { Toast , MessageBox , Indicator } from 'mint-ui'  #引用mint-ui 基本弹窗、加载动画
import plus from '../../utils/public'  #引用公共方法

plus.set_font()  #rem
Vue.use(axiosPlugin);  #vue 加载 封装后的axios插件

#将mint-ui 基本弹窗、加载动画挂到vue原型上，
Vue.prototype.$toast = Toast
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$loading = Indicator


new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
})
```

### 跨域

#### /config/index.js

```
dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api':{
        target:API_URL,
        changeOrigin:true,
        pathRewrite:{
          '^/api':'/'
        }
      }
    },
```
在API_URL 输入测试接口地址，若接口为 /user/login
```
例：
$.ajax({
  url:'/api/user/login',
  ....
})

```
提示：配置完成需要重启服务

### 下载依赖模块

``` bash
# install dependencies
npm install 或 cnpm i

```

### 启动服务

``` bash

# serve with hot reload at localhost:8080
npm run dev

```
打开浏览器输入 localhost:8080/module/FileName.html
例 ： localhost:8080/module/index.html


### 快速生成模板

``` bash

node mkt.js Type FileName
# node mkt.js t1 center

```
Type 目前有t1、t2。t1 是vue单页风格的组件写法， t2 是传统的vue + jquery


### 打包

``` bash

# build for production with minification
npm run build

```

