import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@app/database';
import { IdmModule } from './idm/idm.module';
import { ThemeModule } from './theme/theme.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, IdmModule, ThemeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
