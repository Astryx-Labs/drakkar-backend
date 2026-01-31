import { Controller, Post, Body } from '@nestjs/common';
import { IdmService } from './idm.service';
import { LoginUserDto, RegisterUserDto } from './dto/user.dto';

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

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.idmService.login(loginUserDto);
  }
}
