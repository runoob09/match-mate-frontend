import { ref, Ref } from "vue";

interface useRequestOptions<T> {
  request: () => Promise<Common.BasicResponse<T>>;
}

interface useRequestResult<T> {
  data: Ref<T | undefined>;
  isLoading: Ref<boolean>;
}

export function useRequest<T>(
  options: useRequestOptions<T>,
): useRequestResult<T> {
  const isLoading = ref<boolean>(true);
  const data = ref<T>();

  const fetchData = async () => {
    isLoading.value = true;
    try {
      const response = await options.request();
      data.value = response.data; // 获取 BasicResponse 内部的 data
    } catch (e) {
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  };

  fetchData();

  return {
    data,
    isLoading,
  };
}
