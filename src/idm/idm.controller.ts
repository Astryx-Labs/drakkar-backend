import { Controller, Post, Body } from '@nestjs/common';
import { IdmService } from './idm.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller({
  path: 'idm',
  version: '1',
})
export class IdmController {
  constructor(private readonly idmService: IdmService) {}
  // register
  // login
  // refresh
  // logout

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.idmService.register(registerUserDto);
  }
}
