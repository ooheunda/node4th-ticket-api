import { IsBoolean, IsEmail, IsString } from "class-validator";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "Users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsEmail()
  @Column("varchar", { unique: true, nullable: false })
  email: string;

  @IsString()
  @Column("varchar", { select: false, nullable: false })
  password: string;

  @IsString()
  @Column("varchar", { nullable: false })
  name: string;

  @IsBoolean()
  @Column("boolean", { default: false })
  is_admin: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
