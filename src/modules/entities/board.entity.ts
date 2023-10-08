import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserInfo } from '../user/vos/UserInfo.vo';
import { CommonEntity } from './common/common.entity';
import { User } from './user.entity';

@Entity({ name: 'boards' })
export class Board extends CommonEntity {
  @Column('varchar')
  public readonly title!: string;

  @Column('varchar')
  public readonly content!: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  public readonly writer!: UserInfo;

  private constructor(title: string, content: string, writer: UserInfo) {
    super();
    this.title = title;
    this.content = content;
    this.writer = writer;
  }

  public static of({
    title,
    content,
    writer,
  }: {
    title: string;
    content: string;
    writer: User;
  }) {
    return new Board(title, content, writer.getUserInfo());
  }
}
