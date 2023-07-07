// 1. 引入axios
import axios from "axios"
import { MessageBox } from "element-ui"
import { getToken, removeToken } from "./auth"
import router from "@/router"
import NProgress from "nprogress" // 引入nprogress插件
import "nprogress/nprogress.css" // 这个nprogress样式必须引入
// 实例化axios
const http = axios.create({
  baseURL: "/",
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  }
})

/**
 * 请求拦截
 */
http.interceptors.request.use(
  (config) => {
    // 添加token
    config.headers["Authorization"] = `Bearer ` + getToken() // 请求头带上token
    NProgress.start() // 设置加载进度条(开始..)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * 响应拦截
 */
http.interceptors.response.use(
  (response) => {
    console.log(response, "response")
    // 处理401
    if (response.data && response.data.status === 10002) {
      // 401, token失效
      // 清空
      removeToken()
      // resetLoginInfo()
      router.push({
        name: "login"
      })
    }
    NProgress.done() // 设置加载进度条(结束..)
    return response
  },
  (error) => {
    console.log(error)
    let title = ""
    let message = ""

    if (error && error.response) {
      message = error.response.data.message
      // 401, token失效
      if (error.response.data.code === 10002) {
        removeToken()
        router.push(
          {
            name: "login"
          },
          () => {
            //  resetLoginInfo()
          }
        )
      }
      switch (
        error.response.status // 跨域存在获取不到状态码的情况
      ) {
        case 400:
          title = "错误请求"
          break
        case 401:
          title = "资源未授权"
          break
        case 403:
          title = "禁止访问"
          break
        case 404:
          title = "未找到所请求的资源"
          break
        case 405:
          title = "不允许使用该方法"
          break
        case 408:
          title = "请求超时"
          break
        case 500:
          title = "内部服务器错误"
          break
        case 501:
          title = "未实现"
          break
        case 502:
          title = "网关错误"
          break
        case 503:
          title = "服务不可用"
          break
        case 504:
          title = "网关超时"
          break
        case 505:
          title = "HTTP版本不受支持"
          break
        default:
          title = error.response.status
      }
      return MessageBox.alert(message, title, {
        type: "warning"
      })
    } else {
      // 跨域获取不到状态码或者其他状态进行的处理
      return MessageBox.alert("请联系系统管理员, 或稍后再试!", "未知错误", {
        type: "error"
      })
    }
  }
)

/**
 * console请求地址处理
 * @param {*} actionName action方法名称 / 接口路径
 */
http.adornUrl = (actionName) => {
  // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
  return process.env.VUE_APP_BASE_API + actionName
}

export default http
