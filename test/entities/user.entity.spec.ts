import { User } from 'src/modules/entities/user.entity';

const testUserObject = {
  email: 'test@test.com',
  nickname: 'testNickname',
  password: 'testPassword',
  appVersion: '1.0.0',
};

describe('Entity: User', () => {
  it('should be defined', async () => {
    const user = await User.of(testUserObject);
    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(User);
    expect(user.email).toBe(testUserObject.email);
    expect(user.nickname).toBe(testUserObject.nickname);
    expect(await user.comparePassword(testUserObject.password)).toBeTruthy();
    expect(user.password).not.toBe(testUserObject.password);
    expect(user.appVersion).toBe(testUserObject.appVersion);
  });

  // create update last login function test code
  it('should be update last login', async () => {
    const user = await User.of(testUserObject);
    user.updateLastLogin();

    expect(user.lastLogin).toBeDefined();
    expect(user.lastLogin).toBeInstanceOf(Date);
  });
});
