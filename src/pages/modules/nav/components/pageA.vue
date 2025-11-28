<template>
  <div class="page-a">
    <h2>{{ title }}</h2>
    <el-input v-model="value"></el-input>
    <p>这是页面A</p>
    <!-- 跳转到 PageB 并传递参数 -->
    <el-button @click="goToPageB">跳转到页面B</el-button>
  </div>
</template>

<script>
export default {
  name: 'PageA',
  props: ['title'], // 接收父组件传递的 props
  inject: ['navigator'], // 注入导航器实例
  data() {
    return {
      value: ''
    };
  },
  methods: {
    goToPageB() {
      // 调用导航器的 go 方法跳转到 PageB
      this.navigator.go({
        name: 'PageB', // 目标组件名称（对应 componentsMap 中的键名）
        props: { message: '来自PageA的问候' }, // 传递给 PageB 的 props
        data: { user: { id: 1, name: this.value } }, // 传递给 PageB 的数据（非props，通过导航器存储）
        cache: true // 可选：是否缓存 PageB（默认遵循 defaultCache）
      });
    }
  }
};
</script>
