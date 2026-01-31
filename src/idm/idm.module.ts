import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { IdmService } from './idm.service';
import { IdmController } from './idm.controller';
import { SecurityModule } from '@app/security';
import jwtConfig from './config/jwt.config';

@Module({
  imports: [
    SecurityModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [IdmController],
  providers: [IdmService],
})
export class IdmModule {}
