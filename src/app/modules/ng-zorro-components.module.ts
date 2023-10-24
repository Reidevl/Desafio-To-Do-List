import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageModule } from 'ng-zorro-antd/message';


// All ng-zorro imports should be managed from here

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzGridModule,
    NzPageHeaderModule,
    NzCheckboxModule,
    NzCardModule,
    NzTypographyModule,
    NzSelectModule,
    NzButtonModule,
    NzIconModule,
    NzPopconfirmModule
  ],
  exports:[
    NzGridModule,
    NzPageHeaderModule,
    NzCheckboxModule,
    NzCardModule,
    NzTypographyModule,
    NzSelectModule,
    NzButtonModule,
    NzIconModule,
    NzPopconfirmModule,
    NzMessageModule
  ]
})
export class NgZorroComponentsModule { }
