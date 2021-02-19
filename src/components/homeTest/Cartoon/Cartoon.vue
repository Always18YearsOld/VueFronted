<template>
  <div id="cartoon">
    <div>

      <input type="button" @click="change1" value="改变1">
      <h3 v-if="flag1">没有使用动画效果</h3>
    </div>

    <div>
      <transition>
        <input type="button" @click="change2" value="改变2">
      </transition>
      <h3 v-if="flag2">使用动画效果</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "cartoon",
  data() {
    return {
      flag1: false,
      flag2: false,
    }
  },
  methods: {
    change1() {
      console.log(1)
      this.flag1 = !this.flag1
    },
    change2() {
      console.log(2)
      this.flag2 = !this.flag2
    }
  }
}
</script>

<style scoped>
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(80px);
}

.v-enter-active,
.v-leave-active {
  transition: all 1s ease;
}

</style>
