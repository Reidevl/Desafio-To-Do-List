import { TestBed } from '@angular/core/testing';
import { TaskDataService } from './task-data.service';
import { ITask, Status } from 'src/app/Models/Task.interface';

describe('TaskDataService', () => {
  let service: TaskDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with an empty task list', () => {
    const taskList = service.getTaskList();
    expect(taskList).toEqual([]);
  });

  it('should add a task to the task list', () => {
    const newTask: ITask = { id: 1, title: 'Task 1', description: 'Description 1', status: Status.pending };
    service.addTask(newTask);

    const taskList = service.getTaskList();
    expect(taskList).toEqual([newTask]);
  });

  it('should increment the task ID when adding a new task', () => {
    // Add a task to get its ID
    const firstTask: ITask = { id: 1, title: 'Task 1', description: 'Description 1', status: Status.pending };
    service.addTask(firstTask);

    // Add a second task
    const secondTask: ITask = { id: 2, title: 'Task 2', description: 'Description 2', status: Status.completed };
    service.addTask(secondTask);

    const taskList = service.getTaskList();
    expect(taskList[1].id).toBeGreaterThan(firstTask.id);
  });

  it('should edit a task in the task list', () => {
    const task: ITask = { id: 1, title: 'Task 1', description: 'Description 1', status: Status.pending };
    service.addTask(task);

    const updatedTask: ITask = { id: 1, title: 'Updated Task', description: 'Updated Description', status: Status.completed };
    service.editTask(updatedTask);

    const taskList = service.getTaskList();
    expect(taskList[0]).toEqual(updatedTask);
  });

  it('should not edit a task that does not exist in the task list', () => {
    const updatedTask: ITask = { id: 2, title: 'Updated Task', description: 'Updated Description', status: Status.completed };
    service.editTask(updatedTask);

    const taskList = service.getTaskList();
    expect(taskList).toEqual([]);
  });

  it('should delete a task from the task list', () => {
    const task: ITask = { id: 1, title: 'Task 1', description: 'Description 1', status: Status.pending };
    service.addTask(task);

    service.deleteTask(1);

    const taskList = service.getTaskList();
    expect(taskList).toEqual([]);
  });

  it('should not delete a task that does not exist in the task list', () => {
    service.deleteTask(2);

    const taskList = service.getTaskList();
    expect(taskList).toEqual([]);
  });
});
