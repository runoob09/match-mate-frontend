<script setup lang="ts">
import { ref } from "vue";

const currentUser = ref<User.CurrentUser>({
  id: 1821030126191923202,
  username: "user_user2",
  userAccount: "user2",
  avatarUrl:
    "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
  gender: 2,
  userStatus: 0,
  isDelete: 0,
  userRole: 0,
  userTags: ["Java", "Python"],
  userProfile:"用户简介",
  createTime: new Date(),
  updateTime: new Date(),
});
</script>

<template>
  <van-card
    class="user-card"
    :title="currentUser.username"
    :thumb="currentUser.avatarUrl"
    :desc="currentUser.userProfile"
  >
    <template #tags>
      <van-space>
        <van-tag
          v-for="tag in currentUser.userTags"
          :key="tag"
          type="primary"
          >{{ tag }}
        </van-tag>
      </van-space>
    </template>
  </van-card>
</template>

<style scoped>
.user-card {
  margin: 12px;
  background-color: #fff;
}
</style>
