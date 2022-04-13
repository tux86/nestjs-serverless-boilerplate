import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class EmailTemplate {
  @PrimaryGeneratedColumn('uuid')
  emailId: string;

  @Column({ length: 50 })
  name: string;

  @Column('varchar', { length: 255 })
  subject: string;

  @Column('text')
  body: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
