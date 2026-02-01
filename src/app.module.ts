import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { DatabaseModule } from '@app/database';
import { IdmModule } from './idm/idm.module';
import { ThemeModule } from './theme/theme.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './idm/guards/authentication/authentication.guard';
import { ThrottleGuard } from './idm/guards/throttle/throttle.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    IdmModule,
    ThemeModule,
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottleGuard,
    },
  ],
})
export class AppModule {}
