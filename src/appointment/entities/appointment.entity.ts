import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { PlanService } from '../../plan-service/entities/planService.entity';
import { PaymentHistory } from '../../payment-history/entities/paymentHistory.entity';
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

  @JoinTable()
  @OneToMany(() => User, (userId) => userId.userId_appointment)
  userId: User;

  @JoinTable()
  @OneToMany(() => User, (nurseId) => nurseId.nurseId_appointment, {
    nullable: true,
  })
  nurseId: User;

  @JoinTable()
  @ManyToOne(() => PlanService, (plan_service) => plan_service.appointment)
  plan_service: PlanService;

  @ManyToOne(
    () => PaymentHistory,
    (payment_history) => payment_history.appointment,
  )
  payment_history: PaymentHistory;
}
