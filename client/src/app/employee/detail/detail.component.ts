import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import EmployeeModel from '../employee.model';
import EmployeeService from '../employee.service';
import { Location } from '@angular/common';
import { mergeMap, Observable, tap } from 'rxjs';
import DepartmentService from '../../department/department.service';
import DepartmentModel from '../../department/department.model';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {

  public employee$!: Observable<EmployeeModel>;
  private employee!: EmployeeModel;
  public departments$!: Observable<DepartmentModel[]>;
  private departments!: DepartmentModel[];
  public canUpdateDepartment: boolean = false;

  constructor(
    private readonly route: ActivatedRoute, 
    private readonly employeeService: EmployeeService, 
    private readonly locationService: Location,
    private readonly departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const { id } = params;
      this.employee$ = this.employeeService.getById(id).pipe(
        tap((employee: EmployeeModel) => this.employee = employee)
      );
    });

    this.departments$ = this.departmentService.getAll()
      .pipe(
        tap((departments: DepartmentModel[]) => this.departments = departments)
      )
  }

  return() {
    this.locationService.back();
  }

  toggleStatus(employee: EmployeeModel) {
    this.employeeService.updateEmployee(employee.id!, { active: !employee.active })
      .pipe(
        tap(() => this.refreshEmployee())
      ).subscribe();
  }

  onDepartmentChange() {
    this.canUpdateDepartment = true;
  }

  refreshEmployee() {
    this.employee$ = this.employeeService.getById(this.employee.id!)
      .pipe(
        tap((employee: EmployeeModel) => {
          this.employee = employee;
          this.canUpdateDepartment = false;
        })
      )
  }

  updateDepartment() {
    console.log('employee: ', this.employee)
    const newDepartment = this.departments.find((department: DepartmentModel) => department.id === this.employee.department.id);

    this.employeeService.updateEmployee(this.employee.id!, { 
      departmentId: newDepartment?.id! 
    }).pipe(
      tap(() => this.refreshEmployee())
    ).subscribe();
  } 

}
