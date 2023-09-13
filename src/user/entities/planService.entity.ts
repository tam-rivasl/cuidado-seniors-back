import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Appointment } from './appointment.entity';
export enum status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
@Entity()
export class PlanService {
  @PrimaryGeneratedColumn()
  planServiceId: number;
  @Column({ name: 'planServiceName', nullable: false })
  planServiceName: string;
  @Column({ name: 'price', nullable: false })
  price: number;
  @Column({ name: 'description', nullable: false })
  description: string;
  @Column({ name: 'startTime', type: 'timestamptz', nullable: false })
  startTime: Date;
  @Column({ name: 'endTime', type: 'timestamptz', nullable: false })
  endTime: Date;

  @Column({
    name: 'status',
    nullable: false,
    type: 'enum',
    enum: status,
  })
  status: string;
  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @OneToMany(() => Appointment, (appointment) => appointment.planService)
  appointment: Appointment;
}
