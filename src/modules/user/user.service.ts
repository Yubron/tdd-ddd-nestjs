import { Injectable } from '@nestjs/common';
import { SignUpResDto } from './dtos/user.res.dto';
import { SignUpReqDto } from './dtos/user.req.dto';
import { UserRepository } from './repositories/user.repository';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async signUp(signUpReqDto: SignUpReqDto): Promise<SignUpResDto> {
    const user = await User.of(signUpReqDto);
    await this.userRepository.save(user);

    // TODO: access token 발급
    const result = SignUpResDto.of('testAccessToken');

    return result;
  }
}
