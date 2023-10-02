import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { SignUpReqDto } from 'src/modules/user/dtos/user.req.dto';

describe('Entity: User', () => {
  it('should be defined', async () => {
    const signUpReqDto = {
      email: 'test@test.com',
      password: 'testPassword',
      nickname: 'testNickname',
      appVersion: '1.0.0',
    };

    const ofSignUpReqDto = plainToClass(SignUpReqDto, signUpReqDto);
    const errors = await validate(ofSignUpReqDto);

    expect(errors.length).toBe(0);
    expect(ofSignUpReqDto).toEqual(signUpReqDto);
    expect(ofSignUpReqDto).toBeInstanceOf(SignUpReqDto);
  });

  it('should be validated', async () => {
    const singUpReqDto = {
      email: 'test',
      password: 12345678,
      nickname: 12345678,
      appVersion: 1,
    };

    const ofSignUpReqDto = plainToClass(SignUpReqDto, singUpReqDto);
    const errors = await validate(ofSignUpReqDto);

    expect(errors.length).toBe(4);
    expect(errors[0].constraints.isEmail).toBe('email must be an email');
    expect(errors[1].constraints.isString).toBe('password must be a string');
    expect(errors[2].constraints.isString).toBe('nickname must be a string');
    expect(errors[3].constraints.isString).toBe('appVersion must be a string');
  });
});
