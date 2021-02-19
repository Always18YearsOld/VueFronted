<template>
  <div id="app">

    <mt-header fixed title="信息管理系统">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <transition>
      <router-view></router-view>
    </transition>

    <nav class="mui-bar mui-bar-tab">
      <router-link to="/home" class="mui-tab-item">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link to="/vip" class="mui-tab-item">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link to="/cart" class="mui-tab-item">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">0</span></span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link to="/search" class="mui-tab-item">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>

import index from "./assets/guide.png"
import vip from "./assets/发公告.png"
import cart from "./assets/发布服务.png"
import search from "./assets/发布需求.png"

let tabs = [
  {id: 1, title: "首页", imgSrc: index, routerName: {name: 'home'}},
  {id: 1, title: "会员", imgSrc: vip, routerName: {name: 'vip'}},
  {id: 1, title: "购物车", imgSrc: cart, routerName: {name: 'cart'}},
  {id: 1, title: "查找", imgSrc: search, routerName: {name: 'search'}},
]


export default {
  name: 'App',
  data() {
    return {
      selected: "home",
      tabs: tabs
    }
  },
  watch: {
    selected: function (newV, oldV) {
      console.log(newV)
      this.$router.push({name: this.selected})
    }
  },
  created() {
  }
}
</script>

<style>
#app {
  overflow-x: hidden;
}
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
</style>
