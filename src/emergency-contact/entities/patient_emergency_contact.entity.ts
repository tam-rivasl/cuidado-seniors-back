import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
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

  @JoinTable()
  @ManyToOne(
    () => EmergencyContact,
    (emergency_contact) => emergency_contact.user,
  )
  emergency_contact: EmergencyContact;

  @JoinTable()
  @ManyToOne(() => User, (patient) => patient.emergency_contact)
  patient: User;
}
