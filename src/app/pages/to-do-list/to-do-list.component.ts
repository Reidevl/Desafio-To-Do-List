import { Component } from '@angular/core';
import { Status } from 'src/app/Models/Task.interface';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent {

  selectStatus: Status = Status.all;
  filterOptions: string [] = Object.values(Status);

}
