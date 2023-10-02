import { Injectable } from '@nestjs/common';
import { SignUpResDto } from './dtos/user.res.dto';
import { SignUpReqDto } from './dtos/user.req.dto';
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
}
