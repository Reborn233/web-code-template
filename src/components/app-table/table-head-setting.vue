<template>
  <el-dialog title="表头设置"
             v-drag
             :visible.sync="dialogVisible"
             width="500px"
             top='30px'
             center
             :close-on-click-modal="false"
             class="dialog-panel"
             append-to-body
             :before-close="onClose"
             @open="onOpen">
    <el-row>
      <el-col :span="24"
              class="text-right">
        <el-button type="text"
                   @click="reset">重置</el-button>
      </el-col>
      <!-- <el-col :span="12">
        <pre>{{tableHead}}</pre>
      </el-col> -->
      <el-col :span="24">
        <el-table :data="tableHead"
                  row-key="label"
                  class="drag-table"
                  style="width: 100%">
          <el-table-column prop="label"
                           label="表头"
                           min-width="120">
          </el-table-column>
          <el-table-column label="是否展示"
                           width="120">
            <template slot-scope="scope">
              <el-switch v-model='scope.row.hidden'
                         :active-value="false"
                         :inactive-value="true"
                         @change='toggle'></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="拖拽排序"
                           width="120">
            <template>
              <i class='el-icon-more sort'></i>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import Sortable from 'sortablejs';

export default {
  name: 'shareDialog',

  mixins: [],

  components: {},

  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    tableHead: Array
  },

  data () {
    return {
      hiddenList: [],
      sortable: null
    };
  },

  computed: {},

  watch: {},

  created () {
  },

  methods: {
    toggle () {
      this.$forceUpdate();
      this.$emit('change', this.tableHead);
    },
    reset () {
      this.$emit('reset');
    },
    rowDrop () {
      const tbody = document.querySelector('.drag-table .el-table__body-wrapper tbody');
      const _this = this;
      this.sortable = Sortable.create(tbody, {
        group: 'sort',
        sort: true,
        draggable: '.el-table__row',
        animation: 300,
        easing: 'cubic-bezier(1, 0, 0, 1)',
        direction: 'horizontal',
        onEnd ({ newIndex, oldIndex, item }) {
          const currRow = _this.tableHead.splice(oldIndex, 1)[0];
          _this.tableHead.splice(newIndex, 0, currRow);
          _this.$forceUpdate();
          _this.$emit('change', _this.tableHead);
        }
      });
    },
    onOpen () {
      this.$nextTick(() => {
        this.rowDrop();
      });
    },
    // 关闭弹窗
    onClose () {
      this.$emit('update:dialogVisible', false);
      this.sortable = null;
    },
    async onConfirm () {
      try {
      }
      catch (error) {

      }
    }
  }
};
</script>

<style lang="scss" scoped>
.sort {
  font-size: 28px;
  cursor: move;
}
</style>
