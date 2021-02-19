// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import Axios from 'axios'

Vue.config.productionTip = false

// 引入mint-ui全部组件和CSS样式
import Mint from 'mint-ui';

Vue.use(Mint);
import 'mint-ui/lib/style.css'

import '../static/css/global.css'
import 'bootstrap/dist/css/bootstrap.css'

import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//配置axios
Vue.prototype.$axios = Axios;
Axios.defaults.baseURL = 'http://localhost:8888'


/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
