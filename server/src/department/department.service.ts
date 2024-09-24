import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Department } from './entity/department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Injectable()
export class DepartmentService {
    constructor(
        @InjectRepository(Department)
        private departmentRepository: Repository<Department>,
    ) {}

    getAll(): Promise<Department[]> {
        return this.departmentRepository.find();
    }

    create(departmentToCreate: CreateDepartmentDto): Promise<Department> {
        return this.departmentRepository.save(departmentToCreate);
    }

    delete(id: number): Promise<DeleteResult> {
        return this.departmentRepository.delete(id);
    }

}