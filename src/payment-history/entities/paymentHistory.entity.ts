import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  OneToMany,
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
  @JoinTable()
  @OneToMany(() => Appointment, (appointment) => appointment.payment_history, {
    nullable: true,
  })
  appointment: Appointment;

  @JoinTable()
  @OneToOne(() => Payment, (history) => history.payment)
  history: Payment;
}
