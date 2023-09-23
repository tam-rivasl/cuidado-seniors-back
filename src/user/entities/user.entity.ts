import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Appointment } from '../../appointment/entities/appointment.entity';
import { Rol } from './rol.entity';
import { Observation } from '../../observation/entities/observation.entity';
import { MedicalRecord } from '../../medical-record/entities/medicalRecord.entity';
import { PatientEmergencyContact } from 'src/emergency-contact/entities/patient_emergency_contact.entity';
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
  @Column({ name: 'identificationNumber', nullable: true })
  identificationNumber: string;
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

  //REVISAR JOIN DE USER Y ROL
  @JoinTable()
  @ManyToOne(() => Rol, (rolUserId) => rolUserId.rolId)
  rolUserId: Rol;

  @ManyToOne(() => Appointment, (appointment) => appointment.userId)
  userId_appointment: Appointment;

  @ManyToOne(() => Appointment, (appointment) => appointment.nurseId)
  nurseId_appointment: Appointment;

  @OneToMany(() => Observation, (observation) => observation.user)
  observation: Observation;

  @OneToOne(() => MedicalRecord, (medicalRecord) => medicalRecord.patient)
  medicalRecord: MedicalRecord;

  @OneToOne(() => MedicalRecord, (medicalRecord) => medicalRecord.nurse, {
    nullable: true,
  })
  nurseId_medicalRecord: MedicalRecord;

  @OneToMany(
    () => PatientEmergencyContact,
    (emergency_contact) => emergency_contact.patient,
    { nullable: true },
  )
  emergency_contact: PatientEmergencyContact;
}
