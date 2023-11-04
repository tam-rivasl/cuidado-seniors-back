import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
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

  @Column({ name: 'nurseId', nullable: false})
  nurseId: number;

  @Column({ name: 'patientId', nullable: true})
  patientId: number;
  
  @Column({ name: 'plan_serviceId', nullable: false})
  plan_serviceId: number;

  @ManyToOne(() => User, (patient) => patient.patient_appointment, {
    nullable: true,
  })
  @JoinColumn({ name: 'patientId'})
  patient: User;

  @ManyToOne(() => User, (nurse) => nurse.nurse_appointment)
  @JoinColumn({ name: 'nurseId' })
  nurse: User;

  @ManyToOne(() => PlanService, (plan_service) => plan_service.appointment)
  @JoinColumn({ name: 'plan_serviceId' })
  plan_service: PlanService;

  @OneToMany(
    () => PaymentHistory,
    (payment_history) => payment_history.appointment,
  )
  payment_history: PaymentHistory;
}
