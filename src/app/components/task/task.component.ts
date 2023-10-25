import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ITask, Status } from 'src/app/Models/Task.interface';

interface EditEvent {
  id: number,
  edit: boolean
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  private nzMessageService = inject(NzMessageService);

  @Input() task: ITask = {
    id: 0,
    title: '',
    description: '',
    status: Status.pending,
  };
  @Output() deleteTaskEvent = new EventEmitter<number>();
  @Output() editTaskEvent = new EventEmitter<EditEvent>();

  taskCompleted: Status = Status.completed;

  // METHODS
  cancel(): void {
    this.nzMessageService.info('Cancelado');
  }

  confirm(): void {
    this.deleteTaskEvent.emit(this.task.id);
    // TODO: Espera la respuesta de la subscripcion y elimina
    this.nzMessageService.info('Tarea eliminada');
  }

  editTask(): void {
    const emitValues: EditEvent = {id: this.task.id, edit: true};
    this.editTaskEvent.emit(emitValues);
  }
}
