<template>
  <div class="side-bar">
    <ul>
      <li>
        <router-link to="/">首页</router-link>
      </li>
    </ul>
    <MenItem :list="$store.state.useRouters"  />
  </div>
</template>


<script>
import MenItem from './MenuItem'
export default {
  name: 'SideBar',
  components: {
    MenItem
  }
}
</script>

<style>
.side-bar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 200px;
  height: 100%;
  padding-top: 90px;
  box-sizing: border-box;
  background-color: #ededed;
}
</style>