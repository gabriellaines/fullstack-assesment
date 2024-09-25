import { Component, Input } from '@angular/core';
import EmployeeModel from '../employee.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  @Input()
  public employees: EmployeeModel[] = [];
}
