import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Employee } from "./entity/employee.entity";
import { EmployeeController } from "./controller/employee.controller";
import { EmployeeService } from "./employee.service";

@Module({
    imports: [TypeOrmModule.forFeature([Employee])],
    exports: [TypeOrmModule],
    controllers: [EmployeeController],
    providers: [EmployeeService]
})
export class EmployeeModule {}