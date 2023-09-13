import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Appointment } from './appointment.entity';
import { Rol } from './rol.entity';
import { Observation } from './observation.entity';
import { MedicalRecord } from './medicalRecord.entity';
export enum userGender {
  MALE = 'male',
  FEMALE = 'female',
}
export enum userStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
@Entity()
@Unique(['email'])
@Unique(['identificationNumber'])
export class User {
  @PrimaryGeneratedColumn()
  userId: number;
  @Column({ name: 'firstName', nullable: false })
  firstName: string;
  @Column({ name: 'lastName', nullable: false })
  lastName: string;
  @Column({ name: 'email', nullable: false })
  email: string;
  @Column({ name: 'phoneNumber', nullable: false })
  phoneNumber: string;
  @Column({ name: 'birthDate', type: 'timestamptz', nullable: false })
  birthDate: Date;
  @Column({ name: 'age', nullable: false })
  age: number;

  @Column({ name: 'password', nullable: false })
  password: string;
  @Column({
    name: 'gender',
    nullable: false,
    type: 'enum',
    enum: userGender,
  })
  gender: string;
  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
  @Column({
    name: 'status',
    nullable: false,
    type: 'enum',
    enum: userStatus,
  })
  status: string;

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointment: Appointment;

  @ManyToOne(() => Rol, (rol) => rol.user)
  rol: Rol;
  @OneToMany(() => Observation, (observation) => observation.user)
  observation: Observation;
  @OneToOne(() => MedicalRecord, (medicalRecord) => medicalRecord.user, {
    nullable: true,
  })
  medicalRecord: MedicalRecord;
}
