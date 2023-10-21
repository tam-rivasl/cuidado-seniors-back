import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Appointment } from '../../appointment/entities/appointment.entity';
export enum status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
@Entity()
export class PlanService {
  @PrimaryGeneratedColumn()
  plan_serviceId: number;
  @Column({ name: 'planServiceName', nullable: false })
  planServiceName: string;
  @Column({ name: 'price', nullable: false })
  price: number;
  @Column({ name: 'description', nullable: false })
  description: string;
  @Column({ name: 'startTime', type: 'time', nullable: false })
  startTime: string;
  @Column({ name: 'endTime', type: 'time', nullable: false })
  endTime: string;
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
  //buscar un mejor alias
  @OneToMany(() => Appointment, (appointment) => appointment.plan_service)
  appointment: Appointment;
}
