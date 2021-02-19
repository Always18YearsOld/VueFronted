<template>
  <div class="news">
    <div class="newList">
      <ul>
        <li v-for="(item, index) in news" :key="index">
          <a href="#">
            <div class="new_img">
              <img :src="item.imgUrl"/>
            </div>
            <div class="content">
              <p class="title">{{ item.title }}</p>
              <div class="news-desc">
                <p class="summary">{{ item.describe }}</p>
                <p>
                  <span class="praise">点赞数：{{ item.click }}</span>
                  <span class="time">发表时间：{{ item.createTime }}</span>
                </p>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "newsList",
  data() {
    return {
      news: []
    }
  }
  ,
  created() {
    this.$axios.get("/api/news/list")
      .then(res => {
        console.log(res.data)
        this.news = res.data.datas
        console.log("news", this.news)
      })
      .catch(err => {
        console.log('新闻列表数据异常', err)
      })
  }
}
</script>

<style scoped>
.news {
  padding-bottom: 120px;
  width: 100%;
}

.newList {
  width: 100%;
  font-size: 12px;
}

.newList ul li {
  position: relative;
  border-bottom: 1px solid #CCCCCC;
}

.newList ul li a {
  /*display: block;*/
  width: 100%;
  height: 120px;
  color: #808080;
  display: flex;
  text-decoration: none;
}

.new_img {
  width: 30%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.newList ul li a img {
  box-sizing: border-box;
  width: 100%;
  height: 80px;
  padding: 0 10px;
}

.newList ul li a .content {
  width: 70%;
  box-sizing: border-box;
  padding: 0 10px;
}

.content .title {
  font-size: 15px;
  display: inline-block;
  color: #131f3c;
  letter-spacing: 0;
  padding-bottom: 7px;
  font-family: PingFangSC-Regular;
  margin-top: 10px;
}

.newList ul li a .content .summary {
  width: 100%;
  overflow: hidden;
  height: 30px;
}

.news-desc span {
  color: #ff6700;
}

.summary {
  padding: 5px 0;
}

.time {
  display: block;
}
</style>
