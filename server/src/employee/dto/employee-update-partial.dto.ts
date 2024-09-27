import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Validate } from "class-validator";

export class EmployeeUpdatePartialDto {

    @IsOptional()
    @IsString()
    firstName?: string;

    @IsOptional()
    @IsString()
    lastName?: string;

    @IsOptional()
    @IsDateString()
    hireDate?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsNotEmpty()
    address?: string;

    @IsOptional()
    @IsNumber()
    departmentId?: number;
    
    @IsOptional()
    @IsBoolean()
    active?: boolean;
}