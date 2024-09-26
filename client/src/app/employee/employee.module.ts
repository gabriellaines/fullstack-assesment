import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import EmployeeService from './employee.service';
import { EmployeeRoutingModule } from './employee-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';

@NgModule({
  declarations: [EmployeeDetailComponent, EmployeeListComponent],
  providers: [EmployeeService],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule
  ],
  exports: []
})
export class EmployeeModule {}