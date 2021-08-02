<template>
  <app-section title="TODO">
    <el-row>
      <app-form ref='form'
                label-width='60px'
                :columns='formColumns'>
        <template #action>
          <el-col :span='18'>
            <el-button type="primary"
                       @click="query">查询</el-button>
            <el-button type="primary"
                       @click="submit">新增</el-button>
          </el-col>
        </template>
      </app-form>
    </el-row>
    <el-row>
      <app-table :data='dataSource'
                 v-loading='loading'
                 :columns='tableCOlumns'></app-table>
    </el-row>
    <pre>{{dataSource}}</pre>
  </app-section>
</template>

<script>
import { TodoController } from './todo.controller';

export default {
  name: 'todo',

  mixins: [],

  components: {},

  props: {},

  data () {
    const todoController = new TodoController();
    return {
      controller: todoController,
      formColumns: this.createFormColumns(),
      tableCOlumns: this.createTableColumns(),
      dataSource: [],
      loading: false
    };
  },

  created () {
    this.query();
  },

  methods: {
    async query () {
      this.loading = true;
      await this.controller.query();
      this.dataSource = this.controller.model.getTodos();
      this.loading = false;
    },
    createFormColumns () {
      return [
        {
          label: '标题',
          prop: 'label',
          col: 6
        }
      ];
    },
    createTableColumns () {
      return [
        {
          label: '编号',
          prop: 'id'
        },
        {
          label: '标题',
          prop: 'label'
        },
        {
          label: '状态',
          prop: 'finished',
          render: (scope) => {
            return scope.row.finished ? <el-tag type="success">完成</el-tag> : <el-tag>进行中</el-tag>;
          }
        },
        {
          label: '操作',
          render: scope => {
            return <div>
              {scope.row.finished ? '' : <el-button type='text' onClick={() => this.update(scope.row.id)}>完成</el-button>}
              <el-button type='text' onClick={() => this.delete(scope.row.id)}>删除</el-button>
            </div>;
          }
        }
      ];
    },
    async submit () {
      this.loading = true;
      const appForm = this.$refs.form;
      const params = appForm.getParams();
      await this.controller.submit(params.label);
      this.dataSource = this.controller.model.getTodos();
      this.loading = false;
    },
    async update (id) {
      this.loading = true;
      await this.controller.update(id, true);
      this.dataSource = this.controller.model.getTodos();
      this.loading = false;
    },
    async delete (id) {
      this.loading = true;
      await this.controller.delete(id);
      this.dataSource = this.controller.model.getTodos();
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
