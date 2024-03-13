import { Point } from "./entities/point.entity";
import { CreatePointDto } from "./dto/create-point.dto";

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class PointService {
  constructor(
    @InjectRepository(Point)
    private readonly pointRepository: Repository<Point>,
  ) {}

  addPointHistory(user_id: number, createPointDto: CreatePointDto) {
    this.pointRepository.save({ user_id, ...createPointDto });
    return "완";
  }

  async getPointHistory(user_id: number) {
    return await this.pointRepository.findBy({ user_id });
  }

  async getCurrentPoint(user_id: number) {
    return await this.pointRepository.sum("amount", { user_id });
  }
}
