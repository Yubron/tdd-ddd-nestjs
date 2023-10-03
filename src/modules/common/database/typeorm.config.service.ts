import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get('DB_HOST'),
      port: +this.configService.get('DB_PORT'),
      username: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PW'),
      database: this.configService.get('DB_NAME'),
      synchronize: false,
      namingStrategy: new SnakeNamingStrategy(),
      logging: false,
      entities: ['dist/modules/entities/*.entity.js'],
      migrations: ['src/db/migrations/*.ts'],
    } as TypeOrmModuleOptions;
  }
}
