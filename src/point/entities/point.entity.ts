import { IsNumber, IsString } from "class-validator";
import { User } from "src/user/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "Points" })
export class Point {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNumber()
  @Column("bigint", { name: "user_id", nullable: false })
  user_id: number;

  @IsNumber()
  @Column("int", { nullable: false })
  amount: number;

  @IsString()
  @Column("varchar", { default: "공연 예매", nullable: false })
  reason: string;

  @IsNumber()
  @Column("bigint", { name: "reservation_id", nullable: true })
  reservation_id?: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.point, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  // nullable reservation_id relation
}
