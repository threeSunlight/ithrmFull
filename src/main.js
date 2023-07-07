import Vue from "vue"
import "@/styles/index.scss" // global css
import App from "./App.vue"
import router from "./router"
import store from "./store"
import httpRequest from "./utils/httpRequest"

import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"

import "@/icons"
//import "@/icons/index"

Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.prototype.$http = httpRequest
// 或写为
// Vue.use(Button)
// Vue.use(Select)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app")
