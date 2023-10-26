import { TestBed } from '@angular/core/testing';
import { DrawerService } from './drawer.service';
import { ITask, Status } from '../Models/Task.interface';

describe('DrawerService', () => {
  let service: DrawerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrawerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open the drawer with data', () => {
    const title = 'Editar tarea';
    const isEditing = false;
    const taskData: ITask = { id: 1, title: 'Task 1', description: 'Description 1', status: Status.pending };

    service.openDrawer(title, isEditing, taskData);

    service.isDrawerOpen$.subscribe((drawerOptions) => {
      expect(drawerOptions.isOpen).toBe(true);
      expect(drawerOptions.drawerTitle).toBe(title);
      expect(drawerOptions.isEditing).toBe(isEditing);
      expect(drawerOptions.taskData).toBe(taskData);
    });
  });

  it('should open the drawer without data', () => {
    const title = 'Nueva tarea';
    const isEditing = false;

    service.openDrawer(title, isEditing);

    service.isDrawerOpen$.subscribe((drawerOptions) => {
      expect(drawerOptions.isOpen).toBe(true);
      expect(drawerOptions.drawerTitle).toBe(title);
      expect(drawerOptions.isEditing).toBe(isEditing);
      expect(drawerOptions.taskData).toBeUndefined();
    });
  });

  it('should close the drawer', () => {
    service.closeDrawer();

    service.isDrawerOpen$.subscribe((drawerOptions) => {
      expect(drawerOptions.isOpen).toBe(false);
      expect(drawerOptions.drawerTitle).toBe('');
      expect(drawerOptions.isEditing).toBe(false);
      expect(drawerOptions.taskData).toBeUndefined();
    });
  });
});
