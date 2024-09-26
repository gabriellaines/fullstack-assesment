import { Module } from "@nestjs/common";
import { Department } from "./entity/department.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DepartmentController } from "./controller/department.controller";
import { DepartmentService } from "./department.service";
import { DepartmentHistory } from "./entity/department-history.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Department, DepartmentHistory])],
    exports: [TypeOrmModule],
    controllers: [DepartmentController],
    providers: [DepartmentService]
})
export class DepartmentModule {}