import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@app/database/database.service';
import { RegisterUserDto } from './dto/user.dto';
import { HashingService } from '@app/security/hashing.service';

@Injectable()
export class IdmService {
  constructor(
    private readonly prismaService: DatabaseService,
    private readonly hashService: HashingService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const { email, displayName, password } = registerUserDto;
    const user = await this.prismaService.user.create({
      data: {
        email,
        displayName,
        password: await this.hashService.hash(password),
      },
    });
    return user;
  }
}
