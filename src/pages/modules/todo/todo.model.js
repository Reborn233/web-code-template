import { Util } from '../../../utils/common';

export class TodoModel {
  todos = []

  last () {
    const t = this.todos[this.todos.length - 1];
    return t ? t.id + 1 : 1;
  }

  getTodos () {
    return Util.deepClone(this.todos);
  }

  addTodo (todo) {
    this.todos.push({
      id: this.last(),
      label: todo,
      finished: false
    });
  }

  removeTodo (id) {
    const index = this.todos.findIndex(todo => todo.id === id);
    this.todos.splice(index, 1);
  }

  clear () {
    this.todos = [];
  }

  setTodos (todos) {
    this.todos = todos;
  }
  setTodo (id, status = false) {
    this.todos.find(t => t.id === id).finished = status;
  }
}
