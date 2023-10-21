import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
export enum status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
@Entity()
@Unique(['rolId'])
@Unique(['rolName'])
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
  })
  rolName: string;
  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  //REVISAR JOIN DE USER Y ROL
  @OneToMany(() => User, (user) => user.rol)
  user: User;
}
