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

@Entity()
export class MedicalRecord {
  @PrimaryGeneratedColumn()
  medical_recordId: number;
  @Column({ name: 'alergias', nullable: false })
  alergias: string;
  @Column({ name: 'medicamentos', nullable: false })
  medicamentos: string;
  @Column({ name: 'dosisMedicamentos', nullable: false })
  dosisMedicamentos: string;
  @Column({ name: 'tipoEnfermedad', nullable: false })
  tipoEnfermedad: string;
  @Column({ name: 'descripcionPatologia', nullable: false })
  descripcionPatologia: string;
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
