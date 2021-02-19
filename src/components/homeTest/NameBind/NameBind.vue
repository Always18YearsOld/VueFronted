<template>
  <div id="nameBind">
    <!--  方法1  -->
    <label>
      <input type="text" v-model="firstname1" @keyup="getFullName"/>
      <input type="text" v-model="lastname1" @keyup="getFullName"/>
      <input type="text" v-model="fullName1"/>
    </label>
    <!--  方法2  -->
    <label>
      <input type="text" v-model="firstname2"/>
      <input type="text" v-model="lastname2"/>
      <input type="text" v-model="fullName2"/>
    </label>
    <!--  方法3  -->
    <label>
      <input type="text" v-model="firstname3"/>
      <input type="text" v-model="lastname3"/>
      <input type="text" v-model="fullName3"/>
    </label>
  </div>
</template>

<script>
export default {
  name: "nameBind",
  data() {
    return {
      firstname1: '',
      lastname1: '',
      fullName1: '',

      firstname2: '',
      lastname2: '',
      fullName2: '',

      firstname3: '',
      lastname3: '',
    }
  },
  methods: {
    getFullName() {
      this.fullName1 = this.firstname1 + this.lastname1
    }
  },
  watch: {
    'firstname2': function () {
      this.fullName2 = this.firstname2 + '-' + this.lastname2
    },
    'lastname2': function () {
      this.fullName2 = this.firstname2 + '-' + this.lastname2
    }
  },
  /*计算属性这个function内部所用到的任何data中的数据发生了变化，就会立即重新计算这个计算属性的值
  * 计算属性的求值结果会被缓存起来，方便下次直接使用，如果计算属性方法中所依赖的任何数据都没有发生过变化，则不会重新对计算属性重新计算*/
  computed: {
    'fullName3': function () {
      return this.firstname3 + '----' + this.lastname3
    }
  }
}
</script>

<style scoped>

</style>
