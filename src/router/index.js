import Vue from "vue"
import VueRouter from "vue-router"

import LoginView from "../views/login/LoginView.vue"
//  每个用户都能看到的页面,项目必须加载的页面
Vue.use(VueRouter)

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginView
  }
  // {
  //   path: "/employees",
  //   name: "employees",
  //   component: () => import(/* webpackChunkName: "about" */ "../views/employees")
  // },
]

const router = new VueRouter({
  routes
})

export default router
