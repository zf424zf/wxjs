// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import Resource from 'vue-resource'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import store from './vuex/store'
import BaiduMap from 'vue-baidu-map'
import {ApiRoute} from './api';
import axios from 'axios';
import  { ToastPlugin,ConfirmPlugin } from 'vux'

axios.defaults.withCredentials=true ;
Vue.prototype.$axios = axios;

Vue.prototype.ApiRoute = ApiRoute
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: '9C9IZhpKNEP9SqbCTUI5ASG54ksrYFfc'
})
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Resource)
Vue.use(Vuex);
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

// const router = new VueRouter({ ... })

