import CryptoJS from "crypto-js";
import $ from 'jquery'
export default {
    path:'',
    set_font(num){
        // 计算、转换布局单位
        var html = document.getElementsByTagName('html')[0];
        var designFontSize = 100;
        var designWidth = 750;
        if (num) {
          designWidth = num;
        }
        function setFontSize() {
          var winWidth = document.documentElement.getBoundingClientRect().width;
          var fontSize = winWidth / designWidth * designFontSize;

          html.style.fontSize = fontSize + 'px';
        }
        setFontSize();
        window.addEventListener('resize', function () {
          setFontSize();
        });
        return this;
    },
    getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURI(r[2]);
      return ''
    },
    CountDown(obj) {
      var t = 60;
      obj.html(t + '秒后重发');
      var timer = setInterval(function () {
        if (t == 0) {
          obj.html('获取验证码');
          obj.removeClass('on').addClass('normal');
          clearInterval(timer);
        } else {
          obj.html(t + '秒后重发');
          t--;
        }

      }, 1000)
    },
    is_weixin() {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/micromessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    },
    //base64加密
    base64encode(str) {
      var encryptedHexStr = CryptoJS.enc.Utf8.parse(str);
      var words = CryptoJS.enc.Base64.stringify(encryptedHexStr);
      return words
    },
    //base64解密
    base64decode(str) {
      var words = CryptoJS.enc.Base64.parse(str);
      words = words.toString(CryptoJS.enc.Utf8);
      return words
    },
    putUser(rs) {
      localStorage['yes'] = base64encode(JSON.stringify(rs))
    },
    getUser(rs) {
      return rs ? (localStorage['yes']?JSON.parse(base64decode(localStorage['yes']))[rs]:''): (localStorage['yes']?JSON.parse(base64decode(localStorage['yes'])):'')
    },
    clearUser() {
      localStorage.clear()
    },
    editUser(res, val) {
      var data = JSON.parse(base64decode(localStorage['yes']));
      data[res] = val;
      putUser(data)
    },
    putToken(res) {
      localStorage['yesToken'] = base64encode(res.UserName + ':' + res.DynamicToken);
    },
    toSignin(back,url) {
      var from = back || (location.pathname + location.search);
      // if (is_weixin()) {
      //   window.location.replace('/WeiXin/Login' + (from ? ('?backUrl=' + from) : ''));
      // } else {
        window.location.replace(url || 'sign.html' + (from ? ('?from=' + base64encode(from)) : ''))
      // }
    },
    //检查是否登录，并且拼接head
    checkUser(){
      window.TOKEN = localStorage['yesToken'];
      if (window.TOKEN) {
        $.ajaxSetup({
          headers: {
            Authorization: 'Basic ' + window.TOKEN,
            Platform: 2
          }
        })
      } else {
        toSignin()
      }
    }
}
