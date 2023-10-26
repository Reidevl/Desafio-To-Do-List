import { Injectable, inject } from '@angular/core';
import { TaskDataService } from './data/task-data.service';
import { ITask } from '../Models/Task.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskDataService = inject(TaskDataService)

  getTaskList(): Observable<ITask[]> {
    return this.taskDataService.taskList$;
  }

  addTask(newTask: ITask): void {
    this.taskDataService.addTask(newTask);
  }

  editTask(updatedTask: ITask): void {
    this.taskDataService.editTask(updatedTask);
  }

  deleteTask(taskId: number): void {
    this.taskDataService.deleteTask(taskId);
  }
}
