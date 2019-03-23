import cookie from 'js-cookie'
import cookieKeys from '@/const/cookie-keys'

const cookiePath = process.env.COOKIE_PATH
// 最好提前在你的 store 中初始化好所有所需属性
// https://vuex.vuejs.org/zh-cn/mutations.html
export const state = () => ({
  // 这两个用于client side的使用, 又放cookie里是为了刷新时状态不丢失
  userId: '',
  token: '',
  tenantId: '',
  meta: {},

  user: {},
  menuList: [],
  permission: {},
  //初始化列表数据
})

//  mutation 必须同步执行
export const mutations = {
  login(state, payload) {
    // 部署不一定是在根路径, 所以cookie要设置path
    cookieKeys.forEach(key => {
      state[key] = payload[key]
      cookie.set(key, payload[key], {
        path: cookiePath
      })
    })
  },
  logout(state) {
    cookieKeys.forEach(key => {
      state[key] = ''
      cookie.remove(key, {
        path: cookiePath
      })
    })
  },
  update(state, payload) {
    Object.keys(payload).forEach(k => {
      state[k] = payload[k]
    })
  },
  // getList(state){

  // }
}

// Action 提交的是 mutation，而不是直接变更状态
// Action 可以包含任意异步操作
export const actions = {
  async login(context, payload) {
    // store 对象
    let {commit, state, dispatch} = context

    let resp = await this.$axios.$post(
      `/deepexi-tenant/api/v1/tenants/login`,
      payload
    )

    const userDetail = {...resp.payload}
    userDetail.userId = userDetail.id
    commit('login', userDetail)

    dispatch('fetchUserAndMenuList')
  },
  async fetchUserAndMenuList({commit}) {
    let user = await this.$axios.$get(
      `/deepexi-permission/api/v1/users/currentUser`
    )

    commit('update', {user: user.payload || {}})

    let menuResources = await this.$axios.$get(
      `/deepexi-permission/api/v1/apps/service/userResource`
    )
    if (menuResources && menuResources.payload) {
      commit('update', {
        menuList: menuResources.payload
      })
    }
  },
  // 配置的元信息
  async fetchMetaInfo({commit}) {
    let resp = await this.$axios.$get('/deepexi-permission/api/v1/configs')
    let meta = {}
    resp.payload.forEach(item => {
      meta[item.key] = item.value
    })
    commit('update', {meta})
  },
  // async getList ({commit}){
  //   let res = await this.$axios.$get('http://yapi.demo.qunar.com/mock/46947/api/interface/list')
  //   // 封装返回来的数据结构 
  //   //     {
  //   //   "code": 0,
  //   //   "msg": "ok",
  //   //   "payload": {
  //   //     "content": [], // the data to render
  //   //     "totalElements": 2 // total count
  //   //   }
  //   // }
  //   config.payload={
  //       content:[...res.data],
  //       totalElements:res.data.length
  //   }
  //   // const newObj={
  //   //   code:res.errcode,
  //   //   msg:res.errmsg ==="成功"? 'ok':'',
  //   //   payload:{
  //   //     content:[...res.data],
  //   //     totalElements:res.data.length
  //   //   }
  //   // };
  //   // console.log(newObj);
  //   // commit('getList',newObj);
  // }
}
