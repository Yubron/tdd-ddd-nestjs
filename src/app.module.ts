import { Module } from '@nestjs/common';
import { CommonModule } from './modules/common/common.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmConfigService } from './modules/common/database/typeorm.config.service';

@Module({
  imports: [
    CommonModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (
        options?: DataSourceOptions,
      ): Promise<DataSource> => {
        if (!options) throw new Error('options is undefined');
        return await new DataSource(options).initialize();
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
