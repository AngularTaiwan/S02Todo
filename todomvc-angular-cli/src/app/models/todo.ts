import { TodoStatus } from './todo-status.enum';

export class Todo {
  id?: number;
  status: TodoStatus;
  name: string;

  selected?: boolean;

  constructor(obj: any = {}) {
    this.id = obj.id;
    this.status = obj.status;
    this.name = obj.name;
  }

  get isCompleted() {
    return this.status === TodoStatus.Completed;
  }

  switchStatus() {
    this.status = this.status === TodoStatus.Active ? TodoStatus.Completed : TodoStatus.Active;
  }

}
