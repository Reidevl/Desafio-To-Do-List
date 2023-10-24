import { Component, OnInit, inject } from '@angular/core';
import { DrawerOptions } from 'src/app/Models/Drawer.interface';
import { Status } from 'src/app/Models/Task.interface';
import { DrawerService } from 'src/app/services/drawer.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {

  private drawerService = inject(DrawerService);

  selectStatus: Status = Status.all;
  filterOptions: string [] = Object.values(Status);
  isDrawerOpen = false;

  ngOnInit(): void {
    this.handleDrawer();
  }

  handleDrawer(): void {
    this.drawerService.isDrawerOpen$.subscribe((options: DrawerOptions) => {
      this.isDrawerOpen = options.isOpen;
    });
  }

  openTaskForm(): void {
    this.drawerService.openDrawer('Nueva tarea');
  }

}
