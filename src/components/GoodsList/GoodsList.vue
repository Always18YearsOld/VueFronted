<template>
  <div class="goods-list">
    <!--      <button type="button" @click="addGoods"/>-->
    <van-list
      style="height:600px;overflow: scroll;"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >

      <div class="good-item" v-for="(item, index) in goods" :key="index" @click="routeAndAddClick(item)">
        <div class="good-item-container">
          <img
            :src="item.imgUrls[0].imgUrl"
            alt="">
          <h1 class="title">{{ item.title }}</h1>
          <div class="info">
            <p class="price">
              <span class="now">￥{{ item.sellPrice }}</span>
              <span class="old">￥{{ item.marketPrice }}</span>
            </p>
            <p class="sell">
              <span>热卖中</span>
              <span>剩{{ item.stockQuantity }}件</span>
            </p>
          </div>
        </div>
      </div>
    </van-list>
    <!--  <div class="good-item" v-for="(item, index) in goods" :key="index" @click="routeAndAddClick(item)">
        <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fd.ifengimg.com%2Fw600%2Fp0.ifengimg.com%2Fpmop%2F2018%2F0815%2FF80D3EC96CFBCAF748BEDDCFBBA1450558FE9437_size40_w640_h800.jpeg&refer=http%3A%2F%2Fd.ifengimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617039597&t=22d03c0968e20e1cd41c855cd0cf95d9" alt="">
        <h1 class="title">{{ item.title }}</h1>
        <div class="info">
          <p class="price">
            <span class="now">￥{{ item.sellPrice }}</span>
            <span class="old">￥{{item.marketPrice}}</span>
          </p>
          <p class="sell">
            <span>热卖中</span>
            <span>剩{{item.stockQuantity}}件</span>
          </p>
        </div>
      </div>-->
  </div>
</template>

<script>
import {Toast} from "mint-ui";

export default {
  name: "goodsList",
  data() {
    return {
      loading: false,
      finished: false,
      goods: [],
      pageIndex: 1,
      size: 10
    }
  },
  methods: {
    addGoods() {
      this.$axios.get("/api/good/add")
        .then(res => {
          if (res.data.result == 1) {
          } else {
            Toast('添加失败')
          }

        })
        .catch(err => {
          console.log('商品列表数据异常', err)
        })
    },
    getGoodList() {
      setTimeout(() => {
        this.$axios.get(`/api/good/list?pageIndex=${this.pageIndex}&size=${this.size}`)
          .then(res => {
            if (res.data.result == 1) {
              this.goods.push(...res.data.data.content);
              this.pageIndex++
              this.total = res.data.data.totalElements
              // 加载状态结束
              this.loading = false;
              // 数据全部加载完成
              console.log(this.goods.length, "+++", this.total)
              if (this.goods.length >= this.total) {
                this.finished = true;
              }
            } else {
              Toast('添加失败')
            }

          })
          .catch(err => {
            console.log('商品列表数据异常', err)
          })
      }, 1000);
    },
    routeAndAddClick(item) {
      console.log(item)
      this.$router.push({path: "/home/goodDetail/" + item.id})
    },
    onLoad() {
      this.getGoodList()
    },
  }
}
</script>

<style scoped lang="less">
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 6px;
  justify-content: space-between;

  .good-item-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 334px;
  }

  .good-item {
    width: 49%;
    border: 1px solid #cccccc;
    box-shadow: 0 0 8px #cccccc;
    margin: 2px 1px;
    padding: 2px;
    display: inline-block;
  }

  img {
    width: 100%;
  }

  .title {
    font-size: 14px;
    font-weight: bold;
  }

  .info {
    background-color: #eeeeee;

    p {
      margin: 0;
      padding: 5px;
    }

    .price {
      .now {
        color: red;
        font-weight: bold;
        font-size: 16px;
      }

      .old {
        text-decoration: line-through;
      }
    }

    .sell {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
    }
  }
}

</style>
