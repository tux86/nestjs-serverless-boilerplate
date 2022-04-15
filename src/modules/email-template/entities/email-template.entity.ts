import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EmailTemplateName } from '../enum/email-template-name.enum';

@Entity()
export class EmailTemplate {
  @PrimaryGeneratedColumn('uuid')
  emailTemplateId: string;

  @Column({ length: 50 })
  name: string | EmailTemplateName;

  @Column('varchar', { length: 255 })
  subject: string;

  @Column('text')
  bodyText: string;

  @Column('text')
  bodyHtml: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
