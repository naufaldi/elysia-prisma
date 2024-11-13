import Elysia, { t } from 'elysia';
import { sessionMiddleware } from '@/presentation/middleware/session-middleware';
import { coffeeshopService } from '@/applications/instance';
import { ValidationService } from '@/applications/services/validation-service';

export const coffeeshopRouter = new Elysia()
  // middleware
  .derive(sessionMiddleware)
  // router
  .get(
    '/user/coffeeshop',
    async ({ user }) => {
      const allCoffeeshops = await coffeeshopService.getAll(user);
      return allCoffeeshops;
    },
    {
      tags: ['coffeeshop'],
    }
  )
  .get(
    '/coffeeshop',
    async ({}) => {
      const allCoffeeshops = await coffeeshopService.getAllCoffeeshops();
      return allCoffeeshops;
    },
    {
      tags: ['coffeeshop'],
    }
  )
  .get(
    '/coffeeshop/:id',
    async ({ params }) => {
      const coffeeshop = await coffeeshopService.getById(params.id);
      return coffeeshop;
    },
    {
      tags: ['coffeeshop'],
    }
  )
  .post(
    '/coffeeshop',
    async ({ body, user, set }) => {
      try {
        const isValid = ValidationService.validateCoffeeshopData(body);
        if (!isValid) {
          set.status = 400;
          return { error: 'Invalid GeoJSON data' };
        }

        const coffeeshop = { ...body, ownerId: user.id };
        const createdCoffeeshop = await coffeeshopService.create(coffeeshop);
        set.status = 201;
        return createdCoffeeshop;
      } catch (error) {
        set.status = 500;
        return { error: 'Internal Server Error' };
      }
    },
    {
      tags: ['coffeeshop'],
      body: t.Object({
        name: t.String(),
        location: t.String(),
        lat: t.Number(),
        long: t.Number(),
        hasWifi: t.Boolean(),
        notes: t.String(),
        createdAt: t.Date(),
        updatedAt: t.Date(),
        geojson: t.String(),
      }),
    }
  )
  .put(
    '/coffeeshop/:id',
    async ({ body, user, set, params }) => {
      try {
        const isValid = ValidationService.validateCoffeeshopData(body);
        if (!isValid) {
          set.status = 400;
          return { error: 'Invalid GeoJSON data' };
        }

        const coffeeshop = { ...body, ownerId: user.id };
        const updatedCoffeeshop = await coffeeshopService.update(
          params.id,
          coffeeshop
        );
        set.status = 201;
        return updatedCoffeeshop;
      } catch (error) {
        set.status = 500;
        return { error: 'Internal Server Error' };
      }
    },
    {
      tags: ['coffeeshop'],
      body: t.Object({
        name: t.String(),
        location: t.String(),
        lat: t.Number(),
        long: t.Number(),
        hasWifi: t.Boolean(),
        notes: t.String(),
        createdAt: t.Date(),
        updatedAt: t.Date(),
        geojson: t.String(),
      }),
    }
  )
  .delete(
    '/coffeeshop/:id',
    async ({ params, set }) => {
      await coffeeshopService.delete(params.id);
      set.status = 204;
    },
    {
      tags: ['coffeeshop'],
    }
  )

  .get('/', async ({}) => {
    return 'Hello World';
  });
