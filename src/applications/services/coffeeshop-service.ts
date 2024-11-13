import {
  InsertCoffeeshop,
  UpdateCoffeeshop,
} from '@/infrastructure/interfaces/coffeeshop';
import { CoffeeshopRepository } from '@/infrastructure/repositories/coffeeshop';
import { TYPES } from '@/infrastructure/types';
import { User } from '@prisma/client';
import { inject, injectable } from 'inversify';

@injectable()
export class CoffeeshopService {
  private coffeeshopRepo: CoffeeshopRepository;

  constructor(
    @inject(TYPES.coffeeshopRepo) coffeeshopRepository: CoffeeshopRepository
  ) {
    this.coffeeshopRepo = coffeeshopRepository;
  }

  public async getAll(user: User) {
    return await this.coffeeshopRepo.getAll(user);
  }
  public async getAllCoffeeshops() {
    return await this.coffeeshopRepo.getAllCoffeeshops();
  }
  public async getById(id: string) {
    return await this.coffeeshopRepo.getById(id);
  }
  public async create(coffeeshop: InsertCoffeeshop) {
    return await this.coffeeshopRepo.create(coffeeshop);
  }
  public async update(id: string, coffeeshop: UpdateCoffeeshop) {
    return await this.coffeeshopRepo.update(id, coffeeshop);
  }
  public async delete(id: string) {
    return await this.coffeeshopRepo.delete(id);
  }
}
