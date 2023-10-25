import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IEditEvent } from 'src/app/Models/EmitEvent.interface';
import { ITask, Status } from 'src/app/Models/Task.interface';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  @Input() taskList: ITask [] = [];
  @Output() deleteTaskEvent = new EventEmitter<number>();
  @Output() editTaskEvent = new EventEmitter<IEditEvent>();

  taskCompleted: Status = Status.completed;

  // TODO: Implementar la logica correspondiente para tachar la tarea y moverla a otra section

  deleteTask(id: number) {
    this.deleteTaskEvent.emit(id);
  };

  editTask(event: IEditEvent){
    const emitValues: IEditEvent = {id: event.id, edit: event.edit};
    this.editTaskEvent.emit(emitValues);
  };

}
