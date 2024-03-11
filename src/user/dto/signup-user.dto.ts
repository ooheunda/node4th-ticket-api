import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignUpUserDto {
  @IsEmail()
  @IsNotEmpty({ message: "이메일은 필수입니다." })
  email: string;

  @IsString()
  @IsNotEmpty({ message: "비밀번호는 필수입니다." })
  password: string;

  @IsString()
  @IsNotEmpty({ message: "이름은 필수입니다." })
  name: string;
}
