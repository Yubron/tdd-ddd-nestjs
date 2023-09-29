import { Entity, Column } from 'typeorm';
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
  public readonly lastLogin!: Date;

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

  public static of({
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
    return new User(email, nickname, password, appVersion);
  }
}
