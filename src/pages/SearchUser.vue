<script setup lang="ts">
import { ref, reactive } from "vue";
import { showToast } from "vant";
import { TreeSelectChild } from "vant";
import { useRouter } from "vue-router";

const value = ref("");
const chooseTags = ref<Array<string>>([]); // 已选择的标签
const activeIds = ref<Array<string | number>>([]); // 当前选中标签的id
const activeIndex = ref(0);
const tagItems = [
  {
    text: "性别",
    children: [
      { text: "男", id: 1 },
      { text: "女", id: 2 },
      { text: "未知", id: 3 },
    ],
  },
  {
    text: "方向",
    children: [
      { text: "Java", id: 4 },
      { text: "Go", id: 5 },
      { text: "前端", id: 6 },
      { text: "C++", id: 7 },
      {text:"python",id:8}
    ],
  },
];
// 打平数组
const tagItemList: Array<TreeSelectChild> = tagItems.flatMap(
  (item) => item.children,
);
const router = useRouter();

/**
 * 点击关闭按钮时触发的事件
 * @param tag
 */
function closeTags(tag: string) {
  // 从标签中删除对应的数据
  chooseTags.value = chooseTags.value.filter(
    (tagName, index) => tagName !== tag,
  );
  // 判断当前数据的id
  const currentTagId = tagItemList.find((item) => item.text === tag)?.id;
  activeIds.value = activeIds.value.filter((id) => id !== currentTagId);
}

/**
 * 点击选择器时触发的事件
 * @param item
 */
function clickSelectItem(item: TreeSelectChild) {
  // 向已选择标签内添加该数据
  console.log(!chooseTags.value.includes(item.text));
  if (!chooseTags.value.includes(item.text)) {
    chooseTags.value.push(item.text);
    return;
  }
  chooseTags.value = chooseTags.value.filter((tag) => tag !== item.text);
}

function searchTags(tag: string) {
  // 从打平数组中查找数据
  const tagItem = tagItemList.filter((item) => item.text === tag);
  if (tagItem.length === 0) {
    showToast({
      message: "没有该标签！",
      position: "top",
    });
    return;
  }
  // 判断该标签是否已经存在
  if (chooseTags.value.includes(tag)) {
    showToast({
      message: "该标签已选择！",
      position: "top",
    });
    return;
  }
  // 添加对应的标签
  chooseTags.value.push(tag);
  activeIds.value.push(tagItem[0].id);

  activeIndex.value = getActiveIndex(tag);
}

/**
 * 根据标签计算其对应的父级标签
 * @param tag
 */
function getActiveIndex(tag: string) {
  for (let i = 0; i < tagItems.length; i++) {
    const item = tagItems[i];
    for (let j = 0; j < item.children.length; j++) {
      const current = item.children[j];
      if (current.text === tag) {
        return i; // 返回外层下标
      }
    }
  }
  return 0;
}

function cancelSearch() {
  chooseTags.value = [];
  activeIds.value = [];
  activeIndex.value = 0;
}

/**
 * 执行查询的方法
 */
function doSearch() {
  // 判断是否选择了标签
  if (chooseTags.value.length === 0) {
    showToast({
      message: "请选择标签！",
      position: "top",
    });
    return;
  }
  // 跳转到结果展示页
  router.push({
    path: "/searchUserList",
    query: {
      userTags: chooseTags.value,
    },
  });
}
</script>

<template>
  <van-nav-bar
    title="用户搜索"
    left-text="返回"
    left-arrow
    @click-left="() => router.back()"
  />
  <van-search
    v-model="value"
    show-action
    placeholder="请输入搜索关键词"
    @search="searchTags"
    @cancel="cancelSearch"
  />
  <van-row>
    <h2 class="text">已选标签</h2>
    <van-divider />
  </van-row>
  <van-row>
    <van-row
      class="empty"
      v-if="chooseTags.length === 0"
    >
      <van-empty
        image="search"
        description="你还没有选择标签！"
        image-size="5rem"
      />
    </van-row>
    <van-space
      style="padding-left: 12px"
      v-else
      wrap
    >
      <van-tag
        v-for="(tag, index) in chooseTags"
        :key="index"
        plain
        closeable
        @close="closeTags(tag)"
        size="large"
        type="primary"
        >{{ tag }}
      </van-tag>
    </van-space>
  </van-row>
  <van-row>
    <h2 class="text">选择标签</h2>
  </van-row>
  <van-row style="padding-left: 12px">
    <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagItems"
      @click-item="clickSelectItem"
    />
  </van-row>
  <van-sticky
    :offset-bottom="44"
    position="bottom"
    style="width: 100%"
  >
    <van-button
      type="primary"
      style="width: 100%"
      @click="doSearch"
      >搜索
    </van-button>
  </van-sticky>
</template>

<style scoped>
.empty {
  width: 100%;
  justify-content: center;
}
</style>
