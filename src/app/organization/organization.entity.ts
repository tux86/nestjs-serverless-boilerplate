import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import {
  IsAlphanumeric,
  IsNotEmpty,
  IsUppercase,
  MaxLength,
  MinLength,
} from 'class-validator';

@Entity()
export class Organization {
  @IsAlphanumeric()
  @IsUppercase()
  @MinLength(4)
  @MaxLength(10)
  @PrimaryColumn({ type: 'varchar', length: 10 })
  orgId: string;

  @IsNotEmpty()
  @Column({ nullable: false, length: 128 })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
