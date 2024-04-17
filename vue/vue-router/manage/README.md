后端安装koa命令
# koa2    npm i koa-generator -g
# koa2 project-name
# cd project-name
# npm install
# npm i koa2-cors -S   //设置跨域
# npm run dev


启动后端项目： npm run start




# 路由权限
- 1、uid -> 后端 API - 路由权限API
- 2、后端 -> 用户对应路由权限列表 -> 前端 -> JSON
- 3、JSON -> 树形结构化
- 4、树形结构化的数据 -> vue 路由结构
- 5、路由结构动态 -> 静态路由
- 6、树形结构化的数据 -> 菜单组件

jsppxiaoye

视频链接：https://www.bilibili.com/video/BV11A411J7z5/


1. 路由拦截时判断有没有权限，没有权限就去获取路由，后端返回的json数据，前端要转成数结构
2. 把树结构的路由转成前端路由能识别的结构，（path，name，component）
3. 添加路由
4. 下一步
5. 遍历路由生成左边菜单栏

addRoute 用于添加单个路由对象，立即生效。
router.addRoutes(路由数组)

addRoutes 用于添加多个路由对象，需要在下一次导航时生效。
路由数组.forEach(res=>{
  router.addRoute(res);
})


左边菜单栏
```vue
// SideBar.vue
<MenItem :list="$store.state.useRouters"  />


// MenItem.vue
<template>
    <div>
        <div v-for="(item, index) in list" :key="index">
            <!-- 如果有子元素 -->
            <ul v-if="item.children && item.children.length > 0">
                <li>
                    <!-- 父节点没有link属性 -->
                    <router-link :to="item.link || item.path"> {{ item.title }} </router-link>
                    <!-- 相当于把 item.children 重新赋值 list -->
                    <!-- 递归地使用MenuItem组件渲染子菜单 -->
                    <MenuItem :list="item.children" />
                </li>
            </ul>
            <!-- 没有子元素 父节点没有link属性-->
            <ul v-else>
                <router-link :to="item.link || item.path"> {{ item.title }} </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
// 整个组件的功能是根据传入的list数据动态渲染菜单项及其子菜单。
export default {
    name: "MenuItem",
    props: {
        list: Object
    },
}
</script>



```
