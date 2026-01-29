import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
  private readonly algorithm = 'aes-256-cbc';
  private readonly key: Buffer;
  private readonly ivLength = 16; // AES block size

  constructor() {
    const keyString = process.env.ENCRYPTION_KEY;
    if (!keyString || keyString.length !== 32) {
      throw new Error(
        'ENCRYPTION_KEY must be set in environment variables and be 32 characters long',
      );
    }
    this.key = Buffer.from(keyString, 'utf8');
  }

  // Encrypt a string using AES encryption with random IV
  encrypt(data: string): string {
    if (!data) {
      throw new Error('Data to encrypt cannot be empty');
    }

    const iv = crypto.randomBytes(this.ivLength);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
    const encrypted = Buffer.concat([
      cipher.update(data, 'utf8'),
      cipher.final(),
    ]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
  }

  // Decrypt a string that was encrypted with the encrypt method
  decrypt(payload: string): string {
    if (!payload || !payload.includes(':')) {
      throw new Error('Invalid encrypted payload format');
    }

    const [ivHex, encryptedHex] = payload.split(':');

    if (!ivHex || !encryptedHex) {
      throw new Error('Invalid encrypted payload format');
    }

    const iv = Buffer.from(ivHex, 'hex');
    const encrypted = Buffer.from(encryptedHex, 'hex');
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]);
    return decrypted.toString('utf8');
  }
}
