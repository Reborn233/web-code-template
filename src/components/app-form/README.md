### 表单组件

`组件API`

- columns {Array | 表单数据}
- rules {Object | 表单校验规则}

`例子`

```
  <app-form ref="form"
                label-width="100px"
                :rules='rules'
                style="width: 750px;"
                :columns='columns'></app-form>


      columns:[
        {
          label: '活动名称',
          type: 'text',
          prop: 'name',
          placeholder: '请输入活动名称',
          default: '默认活动名称',
          col: 12
        },
        {
          label: '活动区域',
          type: 'select',
          prop: 'region',
          placeholder: '请选择活动区域',
          default: 'beijing',
          options: () => [
            { label: '区域一', value: 'shanghai' },
            { label: '区域二', value: 'beijing' }
          ],
          col: 12
        },
        {
          label: '活动时间',
          type: 'time',
          prop: 'dateRange',
          pickerOptions: {
            start: '08:30',
            step: '00:15',
            end: '18:30'
          }
        },
        {
          label: '即时配送',
          type: 'switch',
          prop: 'delivery',
          default: true
        },
        {
          label: '活动性质',
          type: 'checkbox',
          prop: 'type',
          options: [
            { label: '美食/餐厅线上活动', value: 1 },
            { label: '地推活动', value: 2 },
            { label: '线下主题活动', value: 3 },
            { label: '单纯品牌', value: 4 }
          ]
        },
        {
          label: '特殊资源',
          type: 'radio',
          prop: 'resource',
          options: [
            { label: '线上品牌商赞助', value: 1 },
            { label: '线下场地免费', value: 2 }
          ]
        },
        {
          label: '活动形式',
          prop: 'desc',
          type: 'textarea'
        },
        {
          label: '上传文件',
          prop: 'upload',
          type: 'upload',
          accept: '.jpg',
          change: (file) => {
            // console.log('file:', file);
          }
        },
        {
          label: '计数器',
          prop: 'inputNumber',
          type: 'inputNumber',
          step: 2
        },
        {
          label: '级联选择器',
          prop: 'cascader',
          type: 'cascader',
          options: cascaderOptions,
          clearable: true,
          props: { checkStrictly: true },
          slot: ({ node, data }) => {
            return <div>
              <span>{data.label}</span>
              {!node.isLeaf ? <span>({data.children.length})</span> : ''}
            </div>;
          }
        },
        {
          label: '滑块',
          prop: 'slider',
          type: 'slider',
          default: [3, 5],
          showStops: true,
          range: true
        },
        {
          label: '评分',
          prop: 'rate',
          type: 'rate',
          default: 5.5,
          colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
          disabled: true,
          showScore: true,
          textColor: '#ff9900'
        }
      ]
```
