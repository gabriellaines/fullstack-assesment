import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import EmployeeService from './employee.service';
import { EmployeeRoutingModule } from './employee-routing.module';

@NgModule({
  declarations: [EmployeeDetailComponent],
  providers: [EmployeeService],
  imports: [
    CommonModule,
    EmployeeRoutingModule
  ] 
})
export class EmployeeModule {}