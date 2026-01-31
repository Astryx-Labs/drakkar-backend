import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { IdmService } from './idm.service';
import { IdmController } from './idm.controller';
import { SecurityModule } from '@app/security';
import jwtConfig from './config/jwt.config';
import { AccessTokenGuard } from './guards/authentication/authentication.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    SecurityModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [IdmController],
  providers: [
    IdmService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class IdmModule {}
