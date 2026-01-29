import { Module } from '@nestjs/common';
import { IdmModule } from './idm/idm.module';

@Module({
  imports: [IdmModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
