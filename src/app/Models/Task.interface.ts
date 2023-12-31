export interface ITask {
  id: number;
  title: string;
  description: string;
  status: Status;
};

export enum Status {
  pending = 'Pendiente',
  completed = 'Completado',
}

export enum StatusSelected {
  pending = 'Pendiente',
  completed = 'Completado',
  all = 'Todos'
}
