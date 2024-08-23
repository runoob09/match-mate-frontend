import type { RouteRecordRaw } from "vue-router";
import { defineAsyncComponent } from "vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("@/layout/BasicLayout.vue"),
    children:[
      {
        path: "/home",
        name: "home",
        component: () => import("@/pages/Home.vue"),
      },
      {
        path: "/team",
        name: "team",
        component: () => import("@/pages/Team.vue"),
      },
      {
        path: "/user",
        name: "user",
        component: () => import("@/pages/User.vue"),
      },
      {
        path: "/searchUser",
        name: "searchUser",
        component: () => import("@/pages/SearchUser.vue"),
      },
      {
        path: "/searchTeam",
        name: "searchTeam",
        component: () => import("@/pages/SearchTeam.vue"),
      },
      {
        path: "/searchUserList",
        name: "searchUserList",
        component: () => import("@/pages/UserList.vue"),
      },
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/Login.vue"),
  },{
  path:"/",
    redirect(to) {
        return "/home";
    },
  }
];
