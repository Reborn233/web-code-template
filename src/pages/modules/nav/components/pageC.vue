<template>
  <div class="page-c">
    <h2>页面C</h2>
    <p>来自其他页面的数据：</p>
    <pre>{{ info }}</pre>
    <el-button @click="goBack">返回上一页（PageB）</el-button>
  </div>
</template>

<script>
export default {
  name: 'PageC',
  inject: ['navigator'],
  data() {
    return {
      info: {}
    };
  },
  created() {
    const data = this.navigator.getReceivedData('PageC', true);
    this.info = data;
  },

  methods: {
    goBack() {
      this.navigator.sendData(
        { info: '来自PageC的消息' + Math.floor(Math.random() * 100) },
        'PageB'
      );
      this.navigator.back();
    }
  }
};
</script>
