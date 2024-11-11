import 'reflect-metadata';
import { PrismaClient, User } from '@prisma/client';
import { injectable } from 'inversify';

import { prisma } from '@/infrastructure/utils/prisma';
import { ISession } from '@/infrastructure/interfaces/session';
import { randomUUID } from 'crypto';

@injectable()
export class SessionRepository implements ISession {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  public async getToken(tokenId: string) {
    return await this.prisma.session.findUnique({
      where: { id: tokenId },
      include: { user: true },
    });
  }

  public async createToken(user: User) {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    return await this.prisma.session.create({
      data: {
        id: randomUUID(),
        userId: user.id,
        expiresAt: expiresAt,
      },
    });
  }

  public async deleteToken(tokenId: string) {
    return await this.prisma.session.delete({
      where: { id: tokenId },
    });
  }
}
