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
  @Column({ name: 'name', nullable: false })
  rolName: string;
  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @OneToMany(() => User, (user) => user.rol)
  user: User;
}
