import axios from "axios";
import qs from "qs";
import { Toast } from 'mint-ui'

const Axios = axios.create({
//   baseURL: "http://test.adsuper.cn:8084/najin_api/v1/",
  baseURL:'/api/',
  timeout: 10000,
  responseType: "json",
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
  }
});

//POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(
  config => {
    // 在发送请求之前做某件事
    if (
      config.method === "post" ||
      config.method === "put" ||
      config.method === "delete"
    ) {
      // 序列化
      config.data = qs.stringify(config.data);
    }

    if (localStorage.token) {
      config.headers.Authorization = localStorage.token;
    }
    return config;
  },
  error => {
    Toast(error)
    return Promise.reject(error.data.error.message);
  }
);

//返回状态判断(添加响应拦截器)
// Axios.interceptors.response.use(
//   res => {
//     if (res.data.ReturnCode != '200') {
//         if (res.data.ReturnCode == '0011') {
//             Toast('登录失效，请重新登录');
//             setTimeout(() => {
//               window.location.href = './login.html'
//             },1000)
//
//         } else {
//             Toast(res.data.Msg);
//         }
//         return Promise.reject(res.data.Msg);
//     }
//     return res;
//   },
//   error => {
//
//   }
// );

// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
  install: function(Vue, Option) {
    Object.defineProperty(Vue.prototype, "$http", { value: Axios });
  }
};
