<script>
import AppPagination from '@/components/app-pagination';
import dropdownSetting from './dropdown-setting';
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
  components: { AppPagination, dropdownSetting },
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
      newColumns: this.columns,
      sortList: []
    };
  },
  computed: {
    sortColumns () {
      const columns = Util.deepClone(this.newColumns);
      return this.sortList.length ? columns.map(item => {
        item.hidden = this.sortList.indexOf(item.label) === -1;
        return item;
      }) : columns;
    }
  },
  watch: {
    columns (val) {
      this.newColumns = val;
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
        attrs: {
          ...this.$attrs
        },
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
      const columns = this.sortList.length ? this.sortColumns.filter(f => !f.hidden) : this.newColumns.filter(f => !f.hidden);
      return <el-table {...tableProps} >
        {this.selection ? <el-table-column type="selection"
          selectable={this.selectable}>
        </el-table-column> : ''}
        {this.renderTableColum(columns)}
      </el-table>;
    },
    renderTableColum (columns) {
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
              return <span>{value}</span>;
            }
          }
        };
      };
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
    renderDropdown () {
      const data = {
        props: {
          options: this.sortColumns
        },
        on: {
          'change': (list) => {
            this.sortList = list.filter(l => !l.hidden).map(item => item.label);
            save(this.columnRef, this.sortList);
          },
          'reset': () => {
            this.sortList = [];
            save(this.columnRef, []);
          }
        }
      };
      return <el-row type="flex" justify="end">
        <dropdown-setting {...data}></dropdown-setting>
      </el-row>;
    },
    renderActions () {
      const filebutton = action => {
        return {
          attrs: {
            type: 'text'
          },
          on: {
            'selected': (file) => {
              action.onClick && action.onClick(file);
            }
          }
        };
      };
      return <el-row type="flex" justify='space-between' class='app-table_actions'>
        <el-row type="flex" style='align-items: center;'>
          {this.actions.filter(item => !item.hidden).map(action => {
            const onClick = action.onClick || Util.noop;
            if (action.type === 'file') {
              return <file-button {...filebutton(action)} icon={action.icon} style='margin-left:10px;'>{action.label}</file-button>;
            }
            return <el-button type="text" icon={action.icon} onClick={onClick}>{action.label}</el-button>;
          })}
          {this.$scopedSlots.head && this.$scopedSlots.head()}
        </el-row>
        {this.isColumnFilter ? this.renderDropdown() : ''}
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
