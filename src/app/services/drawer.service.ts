import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DrawerOptions } from '../Models/Drawer.interface';
import { ITask, Status } from '../Models/Task.interface';

@Injectable({
  providedIn: 'root'
})

export class DrawerService {
  private isDrawerOpenSubject = new BehaviorSubject<DrawerOptions>(
    { isOpen: false, drawerTitle: '' }
  );
  isDrawerOpen$ = this.isDrawerOpenSubject.asObservable();

  openDrawer(title: string, data?: ITask): void {
    if(data) {
      this.isDrawerOpenSubject.next(
        {
          isOpen: true,
          drawerTitle: title,
          taskData: data
        }
      );
    } else {
      this.isDrawerOpenSubject.next(
        { isOpen: true, drawerTitle: title }
      );
    }
    console.log('abriendo');
  }

  closeDrawer(): void {
    this.isDrawerOpenSubject.next(
      { isOpen: false, drawerTitle: '' }
    );
    console.log('cerrando');
  }
}
