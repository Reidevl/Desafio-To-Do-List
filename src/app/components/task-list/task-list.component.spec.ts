import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { IChangeStatusEvent, IEditEvent } from 'src/app/Models/EmitEvent.interface';
import { ComponentsModule } from 'src/app/modules/components.module';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      imports: [
        ComponentsModule
      ],
    }).compileComponents();
    // Create component
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit delete task event', () => {
    const mockId = 1;
    spyOn(component.deleteTaskEvent, 'emit');
    component.deleteTask(mockId);

    expect(component.deleteTaskEvent.emit).toHaveBeenCalledWith(mockId);
  });

  it('should emit edit task event', () => {
    const mockEvent: IEditEvent = { id: 1, edit: true };
    spyOn(component.editTaskEvent, 'emit');
    component.editTask(mockEvent);

    expect(component.editTaskEvent.emit).toHaveBeenCalledWith(mockEvent);
  });

  it('should emit task status changed event', () => {
    const mockEvent: IChangeStatusEvent = { id: 1, checked: true };
    spyOn(component.taskStatusChanged, 'emit');
    component.onTaskStatusChange(mockEvent);

    expect(component.taskStatusChanged.emit).toHaveBeenCalledWith(mockEvent);
  });
});
