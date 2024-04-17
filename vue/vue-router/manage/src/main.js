import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/css/common.css";
import { generateRouter } from "./libs/utils";

Vue.config.productionTip = false;

router.beforeEach(async (to, from, next) => {
  // 判断有没有权限
  if (!store.state.hasAuth) {
    // 获取路由
    await store.dispatch("setUserRouters");
    // 把路由转成数结构
    const newRoutes = generateRouter(store.state.useRouters);
    console.log('newRoutes', newRoutes)
    // 添加路由
    newRoutes.forEach(item=>{
      router.addRoute(item);
    })
    // 旧版本
    // router.addRoutes(newRoutes);
    next({ path: to.path });
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
