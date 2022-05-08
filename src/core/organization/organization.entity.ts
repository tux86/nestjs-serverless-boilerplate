import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Organization {
  @Field()
  @PrimaryColumn({ type: 'varchar', length: 10 })
  orgId: string;

  @Field()
  @Column({ nullable: false, length: 128 })
  name: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
