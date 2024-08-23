<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { getUserList } from "@/api/user.api";
import { useLoadMore } from "@/hooks/userLoadMore";

interface QueryParams {
  userTags: string[];
}

const route = useRoute();
const router = useRouter();
const { userTags } = route.query as unknown as QueryParams;
const moreResult = useLoadMore<User.CurrentUser>({
  pageSize: 20,
  api: (params, pageNum: number, pageSize: number) =>
    getUserList({
      pageNum,
      pageSize,
      userTags: params,
    }),
  params: userTags,
});
</script>

<template>
  <van-nav-bar
    title="搜索结果"
    left-text="返回"
    left-arrow
    @click-left="() => router.back()"
  />
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
        v-model:loading="moreResult.isLoading.value"
        @load="moreResult.loadMore()"
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

<style scoped></style>
