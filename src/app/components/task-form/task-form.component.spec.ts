import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskFormComponent } from './task-form.component';
import { DrawerService } from 'src/app/services/drawer.service';
import { Status } from 'src/app/Models/Task.interface';
import { NgZorroComponentsModule } from 'src/app/modules/ng-zorro-components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let drawerService: DrawerService;

  // const
  const { required, minLength, maxLength} = Validators

  // Mock data
  const mockData = {
    isOpen: true,
    drawerTitle: 'Test Title',
    isEditing: false,
    taskData: {
      id: 1,
      title: 'Test Task',
      description: 'Test Description',
      status: Status.completed,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskFormComponent],
      imports: [
        ReactiveFormsModule,
        NgZorroComponentsModule,
        BrowserAnimationsModule
      ],
      providers: [
        DrawerService,
        FormBuilder
      ],
    })
      .compileComponents();
      // Create component
      fixture = TestBed.createComponent(TaskFormComponent);
      component = fixture.componentInstance;
      drawerService = TestBed.inject(DrawerService);
      fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call handleDrawer', () => {
    drawerService.openDrawer(
      mockData.drawerTitle,
      mockData.isEditing,
      mockData.taskData
    );

    expect(component.isDrawerOpen).toBeTrue();
    expect(component.title).toEqual('Test Title');
    expect(component.isEditing).toBeFalse();
    expect(component.taskForm.get('title')?.value).toEqual('Test Task');
    expect(component.taskForm.get('description')?.value).toEqual('Test Description');
    expect(component.taskForm.get('status')?.value).toEqual(Status.completed);
  });

  it('should close drawer', () => {
    drawerService.openDrawer(
      mockData.drawerTitle,
      mockData.isEditing,
      mockData.taskData
    );
    component.close();

    expect(component.isDrawerOpen).toBeFalse();
  });

  it('should initialize form', () => {
    component.initForm(undefined);

    expect(component.taskForm.get('title')?.value).toEqual('');
    expect(component.taskForm.get('description')?.value).toEqual('');
    expect(component.taskForm.get('status')?.value).toEqual(Status.pending);
  });

  it('should submit task form informacion to create task', () => {
    const form = component.formBuilder.group({
      id: [mockData.taskData.id],
      title: [mockData.taskData.title, [required, minLength(6)]],
      description: [mockData.taskData.description, [required, maxLength(400)]],
      status: [mockData.taskData.status, [required]],
    });

    component.taskForm = form;
    component.isEditing = false;

    spyOn(component.submitTaskEvent, 'emit');
    spyOn(component, 'close');

    component.submitTask();

    expect(component.submitTaskEvent.emit).toHaveBeenCalledOnceWith({
      task: mockData.taskData,
      edit: false,
    });

    expect(component.close).toHaveBeenCalled();
  });

  it('should handle error message for title required', () => {
    const mockControl = new FormControl('', [required, minLength(6)]);
    component.taskForm = new FormBuilder().group({
      ...mockData.taskData,
      title: mockControl,
    });

    const errorTip = component.getErrorTip('title');
    mockControl.markAsTouched();

    expect(errorTip).toBe('El título es requerido.');
  });

  it('should handle error message for title minLength', () => {
    const mockControl = new FormControl('short', [Validators.minLength(6)]);
    component.taskForm = new FormBuilder().group({
      ...mockData.taskData,
      title: mockControl,
    });

    const errorTip = component.getErrorTip('title');
    mockControl.markAsTouched();

    expect(errorTip).toBe('El título debe tener al menos 6 caracteres.');
  });

  it('should handle error message for title maxLength', () => {
    const mockControl = new FormControl(
      'Test title for testing error messagge when title.length is greater than 30 character',
      [Validators.maxLength(30)]);
    component.taskForm = new FormBuilder().group({
      ...mockData.taskData,
      title: mockControl
    });

    const errorTip = component.getErrorTip('title');
    mockControl.markAsTouched();

    expect(errorTip).toBe('El título no debe exceder los 30 caracteres.');
  });

  it('should handel error message for description', () => {
    const mockControl = new FormControl('', [required, maxLength(400)]);
    component.taskForm = new FormBuilder().group({
      ...mockData.taskData,
      description: mockControl,
    });

    const errorTip = component.getErrorTip('description');
    mockControl.markAsTouched();

    expect(errorTip).toBe('La descripción es requerida.');
  });

  it('should return an empty string when there are no errors on title', () => {
    const mockControl = new FormControl('Testing no error', required);
    component.taskForm = new FormBuilder().group({
      ...mockData.taskData,
      title: mockControl,
    });

    const errorTip = component.getErrorTip('title');

    expect(errorTip).toBe('');
  });
});
