<template>
  <div class="">
    <!--    <button type="button" @click="addPhoto">添加图片</button>-->


    <van-tabs v-model="active" swipeable
              title-active-color="#1989fa"
              color="#1989fa"
              @change="onChange"
              sticky
              offset-top="46px">
      <van-tab v-for="(item,index) in typeList" :title="item.title" :key="index">
        <!--        <div v-for="index in 20" style="width: 100px;height: 50px;background-color:#dd524d;">{{index}}</div>-->

        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell v-for="(item,index) in photos" :key="index" class="item-box">
            <img class="img" :src="item.imgUrl"/>
            <div class="info">
              <h1 class="info-title">{{ item.title }}</h1>
              <div class="info-body">{{ item.content }}</div>
            </div>
          </van-cell>
        </van-list>

      </van-tab>
    </van-tabs>


  </div>

</template>

<script>

import {Toast} from "mint-ui";

export default {
  name: "photoList",
  data() {
    return {
      active: 0,
      typeList: [{
        id: null,
        title: "全部"
      }],
      photos: [],
      typeId: null,
      isLoading: false,//下拉刷新
      loading: false,// 加载状态
      finished: false,//上拉加载
      page: 1,
      size: 5,
      total: '',
    }
  },
  methods: {
    addPhoto() {
      this.$axios.get('/api/photo/add')
        .then(res => {
          if (res.data.result == 1) {
            console.log(res.data)
          } else {
            Toast('添加失败')
          }
        })
        .catch(err => {
          console.log('轮播图数据异常', err)
        })
    },
    photoType() {
      this.$axios.get('/api/photoType/list')
        .then(res => {
          if (res.data.result == 1) {
            console.log(res.data)
            this.typeList = this.typeList.concat(res.data.datas)
            console.log("list", this.typeList)
          } else {
            Toast('获取失败')
          }
        })
        .catch(err => {
          console.log('轮播图数据异常', err)
        })
    },
    photoList(typeId) {
      let url = typeId == null ? '/api/photo/list?pageIndex=' + this.page + '&size=' + this.size : '/api/photo/list?pageIndex=' + this.page + '&size=' + this.size + '&typeId=' + typeId
      this.$axios.get(url)
        .then(res => {
          if (res.data.result == 1) {
            this.photos.push(...res.data.data.content)
            console.log("photos", this.photos)
            this.total = res.data.data.totalElements;
          } else {
            Toast('获取失败')
          }
        })
        .catch(err => {
          console.log('轮播图数据异常', err)
        })
    },
    onChange(name, title) {
      console.log(name, "+++", title)
      Toast(title);
      this.typeId = this.typeList[name].id
      console.log("typeId", this.typeId)
      this.photos = []
      this.page = 1
      this.size = 5
      this.total = ''
      this.isLoading = false//下拉刷新
      this.loading = false// 加载状态
      this.finished = false//上拉加载
      this.onLoad()
    },
    /**
     * 上拉加载
     */
    onLoad() {
      setTimeout(async () => {
        this.page++
        console.log("typeId", this.typeId)
        await this.photoList(this.typeId);
        this.loading = false;// 加载状态结束
        console.log(this.photos && this.photos.length, '当前条数');
        console.log(this.total, '总条数');
        if (this.photos && this.photos.length >= this.total) {
          this.finished = true;
          this.loading = false;
        }// 数据全部加载完成
      }, 1000);
    }
  },
  created() {
    this.photoType()
    this.photoList()
  },
  watch: {
    typeId(newVal, oldVal) {
      console.log(newVal, "+", oldVal)
    }
  }
}
</script>

<style scoped lang="less">
.img {
  width: 100%;
}

/*/deep/ .van-sticky {
  position: fixed;
  top: 46px;
  right: 0;
  left: 0;
  z-index: 99;
}*/
.item-box {
  position: relative;
}

.info {
  color: white;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  bottom: 0;
  max-height: 67px;
  .info-title {
    font-size: 14px;
    font-weight: bold;
  }

  .info-body {
    font-size: 13px;
    word-break: break-word;
    line-height: 15px;
  }
}
</style>
