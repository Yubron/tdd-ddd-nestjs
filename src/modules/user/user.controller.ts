import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpResDto } from './dtos/user.res.dto';
import { SignUpReqDto } from './dtos/user.req.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  public signUp(@Body() signUpReqDto: SignUpReqDto): Promise<SignUpResDto> {
    return this.userService.signUp(signUpReqDto);
  }

  @Post('sign-in')
  public signIn(@Body() signInReqDto: SignUpReqDto): Promise<SignUpResDto> {
    return this.userService.signIn(signInReqDto);
  }
}
