import * as bcrypt from 'bcrypt';
import { Column, Entity } from 'typeorm';
import { UserInfo } from '../user/vos/UserInfo.vo';
import { CommonEntity } from './common/common.entity';

@Entity({ name: 'users' })
export class User extends CommonEntity {
  @Column('varchar', { unique: true })
  public readonly email!: string;

  @Column('varchar')
  public readonly nickname!: string;

  @Column('varchar')
  public readonly password!: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  public lastLogin!: Date;

  @Column('varchar')
  public readonly appVersion!: string;

  private constructor(
    email: string,
    nickname: string,
    password: string,
    appVersion: string,
  ) {
    super();
    this.email = email;
    this.nickname = nickname;
    this.password = password;
    this.appVersion = appVersion;
  }

  public static async of({
    email,
    nickname,
    password,
    appVersion,
  }: {
    email: string;
    nickname: string;
    password: string;
    appVersion: string;
  }) {
    const hashedPassword = await this.hashPassword(password);
    return new User(email, nickname, hashedPassword, appVersion);
  }

  private static async hashPassword(password: string) {
    const saltOrRounds = await bcrypt.genSalt();
    return await bcrypt.hash(password, saltOrRounds);
  }

  public async comparePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }

  public updateLastLogin() {
    this.lastLogin = new Date();
  }

  public getUserInfo(): UserInfo {
    return {
      id: this.id,
      email: this.email,
      nickname: this.nickname,
      lastLogin: this.lastLogin,
      appVersion: this.appVersion,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
