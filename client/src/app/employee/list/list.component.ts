import { Component, Input, OnInit } from '@angular/core';
import EmployeeModel from '../employee.model';
import EmployeeService from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  public employees: EmployeeModel[] = [];
  constructor(private readonly employeeService: EmployeeService, private readonly routerService: Router) {}

  ngOnInit(): void {
    this.employeeService.getAll()
      .subscribe((employees: EmployeeModel[]) => this.employees = employees);
  }

  viewDetails(id: number) {
    this.routerService.navigate(['employee/detail', id])
  }
}
