import { SignUpResDto } from 'src/modules/user/dtos/user.res.dto';

describe('Entity: User', () => {
  it('should be defined', () => {
    const testToken = 'testAccessToken';
    const signUpResDto = SignUpResDto.of(testToken);

    expect(signUpResDto).toBeDefined();
    expect(signUpResDto).toBeInstanceOf(SignUpResDto);
    expect(signUpResDto.accessToken).toBe(testToken);
  });
});
