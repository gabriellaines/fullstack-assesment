import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail/detail.component';
import EmployeeService from './employee.service';
import { EmployeeRoutingModule } from './employee-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import DepartmentModule from '../department/department.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DetailComponent, ListComponent, FormComponent],
  providers: [EmployeeService],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule,
    DepartmentModule,
    FormsModule,
  ],
  exports: []
})
export class EmployeeModule {}