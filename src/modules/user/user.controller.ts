import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserDecorator } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { User } from '../entities/user.entity';
import { SignInReqDto, SignUpReqDto } from './dtos/user.req.dto';
import { SignInResDto, SignUpResDto } from './dtos/user.res.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  public signUp(@Body() signUpReqDto: SignUpReqDto): Promise<SignUpResDto> {
    return this.userService.signUp(signUpReqDto);
  }

  @Post('sign-in')
  public signIn(@Body() signInReqDto: SignInReqDto): Promise<SignInResDto> {
    return this.userService.signIn(signInReqDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  public getProfile(@UserDecorator() user: User) {
    return user;
  }
}
