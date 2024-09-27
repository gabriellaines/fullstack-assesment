import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Department } from './department.entity';

@Entity()
export class DepartmentHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    employeeId: number;

    @ManyToOne(() => Department)
    @JoinColumn({ name: 'department_id' })
    department: Department;
  
    @Column({ type: 'date' })
    startDate: string;

    @Column({ type: 'date', nullable: true })
    endDate: string;
}
