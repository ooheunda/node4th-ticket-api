import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePointDto {
  @IsNumber()
  @IsNotEmpty({ message: "금액은 필수입니다." })
  amount: number;

  @IsString()
  @IsNotEmpty({ message: "이유는 필수입니다." })
  reason: string;

  @IsNumber()
  @IsOptional()
  reservation_id?: number;
}
