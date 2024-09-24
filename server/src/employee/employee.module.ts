import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Employee } from "./entity/employee.entity";
import { EmployeeController } from "./controller/employee.controller";
import { EmployeeService } from "./employee.service";
import { DepartmentModule } from "src/department/department.module";

@Module({
    imports: [TypeOrmModule.forFeature([Employee]), DepartmentModule],
    exports: [TypeOrmModule],
    controllers: [EmployeeController],
    providers: [EmployeeService]
})
export class EmployeeModule {}