<template>
  <van-nav-bar
      title="标题"
      left-text="返回"
      left-arrow
  >
    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>
  <div>
    {{ active }}
  </div>
  <van-tabbar v-model="active">
    <van-tabbar-item name="home" icon="home-o">主页</van-tabbar-item>
    <van-tabbar-item name="team" icon="search">队伍</van-tabbar-item>
    <van-tabbar-item name="user" icon="friends-o">个人</van-tabbar-item>
  </van-tabbar>
</template>
<script setup lang="ts">
import {ref} from "vue";

const active = ref<string>("home");
</script>
<style scoped>

</style>