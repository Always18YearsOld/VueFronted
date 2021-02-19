<template>
  <div id="commentBox">
    <div class="form-group">
      <label>评论人：</label>
      <input type="text" class="form-control" v-model="user"/>
    </div>
    <div class="form-group">
      <label>评论内容：</label>
      <textarea class="form-control" v-model="content"></textarea>
    </div>
    <div class="form-group">
      <input type="button" value="发表评论" class="btn btn-primary" @click="postComment"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "commentBox",
  data() {
    return {
      user: '',
      content: '',
    }
  },
  methods: {
    postComment() {
      /* 发表评论功能
      评论数据存放到localStorage中（为了演示父子组件传值）
      * */
      let comment = {id: Date.now(), user: this.user, content: this.content}
      console.log(comment)
      let list = JSON.parse(localStorage.getItem('cmts') || '[]')
      list.unshift(comment)
      localStorage.setItem('cmts', JSON.stringify(list))
      this.user = this.content = ''
      console.log(this.$parent)
      this.$emit('func')
    }
  }
}
</script>

<style scoped>

</style>
