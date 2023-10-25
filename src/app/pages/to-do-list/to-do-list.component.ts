import { Component, OnInit, inject } from '@angular/core';
import { DrawerOptions } from 'src/app/Models/Drawer.interface';
import { IEditEvent } from 'src/app/Models/EmitEvent.interface';
import { ITask, Status } from 'src/app/Models/Task.interface';
import { DrawerService } from 'src/app/services/drawer.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {

  private drawerService = inject(DrawerService);
  private taskService = inject(TaskService);

  taskList: ITask []= [];

  selectStatus: Status = Status.all;
  filterOptions: string [] = Object.values(Status);
  isDrawerOpen = false;

  ngOnInit(): void {
    this.handleDrawer();
    this.getTaskList();
  }

  handleDrawer(): void {
    this.drawerService.isDrawerOpen$.subscribe((options: DrawerOptions) => {
      this.isDrawerOpen = options.isOpen;
    });
  }

  openToAddNewTaskForm(): void {
    this.drawerService.openDrawer('Nueva tarea', false);
  };

  // Get taskInfo using taskID
  openToEditTaskForm(event: IEditEvent): void {
    const task = this.taskList.find((item: ITask) => item.id === event.id);

    if(task){
      this.drawerService.openDrawer('Editar tarea', event.edit, task );
    } else {
      console.log('Error')
    }
  };

  // METHODS: To simulate CRUD

  getTaskList() {
    this.taskList = this.taskService.getTaskList();
  };

  // Validate if drawer is opening to add new task or to edit it
  registerNewOrUpdatedTask(event: {task:ITask, edit:boolean}){
    if (event.edit) {
      this.editTask(event.task);
    } else {
      this.addNewTask(event.task);
    }
  };

  addNewTask(task: ITask) {
    this.taskService.addTask(task);
  };

  editTask(task: ITask) {
    this.taskService.editTask(task);
  };

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
  };

}
