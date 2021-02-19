<template>
  <div id="classicLayout">
    <router-view name="headerBox" class="header"></router-view>
    <div class="container1">
      <router-view name="leftBox" class="left"></router-view>
      <router-view name="mainBox" class="main"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "classicLayout"
}
</script>

<style scoped>
#classicLayout {
  height: 100%;
}

.header {
  background-color: orange;
}

.container1 {
  width: 100%;
  height: 100%;
  display: flex;
}

.left {
  background-color: lightgreen;
  flex: 1;
  height: 100%;
}

.main {
  background-color: lightpink;
  flex: 9;
  height: 100%;
}
</style>
