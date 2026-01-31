import { randomBytes } from 'node:crypto';
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from '@app/database/database.service';
import { LoginUserDto, RegisterUserDto, VerifyUserDto } from './dto/user.dto';
import { HashingService } from '@app/security/hashing.service';
import { userPublicSelector } from '@app/common/prisma/selectors';
import jwtConfig from './config/jwt.config';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt.interface';

@Injectable()
export class IdmService {
  constructor(
    private readonly prismaService: DatabaseService,
    private readonly hashService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguation: ConfigType<typeof jwtConfig>,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const { email, password } = registerUserDto;
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
        password: await this.hashService.hash(password),
        verificationToken,
        expiresAt,
      },
      select: userPublicSelector,
    });
    return user;
  }

  async verifyEmail(verifyUserDto: VerifyUserDto) {
    const { verificationToken } = verifyUserDto;
    const user = await this.prismaService.user.findFirst({
      where: { verificationToken },
    });
    if (!user) {
      throw new ConflictException('Invalid verification token');
    }
    if (user.isVerified) {
      throw new ConflictException('User is already verified');
    }
    if (!user.expiresAt || user.expiresAt < new Date()) {
      throw new ConflictException('Verification token has expired');
    }
    const verifiedUser = await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verificationToken: null,
        expiresAt: null,
      },
      select: userPublicSelector,
    });
    return verifiedUser;
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new ConflictException('Invalid email or password');
    }
    const isPasswordValid = await this.hashService.verify(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new ConflictException('Invalid email or password');
    }
    if (!user.isVerified) {
      throw new ConflictException('User is not verified');
    }
    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      } as JwtPayload,
      {
        audience: this.jwtConfiguation.audience,
        issuer: this.jwtConfiguation.issuer,
        secret: this.jwtConfiguation.secret,
        expiresIn: this.jwtConfiguation.accessTokenTtl,
      },
    );
    return { accessToken };
  }
}
