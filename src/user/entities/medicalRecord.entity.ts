import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
export enum status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity()
export class MedicalRecord {
  @PrimaryGeneratedColumn()
  medicalRecordId: number;
  @Column({ name: 'name', nullable: false })
  fileName: string;
  @Column({
    name: 'status',
    nullable: false,
    type: 'enum',
    enum: status,
  })
  status: string;
  //almacena el archivo
  @Column({ type: 'bytea', nullable: false })
  file: Buffer;
  //tipo de archivo, ej: png, pdf etc.
  @Column({ type: 'varchar', length: 100, nullable: false })
  mimetype: string;
  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
  @OneToOne(() => User, (user) => user.medicalRecord)
  user: User;
}
