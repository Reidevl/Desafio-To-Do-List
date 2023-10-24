import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from '../components/task-list/task-list.component';
import { NgZorroComponentsModule } from './ng-zorro-components.module';
import { FormsModule, NgForm } from '@angular/forms';

// All components imports should be managed from here

@NgModule({
  declarations: [
    TaskListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroComponentsModule
  ],
  exports: [
    TaskListComponent
  ]
})
export class ComponentsModule { }
