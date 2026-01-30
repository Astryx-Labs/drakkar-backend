import { randomBytes } from 'node:crypto';
import { ConflictException, Injectable } from '@nestjs/common';
import { DatabaseService } from '@app/database/database.service';
import { RegisterUserDto } from './dto/user.dto';
import { HashingService } from '@app/security/hashing.service';
import { userPublicSelector } from '@app/common/prisma/selectors';

@Injectable()
export class IdmService {
  constructor(
    private readonly prismaService: DatabaseService,
    private readonly hashService: HashingService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const { email, displayName, password } = registerUserDto;
    // Check if user already exists
    const existingUser = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Process registration
    const verificationToken = randomBytes(16).toString('base64url');
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    const user = await this.prismaService.user.create({
      data: {
        email,
        displayName,
        password: await this.hashService.hash(password),
        verificationToken,
        expiresAt,
      },
      select: userPublicSelector,
    });
    return user;
  }
}
