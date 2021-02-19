<template>
  <div id="account">
    <h1>这是账户页面</h1>
    <router-link to="/account/login">登陆</router-link>
    <router-link to="/account/register">注册</router-link>
    <router-view/>
  </div>

</template>

<script>
export default {
  name: "account"
}
</script>

<style scoped>

</style>
