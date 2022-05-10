import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ParameterValueType } from '../enums/parameter-value-type.enum';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';

@ObjectType()
@Entity()
export class Parameter {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  parameterId: string;

  @Field()
  @Column({ nullable: false, length: 128, unique: true })
  name: string;

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  description: string;

  @Field(() => ParameterValueType)
  @IsEnum(ParameterValueType)
  @Column({ nullable: false })
  valueType: ParameterValueType;

  @Field()
  @Column('boolean', { nullable: false })
  shared: boolean; // if true : the parameter is shared across all organizations

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
