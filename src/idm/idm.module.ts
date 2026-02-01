import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { IdmService } from './idm.service';
import { IdmController, TestController } from './idm.controller';
import { SecurityModule } from '@app/security';
import jwtConfig from './config/jwt.config';

@Module({
  imports: [
    SecurityModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [IdmController, TestController],
  providers: [IdmService],
  exports: [JwtModule, ConfigModule],
})
export class IdmModule {}
