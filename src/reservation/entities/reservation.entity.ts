import { IsEnum, IsNumber } from "class-validator";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Status } from "../types/status.type";
import { User } from "src/user/entities/user.entity";
import { Seat } from "src/seat/entities/seat.entity";
import { Point } from "src/point/entities/point.entity";

@Entity({ name: "Reservations" })
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNumber()
  @Column("bigint", { nullable: false })
  user_id: number;

  @IsNumber()
  @Column("int", { nullable: false })
  total_price: number;

  @IsEnum(Status)
  @Column("varchar", { nullable: false })
  status: Status;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => User, (user) => user.reservation)
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToMany(() => Seat, (seat) => seat.reservation)
  seat: Seat;

  @OneToOne(() => Point)
  point: Point;
}
