import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/entities/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.findOne({ where: { email } });
    return user;
  }
}
