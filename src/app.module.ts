import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { User } from "./user/entities/user.entity";
import joi from "joi";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { PointModule } from "./point/point.module";
import { Point } from "./point/entities/point.entity";
import { PerformanceModule } from './performance/performance.module';
import { SeatModule } from './seat/seat.module';
import { ReservationModule } from './reservation/reservation.module';

const typeOrmModuleOptions = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    namingStrategy: new SnakeNamingStrategy(),
    type: "mysql",
    username: configService.get("DB_USERNAME"),
    password: configService.get("DB_PASSWORD"),
    host: configService.get("DB_HOST"),
    port: configService.get("DB_PORT"),
    database: configService.get("DB_NAME"),
    entities: [User, Point],
    synchronize: configService.get("DB_SYNC"),
    logging: true,
  }),
  inject: [ConfigService],
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        JWT_SECRET_KEY: joi.string().required(),
        DB_USERNAME: joi.string().required(),
        DB_PASSWORD: joi.string().required(),
        DB_HOST: joi.string().required(),
        DB_PORT: joi.number().required(),
        DB_NAME: joi.string().required(),
        DB_SYNC: joi.boolean().required(),
      }),
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    AuthModule,
    UserModule,
    PointModule,
    PerformanceModule,
    SeatModule,
    ReservationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
