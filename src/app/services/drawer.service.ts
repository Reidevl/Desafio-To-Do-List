import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DrawerOptions } from '../Models/Drawer.interface';
import { ITask } from '../Models/Task.interface';

@Injectable({
  providedIn: 'root'
})

export class DrawerService {
  private isDrawerOpenSubject = new BehaviorSubject<DrawerOptions>(
    { isOpen: false, drawerTitle: '', isEditing: false }
  );
  isDrawerOpen$ = this.isDrawerOpenSubject.asObservable();

  openDrawer(title: string, isEditing: boolean, data?: ITask): void {
    if(data) {
      this.isDrawerOpenSubject.next(
        {
          isOpen: true,
          drawerTitle: title,
          isEditing: isEditing,
          taskData: data,
        }
      );

    } else {
      this.isDrawerOpenSubject.next(
        { isOpen: true, drawerTitle: title, isEditing: false }
      );
    }
    console.log('abriendo');
  }

  closeDrawer(): void {
    this.isDrawerOpenSubject.next(
      { isOpen: false, drawerTitle: '', isEditing: false }
    );
    console.log('cerrando');
  }
}
