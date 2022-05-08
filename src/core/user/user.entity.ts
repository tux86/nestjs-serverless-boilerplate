import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IsBoolean, IsEmail, IsNotEmpty } from 'class-validator';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  @Column({ nullable: false })
  public email: string;

  @Field()
  @IsBoolean()
  @Column({ nullable: false })
  public isEmailVerified: boolean;

  @Field()
  @IsNotEmpty()
  @Column({ nullable: false, length: 48 })
  givenName: string;

  @Field()
  @IsNotEmpty()
  @Column({ nullable: false, length: 48 })
  familyName: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
