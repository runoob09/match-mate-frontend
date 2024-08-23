import request from "@/plugins/request";

interface UserSearchRequest {
  userTags?: Array<string>;
  pageNum: number;
  pageSize: number;
}
interface UserLoginRequest {
  userAccount: string;
  userPassword: string;
}
export async function getUserList(userSearchRequest: UserSearchRequest) {
  return (
    await request<Common.BasicResponse<Array<User.CurrentUser>>>({
      url: "/user/search/tags",
      method: "get",
      params: {
        ...userSearchRequest,
      },
    })
  ).data;
}

export async function recommend(userSearchRequest: UserSearchRequest){
  return (
    await request<Common.BasicResponse<Array<User.CurrentUser>>>({
      url: "/user/recommend",
      method: "get",
      params: {
        ...userSearchRequest
      },
    })
  ).data;
}

export async function login(userLoginRequest: UserLoginRequest){
  return (
    await request<Common.BasicResponse<User.CurrentUser>>({
      url: "/user/login",
      method: "post",
      data: {
        ...userLoginRequest
      }
    })
  ).data;
}