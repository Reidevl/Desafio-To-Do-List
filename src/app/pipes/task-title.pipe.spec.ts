import { TaskTitlePipe } from './task-title.pipe';

describe('TaskTitlePipe', () => {
  let pipe: TaskTitlePipe;

  beforeEach(() => {
    pipe = new TaskTitlePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform "Completado" to "Tareas completadas"', () => {
    const transformedStatus = pipe.transform('Completado');
    expect(transformedStatus).toBe('Tareas completadas');
  });

  it('should transform "Pendiente" to "Tareas pendientes"', () => {
    const transformedStatus = pipe.transform('Pendiente');
    expect(transformedStatus).toBe('Tareas pendientes');
  });

  it('should transform "Todos" to "Todas las tareas"', () => {
    const transformedStatus = pipe.transform('Todos');
    expect(transformedStatus).toBe('Todas las tareas');
  });

  it('should transform unknown status to the original status', () => {
    const transformedStatus = pipe.transform('SomeStatus');
    expect(transformedStatus).toBe('SomeStatus');
  });

  it('should transform an empty status to an empty string', () => {
    const transformedStatus = pipe.transform('');
    expect(transformedStatus).toBe('');
  });
});
