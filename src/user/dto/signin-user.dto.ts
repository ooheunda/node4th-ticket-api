import { OmitType } from "@nestjs/mapped-types";
import { SignUpUserDto } from "./signup-user.dto";

export class SignInUserDto extends OmitType(SignUpUserDto, ["name"]) {}
