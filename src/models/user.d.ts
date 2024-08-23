declare module User {
  type CurrentUser = {
    id?: number;
    username?: string;
    userAccount?: string;
    avatarUrl?: string;
    gender?: number;
    userPassword?: string;
    phoneNumber?: string;
    email?: string;
    userStatus?: number;
    isDelete?: number;
    userRole?: number;
    userTags?: Array<string>;
    userProfile?: string;
    createTime?: Date;
    updateTime?: Date;
  };
}
