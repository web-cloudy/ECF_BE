import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Role, IsActive } from '../../enums/role.enum';
@Entity()
export class Staff {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;
  
  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  company: string;

  @Column({ nullable: false })
  group: string;

  @Column({ type: 'enum', enum: Role, default: Role.DEVELOPER })
  role: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  business_phone: string;

  @Column({ nullable: false })
  cell_phone: string;

  @Column({ type: 'enum', enum: Role, default: Role.MANAGER })
  account_right: string;

  @Column({ type: 'enum', enum: IsActive , default: IsActive.NO })
  is_active: string;

  @Column({ nullable: true }) 
  remark: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
