<template>
  <div id="marquee">
    <input type="button" value="浪起来" @click="lang">
    <input type="button" value="低调" @click="stop">
    <h4>{{ msg }}</h4>
  </div>
</template>

<script>
export default {
  name: "marquee",
  data() {
    return {
      msg: '猥琐发育，别浪~~！',
      intervalId: null
    }
  },
  methods: {
    lang() {
      console.log(this.intervalId)
      if (this.intervalId == null) {
        this.intervalId = setInterval(() => {
          let start = this.msg.substring(0, 1)
          let end = this.msg.substring(1)
          this.msg = end + start
        }, 400)
      }


    },
    stop() {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }
}
</script>

<style scoped>

</style>
