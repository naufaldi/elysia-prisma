import 'reflect-metadata';

import { PrismaClient, User } from '@prisma/client';
import { injectable } from 'inversify';

import {
  InsertUser,
  IUser,
  UpdateUser,
} from '@/infrastructure/interfaces/user';
import { prisma } from '@/infrastructure/utils/prisma';

@injectable()
export class UserRepository implements IUser {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async getAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async getById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async create(user: InsertUser): Promise<Omit<User, 'password'>> {
    return await this.prisma.user.create({
      data: {
        username: user.username,
        email: user.email,
        password: user.password,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async update(id: string, user: UpdateUser): Promise<Omit<User, 'password'>> {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        username: user.username,
        email: user.email,
        password: user.password,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async delete(id: string): Promise<User | null> {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
