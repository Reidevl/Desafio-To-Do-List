import { ITask } from "./Task.interface";

export interface DrawerOptions {
  isOpen: boolean;
  drawerTitle: string;
  isEditing: boolean;
  taskData?: ITask;
}
