<template>
  <van-list style="height:600px;overflow: scroll;"
    v-model="loading"
    :finished="finished"
    :finished-text="list.length > 0 ? '没有更多了' : ''"
    @load="onLoad"
  >
    <van-cell v-for="(item,index) in list" :key="index">
      {{ item }}
    </van-cell>
  </van-list>
</template>

<script>
import {Toast} from "mint-ui";

export default {
  name: "TestLoad",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      pageIndex: 1,
      size: 10,
      total: ''
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      this.$axios.get(`/api/test/list?pageIndex=${this.pageIndex}&size=${this.size}`)
        .then(res => {
          if (res.data.result == 1) {
            this.list.push(...res.data.data.content);
            this.pageIndex++
            this.total = res.data.data.totalElements
            // 加载状态结束
            this.loading = false;
            // 数据全部加载完成
            console.log(this.list.length,"+++",this.total)
            if (this.list.length >= this.total) {
              this.finished = true;
            }
          } else {
            Toast('添加失败')
          }

        })
        .catch(err => {
          console.log('商品列表数据异常', err)
        })
    }
  },

}
</script>

<style scoped>

</style>
