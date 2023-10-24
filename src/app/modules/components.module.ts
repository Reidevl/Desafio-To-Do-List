import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from '../components/task-list/task-list.component';
import { NgZorroComponentsModule } from './ng-zorro-components.module';
import { FormsModule, NgForm } from '@angular/forms';
import { TaskComponent } from '../components/task/task.component';

// All components imports should be managed from here

@NgModule({
  declarations: [
    TaskListComponent,
    TaskComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroComponentsModule
  ],
  exports: [
    TaskListComponent,
    TaskComponent
  ]
})
export class ComponentsModule { }
