import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from '../components/task-list/task-list.component';

// All components imports should be managed from here

@NgModule({
  declarations: [
    TaskListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TaskListComponent
  ]
})
export class ComponentsModule { }
