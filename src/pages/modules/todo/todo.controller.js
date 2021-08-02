import { TodoModel } from './todo.model';
import { TodoService } from './todo.service';

export class TodoController {
  model = new TodoModel()
  service = new TodoService()

  async query () {
    const todos = await this.service.query();
    this.model.setTodos(todos);
  }

  async submit (label) {
    await this.service.create();
    this.model.addTodo(label);
  }

  async update (id, status) {
    await this.service.update();
    this.model.setTodo(id, status);
  }

  async delete (id) {
    await this.service.delete();
    this.model.removeTodo(id);
  }
}
