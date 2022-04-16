import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { EmailTemplateName } from '../enum/email-template-name.enum';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Organization } from '../../organization/entities/organization.entity';

@ObjectType()
@Entity()
@Index('unique_email_template_name', ['organization', 'name'], {
  unique: true,
  where: '"deleted_at" IS NULL',
})
export class EmailTemplate {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  emailTemplateId: string;

  @Index()
  @ManyToOne(() => Organization, { nullable: true })
  @JoinColumn({ name: 'orgId' })
  organization: Organization;

  @RelationId((emailTemplate: EmailTemplate) => emailTemplate.organization)
  orgId: string;

  @Field()
  @Column({ length: 50 })
  name: string | EmailTemplateName;

  @Field({ description: 'email subject' })
  @Column('varchar', { length: 255 })
  subject: string;

  @Field({ description: 'plain text content' })
  @Column('text')
  bodyText: string;

  @Field({ description: 'html content' })
  @Column('text')
  bodyHtml: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
