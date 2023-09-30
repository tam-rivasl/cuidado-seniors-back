import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Appointment } from '../../appointment/entities/appointment.entity';
import { Payment } from 'src/payment/entities/payment.entity';
@Entity()
export class PaymentHistory {
  @PrimaryGeneratedColumn()
  paymentHistoryId: number;
  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
  @ManyToOne(() => Appointment, (appointment) => appointment.payment_history, {
    nullable: true,
  })
  @JoinColumn({
    name: 'payment_historyId',
  })
  appointment: Appointment;
  @OneToOne(() => Payment, (history) => history.payment)
  @JoinColumn({ name: 'paymentId' })
  history: Payment;
}
