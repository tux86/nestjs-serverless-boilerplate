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

@Entity()
@Unique(['organization', 'parameter'])
export class ParameterValue {
  @PrimaryColumn('uuid')
  parameterValueId: string;

  @Index()
  @ManyToOne(() => Organization, { nullable: false })
  @JoinColumn({ name: 'orgId' })
  organization: Organization;

  @RelationId((parameterValue: ParameterValue) => parameterValue.organization)
  orgId: string;

  @ManyToOne(() => Parameter, { nullable: false })
  @JoinColumn({ name: 'parameter_id' })
  parameter: Parameter;

  @Column('text', { nullable: true })
  value: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
