import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { SignUpUserDto } from "./dto/signup-user.dto";
import { SignInUserDto } from "./dto/signin-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { compare, hash } from "bcrypt";
import _ from "lodash";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signUpUserDto: SignUpUserDto) {
    const { email, password, name } = signUpUserDto;

    const existingUser = await this.findUserByEmail(email);

    if (existingUser)
      throw new ConflictException("이미 사용중인 이메일입니다.");

    const hashedPassword = await hash(password, 10);

    this.userRepository.save({ email, password: hashedPassword, name });

    return "회원가입 완료";
  }

  async signin(signInUserDto: SignInUserDto) {
    const { email, password } = signInUserDto;
    const user = await this.userRepository.findOne({
      where: { email, deletedAt: null },
      select: ["id", "email", "password", "is_admin"],
    });

    if (_.isNil(user))
      throw new NotFoundException("해당 이메일로 가입된 유저가 없습니다.");
    if (!compare(password, user.password))
      throw new UnauthorizedException("비밀번호가 올바르지 않습니다.");

    const accessToken = this.jwtService.sign({
      id: user.id,
      email: user.email,
    });

    return { user_id: user.id, accessToken };
  }

  async findAll(role: "admin" | "user") {
    const is_admin = role === "admin" ? "1" : "0";

    return await this.userRepository.find({ where: { is_admin } });
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }
}
