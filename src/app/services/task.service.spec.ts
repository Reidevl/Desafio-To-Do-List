import { TestBed, inject } from '@angular/core/testing';
import { TaskService } from './task.service';
import { TaskDataService } from './data/task-data.service';
import { ITask, Status } from '../Models/Task.interface';
import { of } from 'rxjs';

describe('TaskService', () => {
  let service: TaskService;
  let taskDataService: TaskDataService;

  // Mock de TaskDataService
  const mockTaskList: ITask[] = [
    { id: 1, title: 'Task 1', description: 'Description 1', status: Status.completed },
    { id: 2, title: 'Task 2', description: 'Description 2', status: Status.pending },
  ];

  const taskDataServiceMock = {
    taskList$: of(mockTaskList),
    addTask: (newTask: ITask) => {},
    editTask: (updatedTask: ITask) => {},
    deleteTask: (taskId: number) => {},
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TaskService,
        { provide: TaskDataService, useValue: taskDataServiceMock },
      ],
    });
    service = TestBed.inject(TaskService);
    taskDataService = TestBed.inject(TaskDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the task list', () => {
    let receivedTaskList: ITask[] | undefined;
    service.getTaskList().subscribe((tasks) => (receivedTaskList = tasks));
    expect(receivedTaskList).toEqual(mockTaskList);
  });

  it('should add a new task', () => {
    const newTask: ITask = { id: 3, title: 'Task 3', description: 'Description 3', status: Status.pending };
    spyOn(taskDataService, 'addTask');
    service.addTask(newTask);
    expect(taskDataService.addTask).toHaveBeenCalledWith(newTask);
  });

  it('should edit an existing task', () => {
    const updatedTask: ITask = { id: 1, title: 'Updated Task 1', description: 'Updated Description 1', status: Status.pending };
    spyOn(taskDataService, 'editTask');
    service.editTask(updatedTask);
    expect(taskDataService.editTask).toHaveBeenCalledWith(updatedTask);
  });

  it('should delete a task', () => {
    const taskIdToDelete = 2;
    spyOn(taskDataService, 'deleteTask');
    service.deleteTask(taskIdToDelete);
    expect(taskDataService.deleteTask).toHaveBeenCalledWith(taskIdToDelete);
  });
});
