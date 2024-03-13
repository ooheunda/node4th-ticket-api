import { IsDate, IsEnum, IsString } from "class-validator";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "../types/category.type";
import { Seat } from "src/seat/entities/seat.entity";

@Entity({ name: "Performances" })
export class Performance {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column("varchar", { nullable: false })
  name: string;

  @IsString()
  @Column("varchar", { nullable: false })
  description: string;

  @IsDate()
  @Column("date", { nullable: false })
  datetime: Date[];

  @IsString()
  @Column("varchar", { nullable: false })
  place: string;

  @IsString()
  @Column("varchar", { nullable: false })
  image: string;

  @IsEnum(Category)
  @Column("enum", { nullable: false })
  category: Category;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => Seat, (seat) => seat.performance)
  seat: Seat;
}
