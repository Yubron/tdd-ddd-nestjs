import { NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInReqDto, SignUpReqDto } from 'src/modules/user/dtos/user.req.dto';
import { SignInResDto, SignUpResDto } from 'src/modules/user/dtos/user.res.dto';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { UserService } from 'src/modules/user/user.service';
import { instance, mock, when } from 'ts-mockito';

describe('Service: UserService', () => {
  const mockedUserRepository: UserRepository = mock(UserRepository);

  const jwtService = new JwtService({ secret: 'testCodeSecret' });
  const userService = new UserService(
    instance(mockedUserRepository),
    jwtService,
  );

  it('defined userService', () => {
    expect(userService).toBeDefined();
  });

  describe('API: signUp', () => {
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
      expect(result.accessToken).not.toBeNull();
    });
  });

  describe('API: signIn', () => {
    it('sign-in method return access token', async () => {
      const signInDto: SignInReqDto = {
        email: 'test@test.com',
        password: 'testPassword',
      };
      when(mockedUserRepository.findByEmail('test@test.com')).thenResolve({
        id: 1,
        email: 'test@test.com',
        nickname: 'testNickname',
        password: 'testPassword',
        lastLogin: new Date(),
        appVersion: '1.0.0',
        comparePassword: async () => true,
        createdAt: new Date(),
        updatedAt: new Date(),
        updateLastLogin: jest.fn(),
        deletedAt: null,
        getUserInfo: jest.fn(),
      });
      const result = await userService.signIn(signInDto);

      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(SignInResDto);
      expect(result.accessToken).not.toBeNull();
    });

    it('sign-in method throw NotFoundException', async () => {
      const signInDto: SignInReqDto = {
        email: 'notFoundEmail',
        password: 'testPassword',
      };
      when(mockedUserRepository.findByEmail('notFoundEmail')).thenResolve(
        undefined,
      );

      await expect(async () => {
        await userService.signIn(signInDto);
      }).rejects.toThrowError(new NotFoundException('user not found'));
    });

    it('sign-in method throw UnauthorizedException', async () => {
      const signInDto: SignInReqDto = {
        email: 'test@test.com',
        password: 'notMatchPassword',
      };
      when(mockedUserRepository.findByEmail('test@test.com')).thenResolve({
        id: 1,
        email: 'test@test.com',
        nickname: 'testNickname',
        password: 'testPassword',
        lastLogin: new Date(),
        appVersion: '1.0.0',
        comparePassword: async () => false,
        createdAt: new Date(),
        updatedAt: new Date(),
        updateLastLogin: jest.fn(),
        deletedAt: null,
        getUserInfo: jest.fn(),
      });

      await expect(async () => {
        await userService.signIn(signInDto);
      }).rejects.toThrowError(new NotFoundException('password not match'));
    });
  });
});
