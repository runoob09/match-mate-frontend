<template>
  <router-view style="height: 100%"></router-view>
  <van-tabbar route>
    <van-tabbar-item to="/home" name="home" icon="home-o" >主页</van-tabbar-item>
    <van-tabbar-item to="/team" name="team" icon="search">队伍</van-tabbar-item>
    <van-tabbar-item to="/user" name="user" icon="friends-o">个人</van-tabbar-item>
  </van-tabbar>
</template>
<script setup lang="ts">
</script>
<style scoped>

</style>