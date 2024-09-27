import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Employee } from "./entity/employee.entity";
import { EmployeeController } from "./controller/employee.controller";
import { EmployeeService } from "./employee.service";
import { DepartmentModule } from "src/department/department.module";
import { DatabaseSeeder } from "src/database.seeder";

@Module({
    imports: [TypeOrmModule.forFeature([Employee]), DepartmentModule],
    exports: [TypeOrmModule, EmployeeService],
    controllers: [EmployeeController],
    providers: [EmployeeService, DatabaseSeeder]
})
export class EmployeeModule {}