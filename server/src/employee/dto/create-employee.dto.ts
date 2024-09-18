import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateEmployeeDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsDateString()
    hireDate: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    @IsNumber()
    departmentId: number;
}