const fs = require('fs');
const type = process.argv[2]
const name = process.argv[3]

mkdir()
mkhtml()
if(type === 't1'){
    mkvue()
    mkjst1()
}
if(type === 't2'){
    mkjst2()
    mkcss()
}

//创建文件夹
function mkdir(){
    fs.mkdir(`${__dirname}/src/module/${name}`,(err) => {
        if(err){
            throw err;
        }
    })
}

//创建html文件
function mkhtml(){
    let cloak = type == 't2' ? ' v-cloak' : ''
    fs.writeFile(`${__dirname}/src/module/${name}/${name}.html`,`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="content-language" content="zh-CN" />
    <meta http-equiv="keywords" content="">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="keywords" content="" />
    <meta name="description" content="" />
    <meta name="author" content="杭州博采网络科技股份有限公司-http://www.bocweb.cn" />
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title></title>
</head>
<body>
    <div id="app"${cloak}>
        
    </div>
</body>
</html>
    `,(err) => {
        if(err){
            console.log("html写入失败")
        }else{
            console.log("html写入成功");
   
        }
    })
}

//创建vue文件
function mkvue(){
    fs.writeFile(`${__dirname}/src/module/${name}/App.vue`,`
<template>
  <div></div>
</template>
<script>
    export default {
        data(){
            return{

            }
        },
        mounted(){
            
        },
        methods:{

        },
        components: {
            
        },
    }
</script>
<style lang="scss">

</style>`,(err) => {
        if(err){
            console.log("App.vue写入失败")
        }else{
            console.log("App.vue写入成功");
   
        }
    })
}

//创建t1 js
function mkjst1(){
    fs.writeFile(`${__dirname}/src/module/${name}/${name}.js`,`
import Vue from 'vue'
import App from './App.vue'
import 'mint-ui/lib/style.css';
import '../../assets/css/reset.css'
import axiosPlugin from "../../utils/axios"; 
import { Toast , MessageBox , Indicator } from 'mint-ui'
import plus from '../../utils/public'

plus.set_font()
Vue.use(axiosPlugin);

Vue.prototype.$toast = Toast
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$loading = Indicator

new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
})`,(err) => {
        if(err){
            console.log("js写入失败")
        }else{
            console.log("js写入成功");
        }
    })
}

//创建t2 js
function mkjst2(){
    fs.writeFile(`${__dirname}/src/module/${name}/${name}.js`,`
import Vue from 'vue'
import 'mint-ui/lib/style.css';
import '../../assets/css/reset.css'
import { Toast , MessageBox , Indicator } from 'mint-ui'
import $ from 'jquery'
import plus from '../../utils/public'

plus.set_font()
Vue.prototype.$toast = Toast
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$loading = Indicator

$(function(){
    new Vue({
        el:'#app',
        data:{
            
        },
        mounted(){
            
        },
        methods:{
    
        },
        components:{
                
        },
    })
})`,(err) => {
        if(err){
            console.log("js写入失败")
        }else{
            console.log("js写入成功");
   
        }
    })
}

//创建css
function mkcss(){
    fs.writeFile(`${__dirname}/src/module/${name}/${name}.css`,`/* ${name}.css */`,{flag:'w',encoding:'utf-8',mode:'0666'},(err) => {
    if(err){
        console.log("css写入失败")
    }else{
        console.log("css写入成功");

    }
})
}