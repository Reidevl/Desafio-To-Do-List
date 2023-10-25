import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TaskComponent } from './task.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IChangeStatusEvent } from 'src/app/Models/EmitEvent.interface';
import { Status } from 'src/app/Models/Task.interface';
import { NgZorroComponentsModule } from '../../modules/ng-zorro-components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let nzMessageService: NzMessageService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports:[NgZorroComponentsModule, BrowserAnimationsModule],
        declarations: [TaskComponent],
        providers: [NzMessageService],
      }).compileComponents();
      // Create component
      fixture = TestBed.createComponent(TaskComponent);
      component = fixture.componentInstance;
      nzMessageService = TestBed.inject(NzMessageService);

      // Mock the initial task
      component.task = {
        id: 1,
        title: 'Test Task',
        description: 'Description',
        status: Status.pending,
      };

      fixture.detectChanges();
    })

  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit deleteTaskEvent', () => {
    const deleteTaskSpy = spyOn(component.deleteTaskEvent, 'emit');
    component.confirm();
    expect(deleteTaskSpy).toHaveBeenCalledWith(component.task.id);
  });

  it('should emit editTaskEvent', () => {
    const editTaskSpy = spyOn(component.editTaskEvent, 'emit');
    component.editTask();
    expect(editTaskSpy).toHaveBeenCalledWith({ id: component.task.id, edit: true });
  });

  it('should emit statusChanged event', () => {
    const statusChangedSpy = spyOn(component.statusChanged, 'emit');
    component.onStatusChange();
    const expectedChange: IChangeStatusEvent = { id: component.task.id, checked: true };
    expect(statusChangedSpy).toHaveBeenCalledWith(expectedChange);
  });

  it('should show message when cancel is called', () => {
    const nzMessageServiceSpy = spyOn(nzMessageService, 'info');
    component.cancel();
    expect(nzMessageServiceSpy).toHaveBeenCalledWith('Cancelado');
  });
});
