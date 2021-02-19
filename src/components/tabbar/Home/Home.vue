<template>
  <div id="home">
    <!--  轮播图  -->
    <mt-swipe :auto="4000" style="height: 200px" class="swiper">
      <mt-swipe-item v-for="(item, index) in imgs" :key="index">
        <img :src="item.imgUrl"/>
      </mt-swipe-item>
    </mt-swipe>

    <div class="list">
      <ul>
        <li v-for="(item, index) in grids" :key="item.id">
          <router-link :to="item.router">
            <img :src="item.src"/>
          </router-link>
          <p>{{ item.title }}</p>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>

import src1 from '../../../assets/1.png'
import src2 from '../../../assets/1.png'
import src3 from '../../../assets/1.png'
import src4 from '../../../assets/1.png'
import src5 from '../../../assets/1.png'
import src6 from '../../../assets/1.png'

var grids = [
  {id: 19, src: src1, title: '新闻资讯', router: {name: 'newsList'}},
  {id: 20, src: src2, title: '图片分享', router: {name: 'marquee'}},
  {id: 21, src: src3, title: '商品购买', router: {name: 'newsList'}},
  {id: 22, src: src4, title: '留言反馈', router: {name: 'comment'}},
  {id: 23, src: src5, title: '视频专区', router: {name: 'newsList'}},
  {id: 24, src: src6, title: '联系我们', router: {name: 'newsList'}},
  {id: 1, src: src1, title: '新闻资讯', router: {name: 'newsList'}},
  {id: 2, src: src2, title: '跑马灯', router: {name: 'marquee'}},
  {id: 3, src: src3, title: '品牌列表', router: {name: 'brandList'}},
  {id: 4, src: src4, title: '在线列表', router: {name: 'brandListRequest'}},
  {id: 5, src: src5, title: '动画效果', router: {name: 'cartoon'}},
  {id: 6, src: src6, title: '评论', router: {name: 'comment'}},
  {id: 7, src: src1, title: '子路由', router: {name: 'account'}},
  {id: 8, src: src2, title: '经典布局', router: {name: 'classicLayout'}},
  {id: 9, src: src3, title: '名称绑定', router: {name: 'nameBind'}},
  {id: 10, src: src4, title: '资讯', router: {name: 'newsList'}},
  {id: 11, src: src5, title: '留言反馈', router: {name: 'newsList'}},
  {id: 12, src: src6, title: '联系我们', router: {name: 'newsList'}},
  {id: 13, src: src1, title: '新闻资讯', router: {name: 'newsList'}},
  {id: 14, src: src2, title: '跑马灯', router: {name: 'marquee'}},
  {id: 15, src: src3, title: '商品展示', router: {name: 'newsList'}},
  {id: 16, src: src4, title: '资讯', router: {name: 'newsList'}},
  {id: 17, src: src5, title: '留言反馈', router: {name: 'newsList'}},
  {id: 18, src: src6, title: '联系我们', router: {name: 'newsList'}},
]


export default {
  name: 'home',
  data() {
    return {
      imgs: [],
      grids: grids
    }
  },
  watch: {
    selected: function (newV, oldV) {
      console.log(newV)
      this.$router.push({name: this.selected})
    }
  },
  created() {
    this.$axios.get('/api/banner/list')
      .then(res => {
        console.log(res.data)
        this.imgs = res.data.datas
        console.log("imgs", this.imgs)
      })
      .catch(err => {
        console.log('轮播图数据异常', err)
      })
  }
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

.swiper img {
  width: 100%;
  height: 200px;
}

.list {
  width: 100%;
  height: 100%;
}

.list ul {
  display: flex;
  flex-wrap: wrap;
}

.list ul li {
  width: 33%;
  height: 100px;
  text-align: center;
  font-size: 14px;
}

.list ul li a {
  display: inline-block;
  width: 50px;
  height: 50px;
  margin: 0 auto;
}

.list ul li a img {
  width: 50px;
}
body {
  background-color: #fff;
}
</style>
