import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { anyString, anything, instance, mock, when } from 'ts-mockito';

describe('JwtAuthGuard', () => {
  let jwtAuthGuard: JwtAuthGuard;

  beforeEach(async () => {
    const jwtService = mock(JwtService);
    when(jwtService.verifyAsync(anyString(), anything())).thenResolve({
      user: {
        id: 1,
        email: 'test@test.com',
        nickname: 'testNickname',
        appVersion: '1.0.0',
      },
    });
    jwtAuthGuard = new JwtAuthGuard(instance(jwtService));
  });

  it('should be defined', () => {
    expect(jwtAuthGuard).toBeDefined();
  });

  describe('canActivate', () => {
    it('should return true when user is authenticated', async () => {
      const mockContext = mock<ExecutionContext>();
      const mockHttpArgumentsHost = mock<HttpArgumentsHost>();
      when(mockContext.switchToHttp()).thenReturn(
        instance(mockHttpArgumentsHost),
      );
      when(mockHttpArgumentsHost.getRequest()).thenReturn({
        headers: {
          authorization: 'Bearer token',
        },
      });

      const canActivate = await jwtAuthGuard.canActivate(instance(mockContext));

      expect(canActivate).toBe(true);
    });

    it('should thrown an Unauthorized (HTTP 401) error when token is not exist', async () => {
      const mockContext = mock<ExecutionContext>();
      const mockHttpArgumentsHost = mock<HttpArgumentsHost>();
      when(mockContext.switchToHttp()).thenReturn(
        instance(mockHttpArgumentsHost),
      );
      when(mockHttpArgumentsHost.getRequest()).thenReturn({
        headers: {
          authorization: null,
        },
      });
      await expect(async () => {
        await jwtAuthGuard.canActivate(instance(mockContext));
      }).rejects.toThrowError(new UnauthorizedException());
    });
  });
});
