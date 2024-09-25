import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Employee } from './entity/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeUpdateDto } from './dto/employee-update.dto';
import { EmployeeUpdatePartialDto } from './dto/employee-update-partial.dto';
import { Department } from 'src/department/entity/department.entity';

@Injectable()
export class EmployeeService {

    constructor(
        @InjectRepository(Employee)
        private employeeRepository: Repository<Employee>,
        @InjectRepository(Department)
        private departmentRepository: Repository<Department>
    ) {}
    
    update(id: number, dataToUpdate: EmployeeUpdateDto | EmployeeUpdatePartialDto): Promise<UpdateResult> {
        return this.employeeRepository.update({ id }, dataToUpdate);
    }

    getAll(): Promise<Employee[]> {
        return this.employeeRepository.find({
            relations: ['department']
        });
    }

    async create(employeeToCreate: CreateEmployeeDto): Promise<Employee> {
        const department = await this.departmentRepository.findOne({
            where: { id: employeeToCreate.department_id },
        });

        if (!department) {
            throw new NotFoundException(`Department with id ${employeeToCreate.department_id} not found!`);
        }

        const employee = this.employeeRepository.create({
            ...employeeToCreate,
            department
        });

        return this.employeeRepository.save(employee);
    }

    getById(employeeId: number): Promise<Employee> {
        return this.employeeRepository.findOne({
            where: { id: employeeId },
            relations: ['department']
        });
    }

    delete(employeeId: number): Promise<DeleteResult> {
        return this.employeeRepository.delete(employeeId);
    }

}