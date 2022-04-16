import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EmailTemplateName } from '../enum/email-template-name.enum';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class EmailTemplate {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  emailTemplateId: string;

  @Field()
  @Column({ length: 50 })
  name: string | EmailTemplateName;

  @Field()
  @Column('varchar', { length: 255 })
  subject: string;

  @Field()
  @Column('text')
  bodyText: string;

  @Field()
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
