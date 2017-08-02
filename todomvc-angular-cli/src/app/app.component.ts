import {Component, Inject, OnInit} from '@angular/core';
import {Http} from '@angular/http';

import {generateId} from './mock';
import {Todo, TodoStatus} from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  filterCondition: TodoStatus|undefined;

  todoList: Todo[] = [];

  constructor(@Inject('api') private api: string, private http: Http) {}

  ngOnInit(): void {
    // const data = JSON.parse(localStorage.getItem('todoList'));
    // this.todoList = data.map(p => new Todo({id: p.id, name: p.name, status:
    // p.status}));

    this.getTodoWithHttp().subscribe(
        data => this.todoList = data.json().map(
            p => new Todo({id: p.id, name: p.name, status: p.status})));
  }

  addTodoWithHttp(todo: Todo) {
    this.http.post(`${this.api}/todos/`, todo).subscribe();
  }
  getTodoWithHttp() {
    return this.http.get(`${this.api}/todos/`);
  }
  updateTodoWithHttp(todo: Todo) {
    this.http.put(`${this.api}/todos/${todo.id}`, todo).subscribe();
  }
  deleteTodoWithHttp(todo: Todo) {
    this.http.delete(`${this.api}/todos/${todo.id}`).subscribe();
  }

  saveToLocalStorage() {
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }

  createNewTodo(input: HTMLInputElement) {
    const todo = new Todo({
      id: Math.max(0, ...this.todoList.map(p => p.id)) + 1,
      name: input.value,
      status: TodoStatus.Active,
    });
    this.todoList.push(todo);
    input.value = '';
    this.saveToLocalStorage();
    this.addTodoWithHttp(todo);
  }

  updateTodo(todo: Todo, input: HTMLInputElement) {
    todo.name = input.value;
    todo.selected = false;
    this.saveToLocalStorage();
    this.updateTodoWithHttp(todo);
  }

  switchStatus(todo: Todo) {
    todo.switchStatus();
    this.saveToLocalStorage();
    this.updateTodoWithHttp(todo);
  }

  deleteTodo(index: number) {
    // this.deleteTodoWithHttp(this.todoList[index]);
    const remove = this.todoList.splice(index, 1);
    this.deleteTodoWithHttp(remove[0]);
    this.saveToLocalStorage();
  }

  clearCompletedTodo() {
    const completedTodo = this.todoList.filter(todo => todo.isCompleted);
    completedTodo.forEach(todo => this.deleteTodoWithHttp(todo));
    this.todoList = this.todoList.filter(todo => !todo.isCompleted);
    this.saveToLocalStorage();
  }

  completedAllTodo() {
    this.todoList.forEach(todo => {
      todo.status = TodoStatus.Completed;
      this.updateTodoWithHttp(todo);
    });
    this.saveToLocalStorage();
  }

  // setting
  show(condition: string) {
    this.filterCondition = TodoStatus[condition];
  }
  // showAll() { this.filterCondition = undefined; }
  // showActive() { this.filterCondition = TodoStatus.Active; }
  // showCompleted() { this.filterCondition = TodoStatus.Completed; }

  // check
  isShow(condition: string) {
    return this.filterCondition === TodoStatus[condition];
  }
  // isShowAll() { return !this.filterCondition; }
  // isShowActive() { return this.filterCondition === TodoStatus.Active; }
  // isShowCompleted() { return this.filterCondition === TodoStatus.Completed; }

  selectTodo(todo: Todo, input: HTMLInputElement) {
    todo.selected = true;
    input.value = todo.name;
    setTimeout(() => input.focus(), 0);
  }

  get leftTodo() {
    return this.todoList.filter(todo => !todo.isCompleted).length;
  }
}
