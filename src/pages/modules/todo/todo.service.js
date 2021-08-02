import { http } from '@/utils/http';

export class TodoService {
  async query () {
    try {
      const todos = await http.get('/api/todos');
      return todos;
    }
    catch (error) {

    }
  }
  async create () {
    try {
      const todos = await http.get('/api/todos');
      return todos;
    }
    catch (error) {

    }
  }
  async delete () {
    try {
      const todos = await http.get('/api/todos');
      return todos;
    }
    catch (error) {

    }
  }
  async update () {
    try {
      const todos = await http.get('/api/todos');
      return todos;
    }
    catch (error) {

    }
  }
}
