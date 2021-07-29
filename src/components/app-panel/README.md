### 弹窗组件

`组件API`

- show {Boolean | 显示关闭弹窗}
- options {Array | 弹窗底部按钮组配置}

`例子`

```
   <app-panel :show.sync='show'
               title='弹窗'
               width='500px'
               append-to-body
               :options='options'>
      <h1>这是一段信息</h1>
    </app-panel>


      options:[
        {
          text: '取消',
          onClick: () => {
            this.$message('取消');
            this.show = false;
          }
        },
        {
          text: '提交',
          type: 'primary',
          onClick: () => {
            this.$message('提交');
            this.show = false;
          }
        }
      ]
```
