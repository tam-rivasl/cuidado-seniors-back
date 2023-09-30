import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EmergencyContact } from './nested/emergency_contact.entity';
import { User } from '../../user/entities/user.entity';
@Entity()
export class PatientEmergencyContact extends EmergencyContact {
  @PrimaryGeneratedColumn()
  patient_emergency_contactId: number;
  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @ManyToOne(
    () => EmergencyContact,
    (emergency_contact) => emergency_contact.user,
  )
  @JoinColumn({ name: 'emergency_contactId' })
  emergency_contact: EmergencyContact;

  @ManyToOne(() => User, (patient) => patient.emergency_contact)
  @JoinColumn({ name: 'patientId' })
  patientId: User;
}
