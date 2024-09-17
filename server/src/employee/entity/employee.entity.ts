import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Department } from '../../department/entity/department.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'date' })
  hireDate: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @ManyToOne(() => Department, department => department.employees)
  department: Department;
}
