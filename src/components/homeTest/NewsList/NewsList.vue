<template>
  <div class="news">
    <div class="newList">
      <ul>
        <li v-for="(item, index) in news" :key="index" class="" @click="addClick(item)">
          <van-grid :gutter="0" :border="false" :column-num="1">
            <van-grid-item>
              <van-card
                :num="item.click + '点击'"
                :price="item.createTime | dateFormat"
                :desc="item.content"
                :title="item.title"
                :thumb="item.imgUrl"
                currency=""
                @click="routeTo(item)"
              />
            </van-grid-item>
          </van-grid>

        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {Toast} from "mint-ui";

export default {
  name: "newsList",
  data() {
    return {
      news: []
    }
  },
  created() {
    this.$axios.get("/api/news/list")
      .then(res => {
        if (res.data.result == 1) {
          console.log(res.data)
          this.news = res.data.datas
          console.log("news", this.news)
        } else {
          Toast('添加失败')
        }

      })
      .catch(err => {
        console.log('新闻列表数据异常', err)
      })
  },
  methods: {
    addClick(item) {
      this.$axios.get("/api/news/addClick/" + item.id)
        .then(res => {
          if (res.data.result == 1) {
            console.log(res.data)
            this.news = res.data.datas
            console.log("news", this.news)
          } else {
            Toast('添加失败')
          }
        })
        .catch(err => {
          console.log('addClick异常', err)
        })
    },
    routeTo(item) {
      this.$router.push({path: "/home/newsDetail/" + item.id})
    }
  }
}
</script>

<style scoped>
.mui-table-view li h1 {
  font-size: 14px;
  font-weight: bold;
}

.mui-table-view li h2 {
  font-size: 12px;
}

/deep/ .van-card__desc {
  width: 217px;
}

/deep/ .van-grid-item__content {
  padding: 5px;
}

/deep/ .van-grid {
  width: 100%;
}
</style>
