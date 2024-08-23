<script setup lang="ts">
import { ref } from "vue";
import { login } from "@/api/user.api";
import { useRouter } from "vue-router";

const userAccount = ref<string>("");
const userPassword = ref<string>("");
let isLoading = ref<boolean>(false);
const router = useRouter();
const onSubmit = async () => {
  try {
    isLoading.value = true;
    const data = await login({
      userAccount: userAccount.value,
      userPassword: userPassword.value,
    });
    if (data.code === 0 && data.data) {
      const route = router.currentRoute.value;
      if (route.query.redirect) {
        await router.push(route.query.redirect as string);
      } else {
        await router.push("/home");
      }
    }
    isLoading.value = false;
  } catch (e) {
    console.log(e);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div
    class="content-center"
    style="height: 100vh"
  >
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="userAccount"
          name="用户名"
          label="用户名"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="userPassword"
          type="password"
          name="密码"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button
          round
          block
          type="primary"
          native-type="submit"
          :loading="isLoading"
        >
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<style scoped></style>