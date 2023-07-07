const { defineConfig } = require("@vue/cli-service")

// node.js中的path路径
const path = require("path")

//__dirname 相对路径
function resolve(dir) {
  return path.join(__dirname, dir)
}

//console.log(process.env)
const target =
  process.env.VUE_APP_MOCK_SCHEAM === "true" ? process.env.VUE_APP_MOCK_URL : process.env.VUE_APP_CONSOLE_URL
console.log(target, "target")
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // 根目录---绝对路径
  publicPath: "./",
  // 输出路径---npm run build 打包后输出的路径
  outputDir: "msg/dist",
  //静态资源存放路径---npm run build 打包后输出的路径中的静态资源
  assetsDir: "assets",
  // 配置svg-loader
  chainWebpack(config) {
    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete("prefetch")
    // set svg-sprite-loader
    config.module.rule("svg").exclude.add(resolve("src/icons")).end()
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end()
  },

  // 启动服务代理配置
  devServer: {
    // 端口号
    // 为什么不推荐使用8080端口呢,因为后端的主服务(在服务器上)和一些服务固定只能使用8080端口,为了防止端口冲突,一般会进行修改端口号
    port: "7256",
    // 开发运行时域名 127.0.0.1
    host: "0.0.0.0",
    // 启动项目时候,直接打开浏览器
    open: false,
    //是否启用 https
    https: false,
    // 配置proxy代理
    proxy: {
      // 代理标识
      [process.env.VUE_APP_BASE_API]: {
        // 配置代理默认开启target方式
        changeOrigin: true,
        // 如果是http接口，需要配置该参数
        secure: false,
        // 代理路径
        target,
        // 路径重写
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: ""
        }
      }
    }
  }
})
