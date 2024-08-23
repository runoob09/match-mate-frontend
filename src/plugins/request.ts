import axios, { Axios, AxiosResponse } from "axios";
import qs from "qs";
import { showToast } from "vant";
import router from "../config/router";
class ResultCode{
  static readonly NOT_LOGIN = 40100;
}
axios.defaults.withCredentials = true
const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 1000*10,
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: "indices" });
  },
});
// 使用全局响应拦截器
request.interceptors.response.use(
  (response:AxiosResponse) => {
    const data: Common.BasicResponse<any> = response.data;
    if (data.code === 0) {
      return response;
    }
    showToast({
      message: data.description,
      duration: 2000,
      position: "top",
    });
    if (data.code === ResultCode.NOT_LOGIN) {
      // 记录当前页面
      const redirectPath = router.currentRoute.value.path;
      // 跳转到登录页面
      router.push({
        path:"/login",
        query:{
          redirect:redirectPath
        }
      })
    }
    throw new Error(data.description || "网络错误");
  },
  (error) => {
    if (error instanceof Error){
      showToast({
        message: error.message,
        duration: 2000,
        position: "top",
      })
    }
    return Promise.reject(error);
  },
);
export default request;
