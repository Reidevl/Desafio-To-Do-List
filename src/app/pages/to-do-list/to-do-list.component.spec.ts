import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { ToDoListComponent } from './to-do-list.component';
// ngZorro
import { IconDefinition } from '@ant-design/icons-angular';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { PlusOutline } from '@ant-design/icons-angular/icons'
import { BehaviorSubject, of } from 'rxjs';
// Modules
import { NgZorroComponentsModule } from 'src/app/modules/ng-zorro-components.module';
import { ComponentsModule } from 'src/app/modules/components.module';
// Services
import { DrawerService } from 'src/app/services/drawer.service';
import { TaskService } from 'src/app/services/task.service';
// Interfaces
import { IChangeStatusEvent, IEditEvent, ITaskEvent } from 'src/app/Models/EmitEvent.interface';
import { ITask, Status, StatusSelected } from 'src/app/Models/Task.interface';
import { DrawerOptions } from 'src/app/Models/Drawer.interface';

describe('ToDoListComponent', () => {
  let component: ToDoListComponent;
  let fixture: ComponentFixture<ToDoListComponent>;
  let mockTaskList: ITask[] = []

  const icons: IconDefinition[] = [PlusOutline];
  // MockServices
  const mockDrawerService = {
    isDrawerOpen$: new BehaviorSubject<DrawerOptions>({
      isOpen: false,
      drawerTitle: '',
      isEditing: false,
    }),
    openDrawer: jasmine.createSpy('openDrawer'),
    closeDrawer: jasmine.createSpy('closeDrawer'),
  };

  const mockTaskService = {
    getTaskList: () => of(mockTaskList),
    addTask: (task: ITask) => {},
    editTask: (task: ITask) => {},
    deleteTask: (id: number) => {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      declarations: [ ToDoListComponent ],
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        ComponentsModule,
        NgZorroComponentsModule
      ],
      providers: [
        { provide: TaskService, useValue: mockTaskService },
        { provide: DrawerService, useValue: mockDrawerService },
        { provide: NZ_ICONS, useValue: icons }
      ],
    })
    .compileComponents();
    // MockData
    mockTaskList = [
      { id: 1, title: 'Task 1', description: 'Description 1', status: Status.pending },
      { id: 2, title: 'Task 2', description: 'Description 2', status: Status.completed },
      { id: 3, title: 'Task 3', description: 'Description 3', status: Status.completed },
      { id: 4, title: 'Task 4', description: 'Description 4', status: Status.pending },
    ];
    // Create component
    fixture = TestBed.createComponent(ToDoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open to add new task form', () => {
    component.openToAddNewTaskForm();

    expect(mockDrawerService.openDrawer).toHaveBeenCalledWith(
      'Nueva tarea',
      false
    );
  });

  it('should open to edit task form', () => {
    const editData: IEditEvent = { id: 1, edit: true };
    component.openToEditTaskForm(editData);

    expect(mockDrawerService.openDrawer).toHaveBeenCalledWith(
      'Editar tarea',
      true,
      mockTaskList[editData.id - 1]
    );
  });

  it('should subscribe to get task list', () => {
    spyOn(mockTaskService, 'getTaskList').and.returnValue(of(mockTaskList));
    component.ngOnInit();

    expect(component.taskList).toEqual(mockTaskList);
    expect(component.filteredTaskList).toEqual(mockTaskList);
  });

  it('should register new task', () => {
    const mockEvent: ITaskEvent = { task: mockTaskList[0], edit: false };
    spyOn(mockTaskService, 'addTask');
    component.registerNewOrUpdatedTask(mockEvent);

    expect(mockTaskService.addTask).toHaveBeenCalledWith(mockTaskList[0]);
  });

  it('should register updated task', () => {
    const mockEvent: ITaskEvent = { task: mockTaskList[1], edit: true };
    spyOn(mockTaskService, 'editTask');
    component.registerNewOrUpdatedTask(mockEvent);

    expect(mockTaskService.editTask).toHaveBeenCalledWith(mockTaskList[1]);
  });

  it('should change task status to completed', () => {
    const mockEvent: IChangeStatusEvent = { id: 1, checked: true };
    spyOn(mockTaskService, 'editTask');
    component.changeTaskStatus(mockEvent);

    expect(mockTaskService.editTask).toHaveBeenCalled();
    expect(mockTaskList[0].status).toBe(Status.completed);
  });

  it('should change task status to pending', () => {
    const mockEvent: IChangeStatusEvent = { id: 2, checked: false };
    spyOn(mockTaskService, 'editTask');
    component.changeTaskStatus(mockEvent);

    expect(mockTaskService.editTask).toHaveBeenCalled();
    expect(mockTaskList[1].status).toBe(Status.pending);
  });

  it('should delete task', () => {
    spyOn(mockTaskService, 'deleteTask');
    const mockId = 1;
    component.deleteTask(mockId);
    expect(mockTaskService.deleteTask).toHaveBeenCalledWith(mockId);
  });

  it('should filter tasks by status', () => {
    const status = StatusSelected.pending;
    const mockTaskFilter = component.filterTasksByStatus(mockTaskList, status)
    component.onStatusChange(status);

    expect(component.selectStatus).toBe(status);
    expect(component.filteredTaskList).toEqual(mockTaskFilter);
  });

  it('should toggle sort order', () => {
    component.toggleSortOrder();
    expect(component.sortedByPendingFirst).toBe(true);
    component.toggleSortOrder();
    expect(component.sortedByPendingFirst).toBe(false);
  });

  it('should change task status to pending if checked is false', () => {
    const mockEvent: IChangeStatusEvent = { id: 1, checked: false };
    spyOn(mockTaskService, 'editTask');
    component.changeTaskStatus(mockEvent);

    expect(mockTaskService.editTask).toHaveBeenCalled();
    expect(mockTaskList[0].status).toBe(Status.pending);
  });

  it('should sort tasks by status in pending first', () => {
    component.toggleSortOrder();
    const mockTaskListOrdered: ITask[] = [
      { id: 1, title: 'Task 1', description: 'Description 1', status: Status.pending },
      { id: 4, title: 'Task 4', description: 'Description 4', status: Status.pending },
      { id: 2, title: 'Task 2', description: 'Description 2', status: Status.completed },
      { id: 3, title: 'Task 3', description: 'Description 3', status: Status.completed },
    ];

    expect(component.sortedByPendingFirst).toBe(true);
    expect(component.filteredTaskList).toEqual(mockTaskListOrdered);
  });

  it('should sort tasks by status in completed first', () => {
    component.sortedByPendingFirst = true
    component.toggleSortOrder();
    const mockTaskListOrdered: ITask[] = [
      { id: 2, title: 'Task 2', description: 'Description 2', status: Status.completed },
      { id: 3, title: 'Task 3', description: 'Description 3', status: Status.completed },
      { id: 1, title: 'Task 1', description: 'Description 1', status: Status.pending },
      { id: 4, title: 'Task 4', description: 'Description 4', status: Status.pending },
    ];

    expect(component.sortedByPendingFirst).toBe(false);
    expect(component.filteredTaskList).toEqual(mockTaskListOrdered);
  });
});
