import { injectable } from 'inversify';
import { ICoffeeshop } from '@/infrastructure/interfaces/coffeeshop';
import { prisma } from '@/infrastructure/utils/prisma';
import { PrismaClient, User } from '@prisma/client';

@injectable()
export class CoffeeshopRepository implements ICoffeeshop {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  public async getAll(user: User) {
    return await this.prisma.coffeeshop.findMany({
      where: {
        ownerId: user.id,
      },
    });
  }
  public async getAllCoffeeshops() {
    return await this.prisma.coffeeshop.findMany();
  }

  public async getById(id: string) {
    return await this.prisma.coffeeshop.findUnique({
      where: { id },
    });
  }
  public async create(data: any) {
    return await this.prisma.coffeeshop.create({
      data: {
        ...data,
        owner: {
          connect: {
            id: data.ownerId,
          },
        },
      },
    });
  }
  public async update(id: string, data: any) {
    return await this.prisma.coffeeshop.update({
      where: { id },
      data,
    });
  }
  public async delete(id: string) {
    return await this.prisma.coffeeshop.delete({
      where: { id },
    });
  }
}
