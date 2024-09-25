import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import EmployeeModel from '../employee.model';
import EmployeeService from '../employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss'
})
export class EmployeeDetailComponent implements OnInit {
  
  public employee!: EmployeeModel;

  constructor(private readonly route: ActivatedRoute, private readonly employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const { id } = params;
      this.employeeService.findOne(id)
        .subscribe((employee: EmployeeModel) => this.employee = employee);
    })
  }


}
