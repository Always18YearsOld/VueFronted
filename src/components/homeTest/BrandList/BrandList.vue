<template>
  <div id="brandList">
    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">添加品牌</h3>
      </div>
      <div class="panel-body form-inline">
        <label>
          Id:
          <input type="text" class="form-control" v-model="id">
        </label>

        <label>
          Name:
          <!-- @keyup是绑定键盘事件，键盘回车直接调用add -->
          <!-- f2是自定义的键盘码，在下面配置的 -->
          <input type="text" class="form-control" v-model="name" @keyup.f2="add" >
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
        <th>Ctime</th>
        <th>Operation</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in search(keywords)" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
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
/*自定义全局键盘码*/
Vue.config.keyCodes.f2 = 113
/*使用Vue.directive()定义全局指令
* 参数1：指令的名称，注意在定义的时候指令的名称前面不需要加v-前缀，
* 在调用时候，必须在指令名称钱加上v-前缀来进行调用
* 参数2：是一个对象，这个对象身上，有一些指令相关的函数，这些函数可以在特定的阶段，执行相关的操作*/
Vue.directive('focus', {
  bind: function (el) { //每当指令绑定到元素上的时候，回立即执行这个bind函数，只执行一次
    /*每个函数中，第一个参数永远是el，表示被绑定了指令的哪个元素，这个el参数是一个原生的JS对象
    * 在元素刚绑定了指令的时候，还没有插入到DOM中取，这时候调用focus方法没有作用
    * 因为，一个元素只有插入到DOM之后，才能获取焦点
    * 这时候调用没有作用，但是也不会报错*/
    // el.focus()
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
    el.style.color='red'
  },
  inserted: function (el) {

  },
  update: function (el) {

  }
})


export default {
  name: "brandList",
  data() {
    return {
      id: '',
      name: '',
      keywords: '',
      list: [
        {id: 1, name: '奔驰', ctime: new Date()},
        {id: 2, name: '宝马', ctime: new Date()},
        {id: 3, name: '奥迪', ctime: new Date()},
        {id: 4, name: '劳斯莱斯', ctime: new Date()},
      ]
    }
  },
  methods: {
    /*新增功能*/
    add() {
      let car = {id: this.id, name: this.name, ctime: new Date()}
      this.list.push(car)
      this.id = this.name = ''
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
      let index = this.list.findIndex(item => {
        if (item.id === id) {
          return true;
        }
      });
      this.list.splice(index, 1)
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
  },
  /*定义私有过滤器*/
  filters: {
    // 过滤器调用的时候采用就近原则，如果全局和私有都有相同的，则调用私有
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
  },
  mounted() {
    /*这里直接操作DOM的方式，进入页面直接在input上焦点，但是VUE不提倡操作DOM*/
    // document.getElementById('search').focus()
  }
}


</script>

<style scoped>

</style>
