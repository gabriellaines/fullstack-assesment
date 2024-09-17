import { Module } from "@nestjs/common";
import { Department } from "./entity/department.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DepartmentController } from "./controller/department.controller";
import { DepartmentService } from "./department.service";

// TODO: implement controller and service
@Module({
    imports: [TypeOrmModule.forFeature([Department])],
    exports: [TypeOrmModule],
    controllers: [DepartmentController],
    providers: [DepartmentService]
})
export class DepartmentModule {}