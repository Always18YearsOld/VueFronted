<template>
  <div class="newsDetail">
    <h3 class="title">{{ title }}</h3>
    <p class="subtitle">
      <span>发表时间：{{ createTime }}</span>
      <span>点击：{{ click }}次</span>
    </p>
    <hr>

    <div class="content">
      {{ content }}
    </div>
    <comment-box :id="this.id"></comment-box>
  </div>
</template>

<script>
import comment from "../../subcomponents/comment";

export default {
  name: "NewsDetail",
  components: {
    "comment-box": comment
  },
  data() {
    return {
      id: this.$route.params.id,
      title: '',
      createTime: '',
      click: '',
      content: ''
    }
  },
  created() {
    this.$axios.get("/api/news/news?id=" + this.id)
      .then(res => {
        if (res.data.result == 1) {
          this.title = res.data.data.title
          this.createTime = res.data.data.createTime
          this.click = res.data.data.click
          this.content = res.data.data.content
        } else {
          Toast('获取新闻失败！')
        }
      })
      .catch(err => {
        Toast('获取新闻失败！' + err)
      })
  }
}
</script>

<style scoped>
.newsDetail {
  padding: 0 4px;
}

.newsDetail .title {
  font-size: 16px;
  color: red;
  font-weight: bold;
  text-align: center;
  margin: 15px 0;
}

.newsDetail .subtitle {
  font-size: 13px;
  color: #226aff;
  display: flex;
  justify-content: space-between;
}

.newsDetail .content {
  width: 100%;
  word-break: break-word;
}
</style>
