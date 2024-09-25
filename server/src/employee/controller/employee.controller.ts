import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    NotFoundException,
    Param,
    Patch,
    Post,
    Put,
} from '@nestjs/common';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { Employee } from '../entity/employee.entity';
import { EmployeeService } from '../employee.service';
import { EmployeeUpdateDto } from '../dto/employee-update.dto';
import { EmployeeUpdatePartialDto } from '../dto/employee-update-partial.dto';

@Controller('employee')
export class EmployeeController {

    constructor(private readonly employeeService: EmployeeService) {}

    @Get()
    getAll(): Promise<Employee[]> {
        return this.employeeService.getAll();
    }  
    
    @Post()
    create(@Body() employeeToCreate: CreateEmployeeDto) {
        return this.employeeService.create(employeeToCreate);
    }

    @Put(':id')
    @HttpCode(204)
    async update(
        @Param('id') id: number,
        @Body() dataToUpdate: EmployeeUpdateDto
    ) {
        return this.updateHelper(id, dataToUpdate)
    }

    @Patch(':id')
    @HttpCode(204)
    async partialUptadate(
        @Param('id') id: number,
        @Body() dataToUpdate: EmployeeUpdatePartialDto
    ) {
        return this.updateHelper(id, dataToUpdate)
    }

    async updateHelper(id: number, dataToUpdate: EmployeeUpdateDto) {
        const updateResult = await this.employeeService.update(id, dataToUpdate);

        if (updateResult.affected === 0) {
            throw new NotFoundException(`Employee with ID ${id} not found!`);
        }

        return { statusCode: HttpStatus.NO_CONTENT };
    }

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id: number) {
        const deleteResult = await this.employeeService.delete(id);
        if (deleteResult.affected !== 1) {
            throw new Error('it was not possible to remove the employee with id ' + id);
        }
        return { statusCode: HttpStatus.NO_CONTENT };
    }
}