<template>
  <div class="page-b">
    <h2>页面B</h2>
    <el-input v-model="value"></el-input>
    <p>通过props传入的数据</p>
    <pre>{{ message }}</pre>
    <p>来自其他页面的数据：</p>
    <pre>{{ info }}</pre>
    <!-- 返回上一页（PageA） -->
    <el-button @click="goBack">返回上一页</el-button>
    <!-- 跳转到 PageC 并传递数据 -->
    <el-button @click="goToPageC">跳转到页面C</el-button>
  </div>
</template>

<script>
export default {
  name: 'PageB',
  props: ['message'], // 接收 PageA 传递的 props
  inject: ['navigator'], // 注入导航器实例
  activated() {
    const data = this.navigator.getReceivedData('PageB');
    this.info = data;
  },
  data() {
    return {
      value: '',
      info: {}
    };
  },

  methods: {
    goBack() {
      // 调用导航器的 back 方法返回上一页
      this.navigator.back();
    },
    goToPageC() {
      // 跳转到 PageC，并给 PageC 传递数据
      this.navigator.sendData(
        { info: '来自PageB的消息' + this.value },
        'PageC'
      );
      this.navigator.go({ name: 'PageC' });
    }
  }
};
</script>
