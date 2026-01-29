import { Module } from '@nestjs/common';
import { IdmModule } from './idm/idm.module';
import { ThemeModule } from './theme/theme.module';

@Module({
  imports: [IdmModule, ThemeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
