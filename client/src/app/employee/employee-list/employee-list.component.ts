import { Component, Input, OnInit } from '@angular/core';
import EmployeeModel from '../employee.model';
import EmployeeService from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit {
  public employees: EmployeeModel[] = [];
  constructor(private readonly employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getAll()
      .subscribe((employees: EmployeeModel[]) => this.employees = employees);
  }
}
