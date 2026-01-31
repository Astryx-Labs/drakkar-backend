import { Controller, Post, Body } from '@nestjs/common';
import { IdmService } from './idm.service';
import { LoginUserDto, RegisterUserDto, VerifyUserDto } from './dto/user.dto';
import { Public } from './decorators/public.decorator';
import { Throttle } from '@nestjs/throttler';

@Public()
//TODO: Add both IP and User rate limiting
@Throttle({ short: {} })
@Controller({
  path: 'idm',
  version: '1',
})
export class IdmController {
  constructor(private readonly idmService: IdmService) {}
  // refresh
  // logout
  @Post('register')
  @Throttle({ short: {} })
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.idmService.register(registerUserDto);
  }

  @Post('verify')
  verify(@Body() verifyUserDto: VerifyUserDto) {
    return this.idmService.verifyEmail(verifyUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.idmService.login(loginUserDto);
  }
}
