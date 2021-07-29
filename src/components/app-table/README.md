### 表格组件

`组件API`

- data {Array | 数据源}
- columns {Array | 表头数据}
- columnRef {String | 本地缓存过滤排序 key}
- isColumnFilter {Boolean | 是否显示排序过滤}
- selection {Boolean | 显示多选}
- selectable {Function | 显示配置是否禁用}
- showPager {Boolean | 显示分页}
- pageParams {Object | 分页参数}

`例子`

```
  <app-table v-loading="loading"
      :data="dataSource"
      :columns='columns'
      :pageParams='pageParamsMixin'
      @page-change='pagerChangeMixin($event);searchSubmit()'
      show-pager></app-table>


      columns:[
        {
          type: 'index',
          label: '序号',
          width: 60
        },
        {
          prop: 'type',
          label: '业务类型',
          width: 100,
          render: scope => {
            return scope.row.type?'类型一':'类型二';
          }
        },
        {
          prop: 'fieldName',
          label: '字段名称',
          minWidth: 120
        },
        {
          prop: 'fieldDescribe',
          label: '字段描述',
          minWidth: 120
        },
        {
          label: '操作',
          width: 150,
          render: scope => {
            return <div>
              <el-button type="text"
                onClick={() => this.openDialog(scope.row, '编辑合同')}>修改</el-button>
              <el-button type="text"
                onClick={() => this.deleteData(scope.row)}>删除</el-button>
            </div>;
          }
        }
      ]
```
