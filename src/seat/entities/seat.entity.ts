import { IsNumber, IsString } from "class-validator";
import { Performance } from "src/performance/entities/performance.entity";
import { Reservation } from "src/reservation/entities/reservation.entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "Seats" })
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNumber()
  @Column("bigint", { nullable: false })
  performance_id: number;

  @IsNumber()
  @Column("bigint", { nullable: true })
  reservation_id: number;

  @IsNumber()
  @Column("int", { nullable: false })
  floor: number;

  @IsString()
  @Column("varchar", { nullable: false })
  area: string;

  @IsNumber()
  @Column("int", { nullable: false })
  seat: number;

  @IsNumber()
  @Column("int", { nullable: false })
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => Performance, (performance) => performance.seat, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "performance_id" })
  performance: Performance;

  @ManyToOne(() => Reservation, (reservation) => reservation.seat)
  @JoinColumn({ name: "reservation_id" })
  reservation: Reservation;
}
