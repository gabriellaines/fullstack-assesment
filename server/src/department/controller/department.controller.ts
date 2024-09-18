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
import { CreateDepartmentDto } from '../dto/create-department.dto';

@Controller('department')
export class DepartmentController {

    constructor(private readonly departmentService: DepartmentService) {}

    @Get('/')
    getAllDepartments(): Promise<Department[]> {
        return this.departmentService.getAll();
    }  
    
    @Post('/')
    createDepartment(@Body() departmentToCreate: CreateDepartmentDto) {
        return this.departmentService.create(departmentToCreate);
    }

}