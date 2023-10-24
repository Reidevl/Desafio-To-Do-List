import { ITask } from "./Task.interface";

export interface DrawerOptions {
  isOpen: boolean;
  drawerTitle: string;
  taskData?: ITask
}
