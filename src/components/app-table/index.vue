<script>
import AppPagination from '@/components/app-pagination';
import tableHeadSetting from './table-head-setting';
import { MyStorage } from '@/utils/storage';
import { Util } from '@/utils/common';
function save (key, data) {
  MyStorage.localStorage.setItem(key, JSON.stringify(data));
};
function fetch (key) {
  const data = MyStorage.localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};
export default {
  name: 'app-table',
  components: { AppPagination, tableHeadSetting },
  props: {
    // 表格数据
    data: {
      type: Array,
      default () {
        return [];
      }
    },
    // 表头数据
    columns: {
      type: Array,
      default: function () {
        return [];
      }
    },
    // 表格头部操作栏
    actions: {
      type: Array,
      default: function () {
        return [];
      }
    },
    columnRef: String,
    isColumnFilter: Boolean,
    selection: Boolean,
    selectable: Function,
    showPager: Boolean,
    pageParams: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  data () {
    return {
      tableHeadVisible: false,
      originColumns: Util.deepClone(this.columns),
      newColumns: Util.deepClone(this.columns),
      sortList: []
    };
  },
  computed: {
  },
  watch: {
    sortList (val) {
      if (val.length) {
        this.newColumns.forEach(item => {
          if (val.indexOf(item.label) !== -1) {
            item.hidden = false;
          }
          else {
            item.hidden = true;
          }
        });
        this.newColumns.sort((a, b) => {
          return val.indexOf(a.label) - val.indexOf(b.label);
        });
      }
      else {
        this.newColumns = this.originColumns;
      }
      // this.$forceUpdate();
    },
    columns (val) {
      this.newColumns = Util.deepClone(val);
    }
  },
  created () {
    if (this.columnRef && this.isColumnFilter) {
      this.sortList = fetch(this.columnRef);
    }
  },
  render () {
    return <div class='app-table'>
      {this.renderActions()}
      {this.renderTable()}
      {this.showPager ? this.renderPager() : ''}
    </div >;
  },
  methods: {
    pageChange (option) {
      this.$emit('page-change', option);
    },
    renderTable () {
      const tableProps = {
        props: {
          border: true,
          data: this.data,
          ...this.$props
        },
        style: {
          width: '100%'
        },
        on: { ...this.$listeners }
      };
      return <el-table {...tableProps} >
        {this.selection ? <el-table-column type="selection"
          selectable={this.selectable}>
        </el-table-column> : ''}
        {this.renderTableColum()}
      </el-table>;
    },
    renderTableColum () {
      const scopedSlots = (item) => {
        return {
          default: (scope) => {
            const col = scope.column.property;
            const value = scope.row[col];
            if (item.render) {
              return item.render(scope);
            }
            else if (item.type === 'index') {
              return scope.$index + 1;
            }
            else {
              return <span>{value || ''}</span>;
            }
          }
        };
      };
      const columns = this.newColumns.filter(f => !f.hidden);
      return columns.map(item => {
        const data = {
          props: {
            ...item,
            'show-overflow-tooltip': item.showOverflowToolitp
          }
        };
        if (item.children) {
          return <el-table-column
            {...data}
            scopedSlots={scopedSlots(item)}
          >
            {this.renderTableColum(item.children)}
          </el-table-column>;
        }
        else {
          return <el-table-column
            {...data}
            scopedSlots={scopedSlots(item)}
          >
          </el-table-column>;
        }
      });
    },
    renderPager () {
      const { currentPage = 1, pageSize = 10, totalCount = 0 } = this.pageParams;
      return <app-pagination
        on-pagerChange={this.pageChange}
        currentPage={currentPage}
        pageSize={pageSize}
        totalCount={totalCount}></app-pagination>;
    },
    renderFilter () {
      const data = {
        props: {
          dialogVisible: this.tableHeadVisible,
          tableHead: this.newColumns
        },
        on: {
          'update:dialogVisible': (val) => {
            this.tableHeadVisible = val;
          },
          'change': (list) => {
            this.sortList = list.filter(l => !l.hidden).map(item => item.label);
            save(this.columnRef, this.sortList);
          },
          'reset': () => {
            this.sortList = [];
            save(this.columnRef, this.sortList);
          }
        }
      };
      return <el-row>
        <el-row type="flex" justify="end">
          <el-button type="text" class='column-filter-btn' icon="el-icon-s-operation"
            onClick={() => (this.tableHeadVisible = true)}>列筛选排序</el-button>
        </el-row>
        <table-head-setting {...data}></table-head-setting>
      </el-row>;
    },
    renderActions () {
      return <el-row type="flex" justify='space-between' class='app-table_actions'>
        <el-row type="flex">
          {this.actions.map(action => {
            const onClick = action.onClick || Util.noop;
            return <el-button type="text" icon={action.icon} onClick={onClick}>{action.label}</el-button>;
          })}
          {this.$scopedSlots.head && this.$scopedSlots.head()}
        </el-row>
        {this.isColumnFilter ? this.renderFilter() : ''}
      </el-row>;
    }
  }
};
</script>
<style lang="scss" scoped>
.column-filter-btn {
  color: #666;
  // font-size: 14px;
  &:hover,
  &:focus,
  &:active {
    color: #666;
    background-color: transparent;
  }
}
.app-table_actions {
  font-weight: 500;
  background: #f3faff;
  padding: 0 12px;
  border: 1px solid #ebeef5;
  border-bottom: none;
}
</style>
