import { Pipe, PipeTransform } from '@angular/core';

import { Todo, TodoStatus } from './models';

@Pipe({
  name: 'todoStatusFilter'
})
export class TodoStatusFilterPipe implements PipeTransform {

  transform(list: Todo[], condition?: TodoStatus): Todo[] {
    if (!condition) { return list; }
    return list.filter(todo => todo.status === condition);
  }

}
