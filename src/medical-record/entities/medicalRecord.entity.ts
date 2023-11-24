import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
export enum status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity()
export class MedicalRecord {
  @PrimaryGeneratedColumn()
  medical_recordId: number;
  @Column({ name: 'name', nullable: false })
  fileName: string;
  //almacena el archivo
  @Column({ type: 'bytea', nullable: false })
  file: Buffer;
  //tipo de archivo, ej: png, pdf etc.
  /*
 @Column({ type: 'varchar', length: 100, nullable: false })
  mimetype: string;*/
  @Column({ name: 'patientId', nullable: false })
  patientId: number;
  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @OneToOne(() => User, (patient) => patient.patient_medicalRecord)
  @JoinColumn({ name: 'patientId' })
  patient: User;
}
