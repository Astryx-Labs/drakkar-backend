import { Module } from '@nestjs/common';
import { ThemeService } from './theme.service';
import { ThemeResolver } from './graphql/theme.resolver';

@Module({
  providers: [ThemeService, ThemeResolver]
})
export class ThemeModule {}
