import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DrawerOptions } from 'src/app/Models/Drawer.interface';
import { ITaskEvent } from 'src/app/Models/EmitEvent.interface';
import { ITask, Status } from 'src/app/Models/Task.interface';
import { DrawerService } from 'src/app/services/drawer.service';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  private drawerService = inject(DrawerService);
  private formBuilder = inject(FormBuilder);

  @Output() submitTaskEvent = new EventEmitter<ITaskEvent>();

  taskStatusOptions: Status[] = [Status.completed, Status.pending];
  // Drawer vars
  isDrawerOpen: boolean = false;
  title: string = '';
  isEditing: boolean = false;
  // Form vars
  taskForm!: FormGroup<{
    id: FormControl<number | null>;
    title: FormControl<string | null>;
    description: FormControl<string | null>;
    status: FormControl<Status| null>;
  }>;
  validationMessages: { [key: string]: { [key: string]: string } } = {
    title: {
      required: 'El título es requerido.',
      minlength: 'El título debe tener al menos 6 caracteres.',
    },
    description: {
      required: 'La descripción es requerida.',
      maxlength: 'La descripción no debe exceder los 300 caracteres.',
    },
  };

  ngOnInit(): void {
    this.handleDrawer();
  }

  handleDrawer(): void {
    this.drawerService.isDrawerOpen$
      .subscribe((options: DrawerOptions) => {
        this.isDrawerOpen = options.isOpen;
        this.title = options.drawerTitle;
        this.isEditing = options.isEditing;

        this.initForm(options?.taskData);
    });
  }

  close(): void {
    this.drawerService.closeDrawer();
  };

  initForm(data: ITask | undefined): void {
    const { required, maxLength, minLength } = Validators;

    this.taskForm = this.formBuilder.group({
      id:           [data?.id ?? null],
      title:        [data?.title ?? '', [required, minLength(6)]],
      description:  [data?.description ?? '', [required, maxLength(400)]],
      status:       [data?.status ?? Status.pending, [required]]
    });
  };

  submitTask(): void {
    if (this.taskForm.valid) {
      const data = this.taskForm.value as ITask;
      const emitValues: ITaskEvent = {task: data, edit: this.isEditing}

      this.submitTaskEvent.emit(emitValues);
      this.close()
    } else {
    alert("Por favor rellena todos los campos");
    };
  };

  // Handle error messaage to nzErrorTip using ValidatorsError
  getErrorTip(controlName: string): string {
    const control = this.taskForm.get(controlName);
    if (control) {
      const errors = control.errors;
      if (errors) {
        if (errors['required']) {
          return this.validationMessages[controlName]['required'];
        }
        if (errors['minlength']) {
          return this.validationMessages[controlName]['minlength'];
        }
        if (errors['maxlength']) {
          return this.validationMessages[controlName]['maxlength'];
        }
      }
    }
    return '';
  };
}
