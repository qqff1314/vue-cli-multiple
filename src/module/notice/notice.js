
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
})