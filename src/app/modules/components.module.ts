import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from '../components/task-list/task-list.component';
import { NgZorroComponentsModule } from './ng-zorro-components.module';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { TaskComponent } from '../components/task/task.component';
import { TaskFormComponent } from '../components/task-form/task-form.component';
import { NoTasksComponent } from '../components/no-tasks/no-tasks.component';
import { TaskTitlePipe } from '../pipes/task-title.pipe';

// All components imports should be managed from here

@NgModule({
  declarations: [
    TaskListComponent,
    TaskComponent,
    TaskFormComponent,
    NoTasksComponent,
    TaskTitlePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroComponentsModule
  ],
  exports: [
    TaskListComponent,
    TaskComponent,
    TaskFormComponent,
    NoTasksComponent,
    TaskTitlePipe
  ]
})
export class ComponentsModule { }
