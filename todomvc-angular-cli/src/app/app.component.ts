import { Component } from '@angular/core';

import { Todo, TodoStatus } from './models';
import { generateId } from './mock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  filterCondition: TodoStatus | undefined;

  todoList: Todo[] = [
    new Todo({
      id: generateId(),
      name: 'Taste JavaScript',
      status: TodoStatus.Completed,
    }),
    new Todo({
      id: generateId(),
      name: 'Buy a unicorn',
      status: TodoStatus.Active,
    }),
  ];

  createNewTodo(input: HTMLInputElement) {
    this.todoList.push(new Todo({
      id: generateId(),
      name: input.value,
      status: TodoStatus.Active,
    }));
    input.value = '';
  }

  // setting
  showAll() { this.filterCondition = undefined; }
  showActive() { this.filterCondition = TodoStatus.Active; }
  showCompleted() { this.filterCondition = TodoStatus.Completed; }

  // check
  isShowAll() { return !this.filterCondition; }
  isShowActive() { return this.filterCondition === TodoStatus.Active; }
  isShowCompleted() { return this.filterCondition === TodoStatus.Completed; }

  selectTodo(todo: Todo, input: HTMLInputElement) {
    todo.selected = true;
    input.value = todo.name;
    setTimeout(() => input.focus(), 0);
  }

  deleteTodo(index: number) {
    this.todoList.splice(index, 1);
  }

  clearCompletedTodo() {
    this.todoList = this.todoList.filter(todo => !todo.isCompleted);
  }

  get leftTodo() {
    return this.todoList.filter(todo => !todo.isCompleted).length;
  }

  completedAllTodo() {
    this.todoList.forEach(todo => todo.status = TodoStatus.Completed);
  }


}
