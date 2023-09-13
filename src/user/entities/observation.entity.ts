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
export enum status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
export enum observationType {
  SHEDULE_RUTINE = 'schedule_rutine',
  RECOMENDATIONS = 'recomendations',
  MEDICAL = 'medical',
}
@Entity()
export class Observation {
  @PrimaryGeneratedColumn()
  observationId: number;
  @Column({ name: 'title', nullable: false })
  title: string;
  @Column({ name: 'description', nullable: false })
  description: string;
  @Column({
    name: 'status',
    nullable: false,
    type: 'enum',
    enum: status,
  })
  status: string;
  @Column({
    name: 'observationType',
    nullable: false,
    type: 'enum',
    enum: observationType,
  })
  observtionType: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @ManyToOne(() => User, (user) => user.observation)
  user: User;
}
