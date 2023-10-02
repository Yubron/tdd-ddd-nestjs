import { SignUpReqDto } from 'src/modules/user/dtos/user.req.dto';
import { SignUpResDto } from 'src/modules/user/dtos/user.res.dto';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { UserService } from 'src/modules/user/user.service';
import { mock, instance } from 'ts-mockito';

describe('Service: UserService', () => {
  const mockedUserRepository: UserRepository = mock(UserRepository);
  const userService = new UserService(instance(mockedUserRepository));

  it('defined defined userService', () => {
    expect(userService).toBeDefined();
  });

  it('sign-up method return access token', async () => {
    const signUpDto: SignUpReqDto = {
      email: 'test@test.com',
      nickname: 'testNickname',
      password: 'testPassword',
      appVersion: '1.0.0',
    };

    const result = await userService.signUp(signUpDto);

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(SignUpResDto);
  });
});
