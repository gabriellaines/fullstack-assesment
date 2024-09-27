import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './department/entity/department.entity';
import { Employee } from './employee/entity/employee.entity'; 
import { EmployeeService } from './employee/employee.service';

@Injectable()
export class DatabaseSeeder {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private employeeService: EmployeeService
  ) {}

  async seed() {
    const departmentsCount = await this.departmentRepository.count();
    let createdDepartments;
    if (departmentsCount === 0) {
      const departments = [
        { name: 'HR' },
        { name: 'Development' },
        { name: 'Sales' },
      ];
      createdDepartments = await this.departmentRepository.save(departments);
    }
    
    const employeesCount = await this.employeeRepository.count();
    if (employeesCount === 0) {
      const employees = [
        { firstName: 'Test1', lastName: 'Ltest1', department_id: createdDepartments[0].id, hireDate: new Date().toISOString(), phone: '123456789', address: 'street 1', active: true },
        { firstName: 'Test2', lastName: 'Ltest3', department_id: createdDepartments[1].id, hireDate: new Date().toISOString(), phone: '123456789', address: 'street 2', active: true },
        { firstName: 'Test3', lastName: 'Ltest2', department_id: createdDepartments[2].id, hireDate: new Date().toISOString(), phone: '123456789', address: 'street 2', active: true },
        { firstName: 'Test4', lastName: 'Ltest4', department_id: createdDepartments[1].id, hireDate: new Date().toISOString(), phone: '123456789', address: 'street 2', active: true }
      ];
     
      employees.forEach(employee => this.employeeService.create(employee));
    }
  }
}