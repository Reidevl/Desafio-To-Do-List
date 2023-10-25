import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
// Services
import { DrawerService } from 'src/app/services/drawer.service';
import { TaskService } from 'src/app/services/task.service';
// Interfaces
import { DrawerOptions } from 'src/app/Models/Drawer.interface';
import { IChangeStatusEvent, IEditEvent } from 'src/app/Models/EmitEvent.interface';
import { ITask, Status, StatusSelected } from 'src/app/Models/Task.interface';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit, OnDestroy {

  private drawerService = inject(DrawerService);
  private taskService = inject(TaskService);

  taskListTitle: string = 'Todos'
  taskList: ITask[] = [];
  filteredTaskList: ITask[] = [];
  taskListSub!: Subscription;

  selectStatus: StatusSelected = StatusSelected.all;
  sortedByPendingFirst: boolean = false;
  filterOptions: string [] = Object.values(StatusSelected);
  isDrawerOpen = false;

  ngOnInit(): void {
    this.handleDrawer();
    this.getTaskList();
  }

  ngOnDestroy(): void {
    this.taskListSub.unsubscribe();
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
      console.log('No se esta enviando la data de la tarea')
    }
  };

  // METHODS: To simulate CRUD
  // subscribe to taskList for change detection in taskList
  getTaskList(): void {
    this.taskListSub = this.taskService.getTaskList()
      .subscribe((taskList) => {
        this.taskList = taskList;
        this.filteredTaskList = this.filterTasksByStatus(taskList, this.selectStatus);
      });
  }

  // Validate if drawer is opening to add new task or to edit it
  registerNewOrUpdatedTask(event: {task:ITask, edit:boolean}): void {
    if (event.edit) {
      this.editTask(event.task);
    } else {
      this.addNewTask(event.task);
    }
  };

  addNewTask(task: ITask): void {
    this.taskService.addTask(task);
  };

  editTask(task: ITask): void {
    this.taskService.editTask(task);
  };

  changeTaskStatus(event: IChangeStatusEvent): void {
    const task = this.taskList.find((item: ITask) => item.id === event.id);

    if (task) {
      task.status = event.checked ? Status.completed : Status.pending;
      this.editTask(task);
    }
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
  };

  // METHODS: To filter and sort list
  // filter task by status
  filterTasksByStatus(tasks: ITask[], status: StatusSelected): ITask[] {
    if (status === null || status === StatusSelected.all) {
      this.taskListTitle = 'Todos';
      return tasks;
    } else {
      let statusString: string = status
      this.taskListTitle = status;

      const tasksFiltered: ITask[] = tasks.filter((task: ITask) => task.status === statusString);
      return tasksFiltered
    }
  };

  onStatusChange(status: StatusSelected): void {
    this.selectStatus = status;
    this.filteredTaskList = this.filterTasksByStatus(this.taskList, status);
  };

  // Sort task by status
  toggleSortOrder(): void  {
    this.sortedByPendingFirst = !this.sortedByPendingFirst;
    this.sortTasksByStatus(this.sortedByPendingFirst);
  }

  sortTasksByStatus(listOrdered: boolean): void {
    if (listOrdered) {
      this.filteredTaskList = this.filteredTaskList.sort((a, b) => {
        if (a.status > b.status) return 1;
        if (a.status < b.status) return -1;
        return 0;
      });
    } else {
      this.filteredTaskList = this.filteredTaskList.sort((a, b) => {
        if (a.status > b.status) return -1;
        if (a.status < b.status) return 1;
        return 0;
      });
    }
  }

}
