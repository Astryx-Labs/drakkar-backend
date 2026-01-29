import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class HashingService {
  // Hash a password using Argon2
  async hash(value: string): Promise<string> {
    return await argon2.hash(value);
  }

  // Verify a password against an Argon2 hash
  async verify(value: string, hash: string): Promise<boolean> {
    return await argon2.verify(hash, value);
  }
}
