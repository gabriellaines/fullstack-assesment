import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DepartmentHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    employeeId: number;

    @Column()
    departmentId: number;

    @Column({ type: 'date' })
    startDate: string;

    @Column({ type: 'date', nullable: true })
    endDate: string;
}