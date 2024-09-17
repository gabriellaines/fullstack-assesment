import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query
} from '@nestjs/common';
import { DepartmentService } from '../department.service'
import { Department } from '../entity/department.entity';

@Controller('department')
export class DepartmentController {

    constructor(private readonly departmentService: DepartmentService) {}

    @Get('/')
    all(): Promise<Department[]> {
        return this.departmentService.findAll();
    }   

}