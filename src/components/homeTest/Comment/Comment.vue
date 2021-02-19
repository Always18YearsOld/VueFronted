<template>
  <div id="comment">
    <comment-box @func="loadComments"/>
    <ul class="list-group">
      <li class="list-group-item" v-for="(item, index) in list" :key="item.id">
        <span class="badge">评论人：{{ item.user }}</span>
        {{ item.content }}
      </li>
    </ul>
  </div>
</template>

<script>
import CommentBox from "./CommentBox/CommentBox";

export default {
  name: "comment",
  components: {CommentBox},
  data() {
    return {
      list: [
        {id: 1, user: '李白', content: '天生我材必有用'},
        {id: 2, user: '江小白', content: '劝君更尽一杯酒'},
        {id: 3, user: '小马', content: '我姓马，风吹草低见牛羊的马'},
      ]
    }
  },
  created() {
    this.loadComments()
  },
  methods: {
    loadComments() {
      console.log(111)
      this.list = JSON.parse(localStorage.getItem('cmts') || '[]')
    }
  }
}
</script>

<style scoped>

</style>
