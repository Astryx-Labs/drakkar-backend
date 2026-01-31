import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Request } from 'express';
import { REQUEST_USER_KEY } from '../../constants/idm.constants';

@Injectable()
export class HybridThrottlerGuard extends ThrottlerGuard {
  protected getTracker(req: Request): Promise<string> {
    // Authenticated → user-based
    const user = req[REQUEST_USER_KEY] as { sub?: string } | undefined;
    if (user?.sub) {
      return Promise.resolve(`user:${user.sub}`);
    }

    // Public / auth → IP-based
    return Promise.resolve(`ip:${req.ip}`);
  }
}
