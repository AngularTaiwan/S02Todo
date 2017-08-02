import { Component, OnInit } from '@angular/core';

import { Todo, TodoStatus } from './models';
import { generateId } from './mock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  filterCondition: TodoStatus|undefined;

  todoList: Todo[] = [];

  ngOnInit(): void {
    const data = JSON.parse(localStorage.getItem('todoList'));
    this.todoList = data.map(p => new Todo({id: p.id, name: p.name, status: p.status}));
  }

  saveToLocalStorage() {
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }

  createNewTodo(input: HTMLInputElement) {
    this.todoList.push(new Todo({
      id: Math.max(0, ...this.todoList.map(p => p.id)) + 1,
      name: input.value,
      status: TodoStatus.Active,
    }));
    input.value = '';
    this.saveToLocalStorage();
  }

  updateTodo(todo: Todo, input: HTMLInputElement) {
    todo.name = input.value;
    todo.selected = false;
    this.saveToLocalStorage();
  }

  switchStatus(todo: Todo) {
    todo.switchStatus();
    this.saveToLocalStorage();
  }

  deleteTodo(index: number) {
    this.todoList.splice(index, 1);
    this.saveToLocalStorage();
  }

  clearCompletedTodo() {
    this.todoList = this.todoList.filter(todo => !todo.isCompleted);
    this.saveToLocalStorage();
  }

  completedAllTodo() {
    this.todoList.forEach(todo => todo.status = TodoStatus.Completed);
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
