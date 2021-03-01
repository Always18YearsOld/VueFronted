<template>
  <div class="good-detail">
    <!--  轮播图  -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item, index) in good.imgUrl" :key="index">
        <img v-lazy="item.imgUrl" style="height: 200px;max-width: 100%"/>
      </van-swipe-item>
    </van-swipe>
    <div>{{ this.id }}</div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" dot />
      <van-goods-action-icon icon="cart-o" text="购物车" badge="5" @click="toCart" />
      <van-goods-action-icon icon="shop-o" text="店铺" badge="12" />
      <van-goods-action-button type="warning" text="加入购物车" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  name: "goodsDetail",
  data() {
    return {
      id: this.$route.params.id,
      good: {
        id: '',
        click: '',
        content: '',
        createTime: '',
        imgUrl: [],
        marketPrice: '',
        sellPrice: '',
        stockQuantity: '',
        title: ''
      },
    }
  },
  methods: {
    toCart(){
      this.$router.push("/cart")
    }
  },
  created: function () {
    console.log(this.id)
    this.$axios.get("/api/good/one?id=" + this.id)
      .then(res => {
        if (res.data.result == 1) {
          this.good.id = res.data.data.id
          this.good.click = res.data.data.click
          this.good.content = res.data.data.content
          this.good.createTime = res.data.data.createTime
          this.good.marketPrice = res.data.data.marketPrice
          this.good.sellPrice = res.data.data.sellPrice
          this.good.stockQuantity = res.data.data.stockQuantity
          this.good.title = res.data.data.title
          this.good.imgUrl = res.data.data.imgUrls
          console.log('imgUrl',this.good.imgUrl)
        } else {
          Toast('获取商品失败！')
        }
      })
      .catch(err => {
        Toast('获取新闻失败！' + err)
      })
  }
}
</script>

<style scoped>
body {
  background-color: #cccccc;
}
/deep/ .van-swipe-item {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
