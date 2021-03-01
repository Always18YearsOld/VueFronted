// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import Axios from 'axios'

Vue.config.productionTip = false

// 引入mint-ui全部组件和CSS样式
import Mint from 'mint-ui';
import Vant from 'vant';
import { Lazyload } from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.use(Mint);
import 'mint-ui/lib/style.css'

import '../static/css/global.css'
import 'bootstrap/dist/css/bootstrap.css'

import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//配置axios
Vue.prototype.$axios = Axios;
Axios.defaults.baseURL = 'http://127.0.0.1:8888'

// 导入格式化时间的插件
import moment from 'moment'
// 定义全局的过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})

// 注册时设置`lazyComponent`选项
Vue.use(Lazyload, {
  lazyComponent: true,
});


/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
