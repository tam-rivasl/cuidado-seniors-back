import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PatientEmergencyContact } from '../patient_emergency_contact.entity';
export enum status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
@Entity()
export class EmergencyContact {
  @PrimaryGeneratedColumn()
  emergency_contactId: number;
  @Column({ name: 'firstName', nullable: false })
  firstName: string;
  @Column({ name: 'lastName', nullable: false })
  lastName: string;
  @Column({ name: 'email', nullable: false })
  email: string;
  @Column({ name: 'phoneNumber', nullable: false })
  phoneNumber: string;
  @Column({ name: 'relationship', nullable: false })
  relationship: string;
  @Column({
    name: 'status',
    nullable: false,
    type: 'enum',
    enum: status,
  })
  status: string;
  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @OneToMany(() => PatientEmergencyContact, (user) => user.emergency_contact)
  user: PatientEmergencyContact;
}
