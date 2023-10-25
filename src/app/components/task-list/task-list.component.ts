import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IChangeStatusEvent, IEditEvent } from 'src/app/Models/EmitEvent.interface';
import { ITask } from 'src/app/Models/Task.interface';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  @Input() taskList: ITask [] = [];
  @Output() deleteTaskEvent = new EventEmitter<number>();
  @Output() editTaskEvent = new EventEmitter<IEditEvent>();
  @Output() taskStatusChanged = new EventEmitter<IChangeStatusEvent>();

  deleteTask(id: number) {
    this.deleteTaskEvent.emit(id);
  };

  editTask(event: IEditEvent){
    const emitValues: IEditEvent = { id: event.id, edit: event.edit };
    this.editTaskEvent.emit(emitValues);
  };

  onTaskStatusChange(event: IChangeStatusEvent): void {
    const emitValues: IChangeStatusEvent = { id: event.id, checked: event.checked };
    this.taskStatusChanged.emit(emitValues);
  }

}
