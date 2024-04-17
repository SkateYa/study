<template>
  <div class="son">
      <p>我是子组件1</p>
      <button @click="apply">点击我也执行</button>
      <button @click="$emit('click','AK47','J20')">点击我触发自定义事件click</button>
  </div>
</template>

<script setup lang="ts">

let $emit = defineEmits(['xxx','click'])
const apply = ()=>{
  $emit('xxx','zxy','yzz')
}


</script>

<style scoped>
.son{
  width: 400px;
  height: 200px;
  background: skyblue;
}
</style>