import {Component, Inject, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {generateId} from './mock';
import {Todo, TodoStatus} from './models';
import {StorageApiService} from './storage-api.service';
import {TodoApiService} from './todo-api.service';
import {TodoService} from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  filterCondition: TodoStatus|undefined;
  todoStatus = TodoStatus;
  todoList: Observable<Todo[]>;

  constructor(public todoService: TodoService) {}

  ngOnInit(): void {
    this.todoList = this.todoService.getList();
  }


  createNewTodo(input: HTMLInputElement) {
    this.todoService.create(input.value);
    input.value = '';
  }

  updateTodo(todo: Todo, input: HTMLInputElement) {
    this.todoService.update(todo, input.value);
  }

  switchStatus(todo: Todo) {
    this.todoService.switchStatus(todo);
  }

  deleteTodo(todo: Todo) {
    this.todoService.delete(todo);
  }

  clearCompletedTodo() {
    this.todoService.clearCompletedTodo();
  }

  completedAllTodo() {
    this.todoService.completedAllTodo();
  }

  // setting
  show(condition: string) {
    this.filterCondition = TodoStatus[condition];
  }

  // check
  isShow(condition: string) {
    return this.filterCondition === TodoStatus[condition];
  }
  // component UI 行為
  selectTodo(todo: Todo, input: HTMLInputElement) {
    todo.selected = true;
    input.value = todo.name;
    setTimeout(() => input.focus(), 0);
  }

  get leftTodo() {
    return this.todoList.map(
        todoList => todoList.filter(todo => !todo.isCompleted).length);
  }
}
