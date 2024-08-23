<script setup lang="ts">
import { useLoadMore } from "@/hooks/userLoadMore";
import { recommend } from "@/api/user.api";
import { useRouter } from "vue-router";
const router = useRouter();
const moreResult = useLoadMore<User.CurrentUser>({
  pageSize: 20,
  api: (params, pageNum: number, pageSize: number) => recommend({
    pageSize,pageNum
  })
});
</script>

<template>
  <van-nav-bar
      title="主页"
      @click-right="()=>{router.push('/searchUser')}"
  >
    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>
  <van-row
    v-if="moreResult.isFirstLoading.value"
    class="content-center"
  >
    <van-loading>加载中</van-loading>
  </van-row>
  <template v-else>
    <van-row
      v-if="moreResult.data.value?.length === 0"
      class="content-center"
    >
      <van-empty
        :image-size="[200, 200]"
        description="没有符合条件的用户！"
      />
    </van-row>
    <template v-else>
      <van-list
        :loading="moreResult.isLoading.value"
        loading-text="加载中"
        :finished="moreResult.isFinish.value"
        finished-text="没有更多了"
        @load="moreResult.loadMore"
      >
        <van-card
          v-for="user in moreResult.data.value"
          class="user-card"
          :title="user.username"
          :thumb="user.avatarUrl"
          :desc="user.userProfile"
          :key="user.id"
        >
          <template #tags>
            <van-space>
              <van-tag
                v-for="tag in user.userTags"
                :key="tag"
                type="primary"
              >{{ tag }}
              </van-tag>
            </van-space>
          </template>
          <template #footer>
            <van-button size="small">联系我</van-button>
          </template>
        </van-card>

      </van-list>
    </template>
  </template>
</template>

<style scoped>
</style>