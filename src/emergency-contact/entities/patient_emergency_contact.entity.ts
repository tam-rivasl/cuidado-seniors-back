import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { EmergencyContact } from './nested/emergency_contact.entity';
@Entity()
export class PatientEmergencyContact {
  @PrimaryGeneratedColumn()
  patientContactId: number;
  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @ManyToOne(
    () => EmergencyContact,
    (emergency_contactId) => emergency_contactId.user,
  )
  @JoinColumn({ name: 'emergency_contactId' })
  emergency_contact: EmergencyContact;

  @ManyToOne(() => User, (patient) => patient.emergency_contactId)
  @JoinColumn({ name: 'patientId' })
  patientId: User;
}
