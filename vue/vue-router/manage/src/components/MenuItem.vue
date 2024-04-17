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
