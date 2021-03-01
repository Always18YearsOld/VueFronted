<template>
  <div id="comment" class="cmt-container">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入要BB的内容(最多吐槽120字)" maxlength="120" v-model="comment.comment"></textarea>

    <mt-button type="primary" size="large" @click="addComment">发表评论</mt-button>
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, index) in list">
        <div class="cmt-title">
          第{{ index + 1 }}楼&nbsp;&nbsp;用户：{{ item.user }}&nbsp;&nbsp;发表时间{{ item.createTime | dateFormat }}
        </div>
        <div class="cmt-body">
          {{ item.comment === '' ? '此用户很懒，嘛都没说！' : item.comment }}
        </div>
      </div>
    </div>

    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>

import {Toast} from "mint-ui";

export default {
  name: "comment",
  components: {},
  data() {
    return {
      list: [],
      pageIndex: 1,
      totalPageIndex: '',
      comment: {
        user: '',
        createTime: '',
        comment: '',
        foreignId: ''
      }
    }
  },
  props: [
    'id'
  ],
  created() {
    this.getComments()
  },
  methods: {
    getComments() {
      this.$axios.get("/api/comment/list/" + this.id + "?pageIndex=" + this.pageIndex)
        .then(res => {
          if (res.data.result == 1) {
            this.totalPageIndex = res.data.data.totalPages
            this.list = this.list.concat(res.data.data.content)
          } else {
            Toast('没有更多了')
          }
        })
        .catch(err => {
          console.log('评论列表数据异常', err)
        })
    },
    flushComments() {
      this.$axios.get("/api/comment/list/" + this.id + "?pageIndex=" + this.pageIndex)
        .then(res => {
          if (res.data.result == 1) {
            console.log(res.data)
            this.list = res.data.data.content
          } else {
            Toast('没有更多了')
          }
        })
        .catch(err => {
          console.log('评论列表数据异常', err)
        })
    },
    getMore() {
      this.pageIndex++
      console.log(this.pageIndex)
      console.log(this.totalPageIndex)
      if (this.pageIndex <= this.totalPageIndex) {
        this.getComments()
      } else {
        Toast('没有更多了')
        this.pageIndex--
      }
    },
    addComment() {
      this.comment.comment = this.comment.comment.trim()
      if (this.comment.comment.length === 0) {
        return Toast('评论内容不能为空！')
      }
      this.$axios.post("/api/comment/add/" + this.id, this.comment)
        .then(res => {
          if (res.data.result == 1) {
            console.log(res.data)
            this.flushComments()
            this.pageIndex = 1
            this.comment.comment = ''
          } else {
            Toast('添加失败')
          }
        })
        .catch(err => {
          console.log('评论列表数据异常', err)
        })

    }
  }
}
</script>

<style scoped>
.cmt-container h3 {
  font-size: 18px;
  font-weight: bold;
}

.cmt-container textarea {
  font-size: 14px;
  height: 85px;
  margin: 0;
}

.cmt-container .cmt-list {
  margin: 5px 0;
}

.cmt-container .cmt-list .cmt-item {
  font-size: 13px;
}

.cmt-container .cmt-list .cmt-item .cmt-title {
  background-color: #cccccc;
  line-height: 35px;
}

.cmt-container .cmt-list .cmt-item .cmt-body {
  line-height: 35px;
  text-indent: 2em;
  word-break: break-word;
}
</style>
