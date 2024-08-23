import { Ref, ref } from "vue";

interface UseLoadMoreOptions<T> {
  pageSize?: number;
  params?:any;
  api: (params: any,pageNum: number, pageSize: number) => Promise<Common.BasicResponse<Array<T>>>;
}

interface UseLoadMoreResult<T> {
  data: Ref<Array<T>>;
  isLoading: Ref<boolean>;
  isFirstLoading: Ref<boolean>;
  isFinish: Ref<boolean>;
  loadMore: () => Promise<void>;
}

export function useLoadMore<T>(useLoadMoreOptions: UseLoadMoreOptions<T>): UseLoadMoreResult<T> {
  let pageNum = 1;
  let pageSize = useLoadMoreOptions?.pageSize || 10;
  const isFirstLoading = ref(true); // 第一次加载使用
  const isLoading = ref(false); // 上拉加载使用
  const data = ref<Array<T>>([]) as Ref<Array<T>>;
  const isFinish = ref(false);
  // 首次加载函数
  const firstLoading = async () => {
    isFirstLoading.value = true;
    try {
      const res = await useLoadMoreOptions.api(useLoadMoreOptions.params, pageNum, pageSize);
      const firstData = res.data; // 第一次加载到的数据
      data.value.push(...firstData);
    } catch (e) {
      console.error(e);
    } finally {
      isFirstLoading.value = false;
    }
  };
  // 上拉加载函数
  const loadMore = async () => {
    try {
      if (isFinish.value){
        isLoading.value = false;
        return;
      }
      isLoading.value=true
      pageNum++;
      const res = await useLoadMoreOptions.api(useLoadMoreOptions.params, pageNum, pageSize);
      const moreData = res.data; // 上拉加载到的数据
      // 判断该数据是否为空
      if (moreData.length === 0) {
        isFinish.value = true;
        return;
      }
      data.value = [...data.value, ...moreData];
    } catch (e) {
      pageNum--;
      console.error(e);
    }finally {
      isLoading.value=false
    }
  };
  firstLoading();
  return {
    data,
    isLoading,
    isFirstLoading,
    loadMore,
    isFinish
  };
}
