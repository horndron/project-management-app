import { Pipe, PipeTransform } from '@angular/core';
import { Task } from 'src/app/models/task';

@Pipe({
  name: 'taskSortingOrder',
})
export class TaskSortingOrderPipe implements PipeTransform {
  transform(tasks: Task[]): Task[] {
    const newTasks = [...tasks];
    return newTasks.sort((a, b) => a.order - b.order);
  }
}
