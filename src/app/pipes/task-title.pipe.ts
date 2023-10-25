import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '../Models/Task.interface';

@Pipe({
  name: 'taskTitle'
})
export class TaskTitlePipe implements PipeTransform {
  transform(status: string): string {
    const statusDescriptions: { [key: string]: string } = {
      'Completado': 'Lista de tareas completadas',
      'Pendiente': 'Lista de tareas pendientes',
      'Todos': 'Todas las tareas'
    };
    return statusDescriptions[status] || status;
  }

}
