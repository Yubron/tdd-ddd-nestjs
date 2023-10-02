import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInResDto, SignUpResDto } from './dtos/user.res.dto';
import { SignInReqDto, SignUpReqDto } from './dtos/user.req.dto';
import { UserRepository } from './repositories/user.repository';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async signUp(signUpReqDto: SignUpReqDto): Promise<SignUpResDto> {
    const user = await User.of(signUpReqDto);
    await this.userRepository.save(user);

    const payload = { id: user.id };
    const accessToken = await this.jwtService.signAsync(payload);
    const result = SignUpResDto.of(accessToken);

    return result;
  }

  public async signIn(signInReqDto: SignInReqDto): Promise<SignInResDto> {
    const { email, password } = signInReqDto;

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const isMatchPassword = await user.comparePassword(password);
    if (!isMatchPassword) {
      throw new UnauthorizedException('password not match');
    }

    const payload = { id: user.id };
    const accessToken = await this.jwtService.signAsync(payload);
    const result = SignInResDto.of(accessToken);

    return result;
  }
}
