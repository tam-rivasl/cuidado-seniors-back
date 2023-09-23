import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
export enum status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
export enum rolType {
  NURSE = 'nurse',
  user = 'user',
  SECRETARY = 'secretary',
}
@Entity()
export class Rol {
  @PrimaryGeneratedColumn()
  rolId: number;

  @Column({
    name: 'status',
    nullable: false,
    type: 'enum',
    enum: status,
  })
  status: string;
  @Column({
    name: 'rolName',
    nullable: false,
    type: 'enum',
    enum: rolType,
  })
  rolName: string;
  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  //REVISAR JOIN DE USER Y ROL 
  @OneToMany(() => User, (rolUserId) => rolUserId.rolUserId)
  rolUserId: User;
}
