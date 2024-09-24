import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
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

    @Delete(':id')
    @HttpCode(204)
    async deleteDepartment(@Param() id: number) {
        const result = await this.departmentService.delete(id);
        if (result.affected !== 1) {
            throw new Error('it was not possible to remove the department with id ' + id);
        }
        return { statusCode: HttpStatus.NO_CONTENT };
    }
}