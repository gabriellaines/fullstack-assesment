import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Department } from './entity/department.entity';

@Injectable()
export class DepartmentService {
    constructor(
        @InjectRepository(Department)
        private departmentRepository: Repository<Department>,
    ) {}

    findAll(): Promise<Department[]> {
        return this.departmentRepository.find();
    }

}