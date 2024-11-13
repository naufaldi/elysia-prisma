import { Coffeeshop, User } from '@prisma/client';

export interface ICoffeeshop {
  getAll(user: User): Promise<Coffeeshop[]>;
  getAllCoffeeshops(): Promise<Coffeeshop[]>;
  getById(id: string): Promise<Coffeeshop | null>;
  create(coffeeshop: Coffeeshop): Promise<Coffeeshop>;
  update(id: string, coffeeshop: Coffeeshop): Promise<Coffeeshop | null>;
  delete(id: string): Promise<Coffeeshop | null>;
}

export type InsertCoffeeshop = Omit<Coffeeshop, 'id'>;
export type UpdateCoffeeshop = Partial<Coffeeshop>;
