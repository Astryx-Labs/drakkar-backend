import { Module } from '@nestjs/common';
import { IdmService } from './idm.service';
import { IdmController } from './idm.controller';
import { SecurityModule } from '@app/security';

@Module({
  imports: [SecurityModule],
  controllers: [IdmController],
  providers: [IdmService],
})
export class IdmModule {}
