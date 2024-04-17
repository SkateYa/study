import Vue from "vue";
import Vuex from "vuex";
import { getUserRouter } from "../request";
import { formatRouterTree } from "../libs/utils";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    uid: 3,
    hasAuth: false,
    useRouters: [],
  },
  mutations: {
    setUserRouters(state, useRouters) {
      state.useRouters = useRouters;
    },
    setAuth(state, value) {
      state.hasAuth = value;
    },
  },
  actions: {
    // 获取路由并设置路由
    async setUserRouters({ commit, state }) {
      // 根据uid请求获取路由接口
      const userRouters = await getUserRouter(state.uid);
      // 把后端返回的路由转成树结构
      const payload = formatRouterTree(userRouters);
      commit("setUserRouters", payload);
      commit("setAuth", true);
    },
  },
  modules: {},
});
