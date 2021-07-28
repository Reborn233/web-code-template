<template>
  <div>
    <div class="container">
      <app-section title="表格组件">
        <app-table v-loading='loading'
                   :columns='radioColumns'
                   highlight-current-row
                   :value='radio'
                   @current-change="handleCurrentChange"
                   :data='tableData'></app-table>
        <pre>{{radio}}</pre>
      </app-section>
    </div>
    <div class="container">
      <app-section title="分页表格">
        <app-table v-loading='loading'
                   :columns='selectColumns'
                   showPager
                   selection
                   @selection-change="handleSelectionChange"
                   :pageParams='pageParamsMixin'
                   :data='tableData'></app-table>
        <pre>{{selected}}</pre>
      </app-section>
    </div>
  </div>
</template>

<script>
import PaginationMixin from '@/mixins/pagination.mixin';

const mockData = [{
  id: 1,
  date: '2016-05-02',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄'
}, {
  id: 2,
  date: '2016-05-04',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1517 弄'
}, {
  id: 3,
  date: '2016-05-01',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1519 弄'
}, {
  id: 4,
  date: '2016-05-03',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1516 弄'
}];

export default {
  name: 'TablePage',

  mixins: [PaginationMixin],

  components: {},

  props: {},

  data () {
    return {
      loading: false,
      radioColumns: this.createRadioColumns(),
      selectColumns: this.createSelectColumns(),
      tableData: [],
      radio: [1],
      selected: []
    };
  },

  computed: {},

  watch: {},

  created () {
    this.loadData();
  },

  methods: {
    createRadioColumns () {
      return [
        {
          label: '',
          width: 50,
          render: scope => {
            return <el-checkbox value={this.radio.includes(scope.row.id)}></el-checkbox>;
          }
        },
        {
          label: '序号',
          prop: 'id',
          width: 50
        },
        {
          label: '日期',
          prop: 'date'
        },
        {
          label: '姓名',
          prop: 'name'
        },
        {
          label: '地址',
          prop: 'address'
        }
      ];
    },
    createSelectColumns () {
      return [
        {
          label: '序号',
          prop: 'id',
          width: 50
        },
        {
          label: '日期',
          prop: 'date'
        },
        {
          label: '姓名',
          prop: 'name'
        },
        {
          label: '地址',
          prop: 'address'
        }
      ];
    },
    async loadData () {
      this.loading = true;
      try {
        await this.$sleep(1500);
        this.tableData = mockData;
        this.setTotalCountMixin(mockData.length);
      }
      catch (error) {

      }
      this.loading = false;
    },
    handleCurrentChange (data) {
      this.radio = [data.id];
    },
    handleSelectionChange (data) {
      this.selected = data;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
