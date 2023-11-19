// webpay-transaction.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('webpay_transactions')
export class WebPayTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  buyOrder: string;

  @Column()
  sessionId: string;

  @Column()
  amount: number;

  @Column()
  responseCode: string;

  @Column({ nullable: true })
  authorizationCode: string;

  @Column({ nullable: true })
  paymentType: string;

  @Column({ nullable: true })
  cardNumber: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Otros campos y decoradores según tus necesidades
}
