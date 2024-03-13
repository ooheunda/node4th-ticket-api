import { IsDate, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Category } from "../types/category.type";

export class CreatePerformanceDto {
  @IsString()
  @IsNotEmpty({ message: "이름은 필수입니다." })
  name: string;

  @IsString()
  @IsNotEmpty({ message: "설명은 필수입니다." })
  description: string;

  @IsDate()
  @IsNotEmpty({ message: "날짜는 필수입니다." })
  datetime: Date[];

  @IsString()
  @IsNotEmpty({ message: "장소는 필수입니다." })
  place: string;

  @IsString()
  @IsNotEmpty({ message: "사진은 필수입니다." })
  image: string;

  @IsEnum(Category)
  @IsNotEmpty({ message: "카테고리는 필수입니다." })
  category: Category;
}
