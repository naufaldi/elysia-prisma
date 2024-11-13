import { SessionRepository } from '@/infrastructure/repositories/session';
import { UserRepository } from '@/infrastructure/repositories/user';
import { TYPES } from '@/infrastructure/types';
import { Container } from 'inversify';
import { UserService } from './services/user-service';
import { AuthService } from './services/auth-service';
import { CoffeeshopRepository } from '@/infrastructure/repositories/coffeeshop';
import { CoffeeshopService } from './services/coffeeshop-service';

export const container = new Container();

container.bind(TYPES.userRepo).to(UserRepository);
container.bind(TYPES.sessionRepo).to(SessionRepository);
container.bind(TYPES.coffeeshopRepo).to(CoffeeshopRepository);
container.bind(UserService).toSelf();
container.bind(AuthService).toSelf();
container.bind(CoffeeshopService).toSelf();
export const authService = container.get<AuthService>(AuthService);
export const userService = container.get<UserService>(UserService);
export const coffeeshopService =
  container.get<CoffeeshopService>(CoffeeshopService);
