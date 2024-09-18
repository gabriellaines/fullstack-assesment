import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class EmployeeUpdateDto {

    @IsNotEmpty()
    @IsString()
    firstName?: string;

    @IsNotEmpty()
    @IsString()
    lastName?: string;

    @IsNotEmpty()
    @IsDateString()
    hireDate?: string;

    @IsNotEmpty()
    @IsString()
    phone?: string;

    @IsNotEmpty()
    @IsString()
    address?: string;

    @IsNotEmpty()
    @IsNumber()
    departmentId?: number; 
}