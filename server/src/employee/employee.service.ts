import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Employee } from './entity/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeUpdateDto } from './dto/employee-update.dto';
import { EmployeeUpdatePartialDto } from './dto/employee-update-partial.dto';

@Injectable()
export class EmployeeService {

    constructor(
        @InjectRepository(Employee)
        private employeeRepository: Repository<Employee>,
    ) {}
    
    update(id: number, dataToUpdate: EmployeeUpdateDto | EmployeeUpdatePartialDto): Promise<UpdateResult> {
        return this.employeeRepository.update({ id }, dataToUpdate);
    }

    getAll(): Promise<Employee[]> {
        return this.employeeRepository.find();
    }

    create(employeeToCreate: CreateEmployeeDto): Promise<Employee> {
        return this.employeeRepository.save(employeeToCreate);
    }

    getById(employeeId: number): Promise<Employee> {
        return this.employeeRepository.findOneBy({ id: employeeId});
    }

}