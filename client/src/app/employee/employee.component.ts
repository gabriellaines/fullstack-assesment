import { Component, OnInit } from '@angular/core';
import EmployeeService from './employee.service';
import EmployeeModel from './employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit {
  
  public employees: EmployeeModel[] = [];

  constructor(private readonly employeeService: EmployeeService) {}
  
  ngOnInit(): void {
    this.employeeService.getAll()
      .subscribe((employees: EmployeeModel[]) => {
        console.log('employees: ', employees)
        this.employees = employees
      });
  }
}
