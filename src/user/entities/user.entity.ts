import { IsBoolean, IsEmail, IsString } from "class-validator";
import { Point } from "src/point/entities/point.entity";
import { Reservation } from "src/reservation/entities/reservation.entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
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

  @OneToMany(() => Point, (point) => point.user)
  point: Point;

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservation: Reservation;
}
