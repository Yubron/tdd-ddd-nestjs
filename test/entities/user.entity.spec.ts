import { User } from 'src/modules/entities/user.entity';

describe('Entity: User', () => {
  it('should be defined', () => {
    const email = 'test@test.com';
    const nickname = 'testNickname';
    const password = 'testPassword';
    const appVersion = '1.0.0';

    const user = User.of({
      email,
      nickname,
      password,
      appVersion,
    });

    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(User);
    expect(user.email).toBe(email);
    expect(user.nickname).toBe(nickname);
    expect(user.password).toBe(password);
    expect(user.appVersion).toBe(appVersion);
  });
});