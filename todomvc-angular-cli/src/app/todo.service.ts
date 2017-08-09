import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/from';

import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Subject} from 'rxjs/Subject';

import {Todo} from './models/todo';
import {TodoStatus} from './models/todo-status.enum';
import {StorageApiService} from './storage-api.service';
import {TodoApiService} from './todo-api.service';

@Injectable()
export class TodoService {
  private todoList: Todo[] = [];
  todoList$ = new ReplaySubject<Todo[]>(1);

  constructor(
      private todoAPI: TodoApiService, private storage: StorageApiService) {
    this.init();
  }

  getList(): Observable<Todo[]> {
    return this.todoList$.asObservable();
  }

  init() {
    this.todoAPI.get()
        .map(data => data.json())
        .map(
            (data: any[]) =>
                data.map(
                    p => new Todo(
                        {id: p.id, name: p.name, status: p.status})) as Todo[])
        .subscribe(data => {
          this.todoList = data;
          this.todoList$.next(this.todoList);
        });
  }
  private createTodo(value) {
    return new Todo({
      id: Math.max(0, ...this.todoList.map(p => p.id)) + 1,
      name: value,
      status: TodoStatus.Active,
    });
  }
  create(value: string) {
    const todo = this.createTodo(value);
    this.todoAPI.add(todo)
        .do(() => {
          this.todoList = [...this.todoList, todo];
          this.storage.save(this.todoList);
        })
        .catch((err) => {
          this.todoList = this.storage.get();
          return Observable.throw(err);
        })
        .subscribe(
            () => {
              this.updateList();
            },
            (e) => {
              this.updateList();
            });
  }

  update(todo: Todo, value: string) {
    todo.name = value;
    todo.selected = false;
    this.todoAPI.update(todo).subscribe(() => {
      this.updateList();
    })
  }

  switchStatus(todo: Todo) {
    todo.switchStatus();
    this.todoAPI.update(todo).subscribe(() => {
      this.updateList();
    })
  }

  delete(todo: Todo) {
    // this.deleteTodoWithHttp(this.todoList[index]);
    let idx = this.todoList.findIndex(t => t.id === todo.id);
    if (idx > -1) {
      const remove = this.todoList.slice(idx, 1);
      this.todoAPI.delete(remove[0]).subscribe(() => {
        this.updateList();
      })
    }
  }

  clearCompletedTodo() {
    Observable.from(this.todoList)
        .filter(todo => todo.isCompleted)
        .mergeMap(todo => this.todoAPI.delete(todo))
        .subscribe(() => {
          this.todoList = this.todoList.filter(todo => !todo.isCompleted);
          this.updateList();
        });
  }

  completedAllTodo() {
    Observable.from(this.todoList)
        .map(todo => {
          todo.status = TodoStatus.Completed;
          return todo;
        })
        .mergeMap((todo) => {return this.todoAPI.update(todo)})
        .subscribe(() => {
          this.updateList();
        })
  }

  private updateList() {
    this.todoList$.next(this.todoList);
  }
}
