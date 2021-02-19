<template>
  <div id="brandList">
    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">添加品牌</h3>
      </div>
      <div class="panel-body form-inline">

        <label>
          名称:
          <!-- @keyup是绑定键盘事件，键盘回车直接调用add -->
          <!-- f2是自定义的键盘码，在下面配置的 -->
          <input type="text" class="form-control" v-model="name" @keyup.f2="add">
        </label>

        <label>
          价格:
          <input type="text" class="form-control" v-model="price">
        </label>


        <input type="button" value="添加" class="btn btn-primary" @click="add">

        <label>
          搜索名称关键字:
          <!-- vue中所有的指令在调用的时候都以v-开头 -->
          <input type="text" class="form-control" v-model="keywords" id="search" v-focus v-color>
        </label>
      </div>
    </div>
    <table class="table table-bordered table-hover table-striped">
      <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Price</th>
        <th>Ctime</th>
        <th>Operation</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in search(keywords)" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.price }}</td>
        <td>{{ item.ctime | dateFormat('') }}</td>
        <td>
          <a href="" @click.prevent="del(item.id)">删除</a>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>


import Vue from "vue";

Vue.filter('dateFormat', function (dateStr, pattern = '') {
  let dt = new Date(dateStr)

  // yyyy-mm-dd
  let y = dt.getFullYear()
  // 防止月份不是2位，如果不是2位，就补充到2位，在前面加上'0'
  let m = (dt.getMonth() + 1).toString().padStart(2, '0')
  let d = (dt.getDate()).toString().padStart(2, '0')

  // return y + '-' + m + '-' + d

  if (pattern.toLowerCase() === 'yyyy-mm-dd') {
    return `${y}-${m}-${d}`
  } else {
    let hh = (dt.getHours()).toString().padStart(2, '0')
    let mm = (dt.getMinutes()).toString().padStart(2, '0')
    let ss = (dt.getSeconds()).toString().padStart(2, '0')

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
  }
})
Vue.directive('focus', {
  bind: function (el) {
  },
  inserted: function (el) { //inserted表示元素插入到DOM中的时候，会执行inserted函数【触发一次】
    el.focus()
  },
  update: function (el) { //当VNode更新的时候，回执行updated，可能会触发多次

  }
})

/*自定义一个设置字体颜色的指令*/
Vue.directive('color', {
  bind: function (el) {
    /*设置样式不用关心有没有插入到DOM中*/
    el.style.color = 'red'
  },
  inserted: function (el) {

  },
  update: function (el) {

  }
})


export default {
  name: "brandListRequest",
  data() {
    return {
      id: '',
      name: '',
      price: '',
      keywords: '',
      list: []
    }
  },
  methods: {
    brandList() {
      console.log(1)
      this.$axios.get('/api/brand/list')
        .then(res => {
          if (res.data.result == "1") {
            console.log(res.data)
            this.list = res.data.datas
          } else {
            alert("获取数据失败")
          }
        })
        .catch(err => {
          console.log('轮播图数据异常', err)
        })
    },
    /*新增功能*/
    add() {
      let car = {name: this.name, price: this.price, ctime: new Date()}
      console.log(car)
      this.$axios.post('/api/brand/add', car)
        .then(res => {
          if (res.data.result == "1") {
            this.brandList()
            this.price = this.name = ''
          }
        })
        .catch(err => {
          console.log('轮播图数据异常', err)
        })

    },
    /*删除功能*/
    del(id) {
      /*方法1*/
      /*this.list.some((item, i) => {
        if (item.id == id) {
          this.list.splice(i, 1)
          return true;
        }
      })*/
      /*方法2*/
      /*let index = this.list.findIndex(item => {
        if (item.id === id) {
          return true;
        }
      });
      this.list.splice(index, 1)*/
      this.$axios.get(`/api/brand/del?id=${id}`)
        .then(res => {
          if (res.data.result == "1") {
            console.log(res.data.datas)
            this.brandList()
          }
        })
        .catch(err => {
          console.log('轮播图数据异常', err)
        })
    },
    /*搜索功能*/
    search(keywords) {
      /*方法1*/
      /*let newList = []
      this.list.forEach(item => {
        if (item.name.indexOf(keywords) !== -1) {
          newList.push(item)
        }
      })
      return newList*/

      /*方法2*/
      return this.list.filter(item => {
        if (item.name.includes(keywords)) {
          return item
        }
      })
    },
  }
  ,
  /*定义私有过滤器*/
  filters: {
    dateFormat: function (dateStr, pattern) {
      let dt = new Date(dateStr)

      // yyyy-mm-dd
      let y = dt.getFullYear()
      // 防止月份不是2位，如果不是2位，就补充到2位，在前面加上'0'
      let m = (dt.getMonth() + 1).toString().padStart(2, '0')
      let d = (dt.getDate()).toString().padStart(2, '0')

      // return y + '-' + m + '-' + d

      if (pattern.toLowerCase() === 'yyyy-mm-dd') {
        return `${y}-${m}-${d}`
      } else {
        let hh = (dt.getHours()).toString().padStart(2, '0')
        let mm = (dt.getMinutes()).toString().padStart(2, '0')
        let ss = (dt.getSeconds()).toString().padStart(2, '0')

        return `${y}-${m}-${d} ${hh}:${mm}:${ss}~~~~~~~`
      }
    }
  }
  ,
  created() {
    this.brandList()
  }
}


</script>

<style scoped>

</style>
