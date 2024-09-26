import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import EmployeeModel from '../employee.model';
import EmployeeService from '../employee.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss'
})
export class EmployeeDetailComponent implements OnInit {
  
  public employee!: EmployeeModel;

  constructor(private readonly route: ActivatedRoute, private readonly employeeService: EmployeeService, private readonly locationService: Location) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const { id } = params;
      this.employeeService.getById(id)
        .subscribe((employee: EmployeeModel) => this.employee = employee);
    })
  }

  return() {
    this.locationService.back();
  }

}
