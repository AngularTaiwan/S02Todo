import {Inject, Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Todo} from './models/todo';

@Injectable()
export class TodoApiService {
  constructor(@Inject('api') private api: string, private http: Http) {}

  get() {
    return this.http.get(`${this.api}/todos/`);
  }

  add(todo: Todo) {
    return this.http.post(`${this.api}/todos/`, todo);
  }

  update(todo: Todo) {
    return this.http.put(`${this.api}/todos/${todo.id}`, todo);
  }
  delete(todo: Todo) {
    return this.http.delete(`${this.api}/todos/${todo.id}`);
  }
}
