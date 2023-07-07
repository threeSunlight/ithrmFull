import http from "@/utils/httpRequest"

// 封装登录接口
const login = (options) => http.post(http.adornUrl("/sys/login"), options).then((res) => res.data)

/**
 * 员工列表
 * @param {*} paage  当前页
 * @param {*} size   有多条数据
 * @returns
 */
const userList = (options) => http.get(http.adornUrl("/sys/user"), { params: options }).then((res) => res.data.data)

export { login, userList }
