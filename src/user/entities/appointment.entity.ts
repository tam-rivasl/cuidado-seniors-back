import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { PlanService } from './planService.entity';
export enum status {
  CONFIMED = 'confirmed',
  CANCELLED = 'cancelled',
  FINISHED = 'finished',
  PENDING = 'pending',
  EXPIRED = 'expired',
}
@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  appointmentId: number;
  @Column({
    name: 'status',
    nullable: false,
    type: 'enum',
    enum: status,
  })
  status: string;
  @Column({ name: 'date', nullable: false, type: 'timestamptz' })
  date: Date;
  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @ManyToOne(() => User, (user) => user.appointment)
  user: User;
  @ManyToOne(() => PlanService, (planService) => planService.appointment)
  planService: PlanService;
}
