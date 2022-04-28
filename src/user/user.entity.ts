import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IsBoolean, IsEmail, IsNotEmpty } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({ nullable: false })
  public email: string;

  @IsBoolean()
  @Column({ nullable: false })
  public isEmailVerified: boolean;

  @IsNotEmpty()
  @Column({ nullable: false, length: 48 })
  givenName: string;

  @IsNotEmpty()
  @Column({ nullable: false, length: 48 })
  familyName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
