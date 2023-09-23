import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PaymentHistory } from 'src/payment-history/entities/paymentHistory.entity';
@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  paymentId: number;
  @Column({ name: 'transaccionId', nullable: false })
  transaccionId: string;
  @Column({ name: 'number', nullable: false })
  amount: number;
  @Column({ name: 'status', nullable: false })
  status: string;
  @Column({ name: 'buildOrder', nullable: false })
  buildOrder: string;
  @Column({ name: 'transaccionDate', type: 'timestamp', nullable: false })
  transaccionDate: Date;
  @Column({ name: 'seccionId', nullable: false })
  seccionId: string;
  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @OneToOne(() => PaymentHistory, (payment) => payment.history)
  payment: PaymentHistory;
}
