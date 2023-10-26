import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '../Models/Task.interface';

@Pipe({
  name: 'taskTitle'
})
export class TaskTitlePipe implements PipeTransform {
  transform(status: string): string {
    const statusDescriptions: { [key: string]: string } = {
      'Completado': 'Tareas completadas',
      'Pendiente': 'Tareas pendientes',
      'Todos': 'Todas las tareas'
    };
    return statusDescriptions[status] || status;
  }

}
