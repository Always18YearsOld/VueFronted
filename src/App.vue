<template>
  <div id="app">

    <van-nav-bar
      title="信息管理系统"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="$router.back(-1)"
      @click-right="onClickRight"
      fixed
      placeholder
    />

    <transition>
      <router-view></router-view>
    </transition>

    <van-tabbar route v-show="$route.meta.showBottomTabBar">
      <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/vip" icon="search">会员</van-tabbar-item>
      <van-tabbar-item replace to="/cart" icon="home-o" badge="0">购物车</van-tabbar-item>
      <van-tabbar-item replace to="/search" icon="search">搜索</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  name: 'App',
  data() {
    return {
      selected: "home",
      count: "0"
    }
  },
  watch: {
    selected: function (newV, oldV) {
      console.log(newV)
      this.$router.push({name: this.selected})
    }
  },
  created() {
  },
  methods: {
    onClickLeft() {
      Toast('返回');
    },
    onClickRight() {
      Toast('按钮');
    },
  },
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
