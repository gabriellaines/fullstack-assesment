import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Employee } from './entity/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeUpdateDto } from './dto/employee-update.dto';
import { EmployeeUpdatePartialDto } from './dto/employee-update-partial.dto';
import { Department } from 'src/department/entity/department.entity';
import { DepartmentHistory } from 'src/department/entity/department-history.entity';

@Injectable()
export class EmployeeService {

    constructor(
        @InjectRepository(Employee)
        private employeeRepository: Repository<Employee>,
        @InjectRepository(Department)
        private departmentRepository: Repository<Department>,
        @InjectRepository(DepartmentHistory)
        private departmentHistoryRepository: Repository<DepartmentHistory>
    ) {}
    
    async update(id: number, dataToUpdate: EmployeeUpdateDto | EmployeeUpdatePartialDto): Promise<UpdateResult> {
        let employeeToUpdate: Partial<Employee> = { ...dataToUpdate } as Employee;

        const employee = await this.employeeRepository.findOne({
            where: { id },
            relations: ['department']  
        });

        if (!employee) {
            throw new NotFoundException(`Employee with id ${id} not found!`);
        }

        // Check if the departmentId is part of the data to update
        if ('departmentId' in dataToUpdate) {
            const { departmentId, ...rest } = dataToUpdate;
            const newDepartment = await this.departmentRepository.findOne({
                where: { id: departmentId }
            });

            if (!newDepartment) throw new NotFoundException(`Department with id ${departmentId} was not found!`);

            if (employee.department && employee.department.id !== departmentId) {
                await this.departmentHistoryRepository.save({
                    employeeId: employee.id,
                    departmentId: newDepartment.id,
                    startDate: new Date().toISOString().slice(0, 10)
                });
                employeeToUpdate = { ...rest, department: newDepartment}
            } else {
                // in case the department wont need to be updated
                employeeToUpdate = { ...rest };
            }
        }

        // update the employee
        return this.employeeRepository.update({ id }, employeeToUpdate);
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

        const employee = await this.employeeRepository.create({
            ...employeeToCreate,
            department
        });
        
        await this.departmentHistoryRepository.create({
            employeeId: employee.id,
            departmentId: department.id,
            startDate: new Date().toISOString().slice(0, 10)
        });

        return this.employeeRepository.save(employee);
    }

    async getById(employeeId: number) {
        const employee = await this.employeeRepository.findOne({
            where: { id: employeeId },
            relations: ['department']
        });

        const departmentHistory = await this.departmentHistoryRepository.find({
            where: { employeeId: employee.id }
        });

        if (!employee) {
            throw new NotFoundException(`Employee with id ${employeeId} not found!`);
        }

        return { ...employee, departmentHistory }; 
    }

    async delete(employeeId: number): Promise<DeleteResult> {
        const resultOfDelete = await this.employeeRepository.delete(employeeId);
        
        if (!(resultOfDelete.affected !== 0)) throw new NotFoundException(`Employee with id ${employeeId} not found!`);

        return resultOfDelete;
    }

    async updateHelper(id: number, dataToUpdate: EmployeeUpdateDto) {
        const updateResult = await this.update(id, dataToUpdate);

        if (updateResult.affected === 0) {
            throw new NotFoundException(`Employee with ID ${id} was not updated, check if the employee exists!`);
        }

        return { statusCode: HttpStatus.NO_CONTENT };
    }

}
