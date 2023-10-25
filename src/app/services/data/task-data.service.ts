import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITask, Status } from 'src/app/Models/Task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskDataService {
  taskList: ITask[] = [
    { id: 1, title: "Mensaje error form", description: "Mensaje de error en la descripcion cuando esta vacio", status: Status.pending },
    { id: 3, title: "Edit estado desde afuera", description: "Permitir editar el estado de una tarea desde afuera", status: Status.pending },
    { id: 5, title: "Lista vacia", description: "mejorar estilo cuando no hay elementos en la lista", status: Status.pending },
  ];

  private taskListSubject = new BehaviorSubject<ITask[]>(this.taskList);
  taskList$ = this.taskListSubject.asObservable();

  getTaskList(): ITask[] {
    return this.taskList;
  }

  addTask(newTask: ITask): void {
    if (this.taskList.length === 0) {
      newTask.id = 1;
    } else {
      const maxId = Math.max(...this.getTaskList().map((t) => t.id));
      newTask.id = maxId + 1;
    }
    this.taskList.push(newTask);
    this.taskListSubject.next(this.taskList);
  }

  editTask(updatedTask: ITask): void {
    const index = this.taskList.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      this.taskList[index] = updatedTask;
      this.taskListSubject.next(this.taskList);
    }
  }

  deleteTask(taskId: number): void {
    const index = this.taskList.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      this.taskList.splice(index, 1);
      this.taskListSubject.next(this.taskList);
    }
  }
}
