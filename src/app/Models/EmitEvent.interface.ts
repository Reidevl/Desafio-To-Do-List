import { ITask } from './Task.interface';

export interface IEditEvent {
  id: number,
  edit: boolean
}

export interface ITaskEvent {
  task: ITask,
  edit: boolean
}

export interface IChangeStatusEvent {
  id: number,
  checked: boolean
}
