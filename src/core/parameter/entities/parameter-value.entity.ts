import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  RelationId,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Parameter } from './parameter.entity';
import { Organization } from '../../organization/organization.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
@Unique(['organization', 'parameter'])
export class ParameterValue {
  @Field(() => ID)
  @PrimaryColumn('uuid')
  parameterValueId: string;

  @Index()
  @ManyToOne(() => Organization, { nullable: false })
  @JoinColumn({ name: 'orgId' })
  organization: Organization;

  @Field()
  @RelationId((parameterValue: ParameterValue) => parameterValue.organization)
  orgId: string;

  @Field()
  @ManyToOne(() => Parameter, { nullable: false })
  @JoinColumn({ name: 'parameter_id' })
  parameter: Parameter;

  @Field()
  @Column('text', { nullable: true })
  value: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
