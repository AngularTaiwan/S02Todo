import {Injectable} from '@angular/core';

@Injectable()
export class StorageApiService {
  readonly storageKey = 'todoList';
  constructor() {}

  save(todoList) {
    localStorage.setItem(this.storageKey, JSON.stringify(todoList));
  }

  get() {
    return JSON.parse(localStorage.getItem(this.storageKey))
  }
}
