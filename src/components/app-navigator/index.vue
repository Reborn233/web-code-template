<template>
  <div class="component-navigator">
    <!-- 缓存组件 -->
    <keep-alive :include="cachedComponentNames">
      <component
        v-if="currentComponentConfig && currentComponentConfig.component"
        :is="currentComponentConfig.component"
        :key="currentComponentConfig.key"
        v-bind="currentComponentConfig.props"
        @navigate="handleNavigate"
        @goBack="handleGoBack"
        @sendData="handleDataTransfer"
      />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'ComponentNavigator',
  props: {
    // 新增：最大缓存组件数量
    maxCacheCount: {
      type: Number,
      default: 5 // 默认最多缓存5个组件
    },
    /**
     * 组件列表配置
     * 格式: [{ name: 'PageA', component: PageA, cache: true }, ...]
     * - name: 组件唯一标识（必填）
     * - component: 组件实例（必填）
     * - cache: 是否缓存（可选，默认遵循 defaultCache）
     */
    componentsList: {
      type: Array,
      required: true,
      validator: (list) => list.every((item) => item.name && item.component)
    },
    /**
     * 当前显示的组件名称（与 componentsList 中的 name 对应）
     */
    currentName: {
      type: String,
      required: true
    },
    /**
     * 默认缓存策略（当组件配置中未指定 cache 时生效）
     */
    defaultCache: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // 导航历史栈（存储组件名称和参数）
      historyStack: [],
      // 数据传递存储中心（key: 目标组件name，value: 数据数组）
      transferData: {},
      // 当前组件的额外参数（props/data等）
      componentParams: {}
    };
  },
  computed: {
    // 当前组件的完整配置（从 componentsList 中匹配）
    currentComponentConfig() {
      const target = this.componentsList.find(
        (item) => item.name === this.currentName
      );
      if (!target) return null;

      // 合并默认配置和动态参数
      const _current = this.componentParams[this.currentName];
      return {
        ...target,
        key: _current ? _current.key : target.name,
        props: _current ? _current.props : {},
        cache: target.cache !== undefined ? target.cache : this.defaultCache
      };
    },
    // 需要缓存的组件name列表
    cachedComponentNames() {
      const cacheSet = new Set(); // 用Set自动去重
      this.componentsList.forEach((item) => {
        if (item.cache !== false) {
          // 符合缓存条件
          cacheSet.add(item.name);
        }
      });
      return Array.from(cacheSet); // 转为数组
    }
  },
  watch: {
    // 监听currentName变化，自动记录历史（首次加载不记录）
    currentName(newName, oldName) {
      if (oldName && !this.historyStack.includes(newName)) {
        this.historyStack.push(newName);
      }
    }
  },
  created() {
    // 初始化时只注册当前组件
    this.registerComponent(this.currentName);
    // 初始化历史栈
    this.historyStack = [this.currentName];
    // 注册所有组件到当前实例（确保<component>能识别）
    // this.componentsList.forEach((item) => {
    //   this.$options.components[item.name] = item.component;
    // });
  },
  methods: {
    // 按需注册组件
    registerComponent(componentName) {
      const targetComp = this.componentsList.find(
        (item) => item.name === componentName
      );
      if (targetComp && !this.$options.components[componentName]) {
        this.$options.components[componentName] = targetComp.component;
      }
    },
    /**
     * 跳转到指定组件
     * @param {Object} options - 跳转配置
     * @param {string} options.name - 目标组件name
     * @param {Object} [options.props] - 传递给目标组件的props
     * @param {any} [options.data] - 传递给目标组件的数据（非props）
     */
    handleNavigate(options) {
      const { name, props, data } = options;
      if (!name) {
        console.error('跳转必须指定组件name');
        return;
      }
      // 首次跳转时注册组件
      this.registerComponent(name);

      // 验证目标组件是否在列表中
      const isComponentValid = this.componentsList.some(
        (item) => item.name === name
      );
      if (!isComponentValid) {
        console.error(`组件${name}不在componentsList中`);
        return;
      }

      // 存储参数（props/data）
      this.componentParams[name] = {
        key: Date.now(), // 用时间戳作为key，避免缓存冲突
        props: props || {}
      };

      // 如果需要传递数据，提前存入transferData
      if (data) {
        this.handleDataTransfer(data, name);
      }

      // 触发currentName更新（父组件可监听此事件同步状态）
      this.$emit('update:currentName', name);
      this.$emit('navigated', name);
    },

    /**
     * 返回上一个组件
     */
    handleGoBack() {
      if (this.historyStack.length <= 1) {
        console.warn('已经是第一个组件');
        this.$emit('cannotGoBack');
        return false;
      }

      // 移除当前组件，返回上一个
      const currentName = this.historyStack.pop();
      this.clearTransferData(currentName);
      const prevName = this.historyStack[this.historyStack.length - 1];
      this.$emit('update:currentName', prevName);
      this.$emit('wentBack', prevName);
      return true;
    },

    /**
     * 组件间数据传递
     * @param {any} data - 要传递的数据
     * @param {string} targetName - 目标组件name
     */
    handleDataTransfer(data, targetName) {
      if (!targetName) {
        console.error('数据传递必须指定目标组件name');
        return;
      }

      if (!this.transferData[targetName]) {
        this.transferData[targetName] = [];
      }

      const targetNameData = this.transferData[targetName];
      const currentNameData = targetNameData.find(
        (it) => it.from === this.currentName
      );
      if (currentNameData) {
        currentNameData.data = data;
        currentNameData.timestamp = Date.now();
      } else {
        this.transferData[targetName].push({
          from: this.currentName,
          data,
          timestamp: Date.now()
        });
      }

      this.$emit('dataTransferred', {
        from: this.currentName,
        to: targetName,
        data
      });
    },

    /**
     * 获取目标组件传递来的数据
     * @param {string} componentName - 组件name
     * @param {boolean} [clear=false] - 是否获取后清除数据
     * @returns {Array} 数据列表
     */
    getTransferData(componentName, clear = false) {
      const data = this.transferData[componentName] || [];
      if (clear) {
        this.transferData[componentName] = [];
      }
      return [...data]; // 返回副本，避免直接修改源数据
    },

    /**
     * 清除指定组件的传递数据
     * @param {string} [componentName] - 组件name（不填则清除所有）
     */
    clearTransferData(componentName) {
      if (componentName) {
        this.transferData[componentName] = [];
      } else {
        this.transferData = {};
      }
    }
  },
  // 提供导航方法给子组件
  provide() {
    return {
      navigator: {
        go: this.handleNavigate,
        back: this.handleGoBack,
        sendData: this.handleDataTransfer,
        getReceivedData: (name, clear) => this.getTransferData(name, clear),
        clearData: this.clearTransferData
      }
    };
  }
};
</script>

<style scoped>
.component-navigator {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
