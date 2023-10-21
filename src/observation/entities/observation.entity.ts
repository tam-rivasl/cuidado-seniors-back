import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
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
  observationType: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @ManyToOne(() => User, (patient) => patient.patient_observation)
  @JoinColumn({ name: 'patientId' })
  patient: User;
  @ManyToOne(() => User, (nurse) => nurse.nurse_observation)
  @JoinColumn({ name: 'nurseId' })
  nurse: User;
}
