import Elysia, { t } from 'elysia';
import { sessionMiddleware } from '@/presentation/middleware/session-middleware';
import { coffeeshopService } from '@/applications/instance';
import { ValidationService } from '@/applications/services/validation-service';
import {
  CoffeeshopByUserResponseSchema,
  CreateCoffeeshopRequestSchema,
  UpdateCoffeeshopRequestSchema,
} from './schemas/coffeeshop';

export const coffeeshopRouter = new Elysia()
  // middleware
  .derive(sessionMiddleware)
  // router
  .get(
    '/user/coffeeshop',
    async ({ user, set }) => {
      try {
        const allCoffeeshops = await coffeeshopService.getAll(user);
        set.status = 200;
        return {
          status: 'success',
          message: 'Coffeeshops by user, retrieved successfully',
          data: allCoffeeshops,
        };
      } catch (error) {
        set.status = 500;
        return {
          status: 'error',
          message:
            error instanceof Error
              ? error.message
              : 'Failed to retrieve coffeeshops',
        };
      }
    },
    {
      response: {
        200: t.Object({
          status: t.Literal('success'),
          message: t.String(),
        }),
        401: t.Object({
          status: t.Literal('error'),
          message: t.String(),
        }),
        500: t.Object({
          status: t.Literal('error'),
          message: t.String(),
        }),
      },
      tags: ['coffeeshop'],
    }
  )
  .get(
    '/coffeeshop',
    async ({}) => {
      const allCoffeeshops = await coffeeshopService.getAllCoffeeshops();
      return {
        status: 'success',
        message: 'Coffeeshops, retrieved successfully',
        data: allCoffeeshops,
      };
    },
    {
      tags: ['coffeeshop'],
    }
  )
  .get(
    '/coffeeshop/:id',
    async ({ params }) => {
      const coffeeshop = await coffeeshopService.getById(params.id);
      return {
        status: 'success',
        message: 'Coffeeshop, retrieved successfully',
        data: coffeeshop,
      };
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
        return {
          status: 'success',
          message: 'Coffeeshop created successfully',
          data: createdCoffeeshop,
        };
      } catch (error) {
        set.status = 500;
        return { error: 'Internal Server Error' };
      }
    },
    {
      tags: ['coffeeshop'],
      body: CreateCoffeeshopRequestSchema,
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
        return {
          status: 'success',
          message: 'Coffeeshop updated successfully',
          data: updatedCoffeeshop,
        };
      } catch (error) {
        set.status = 500;
        return {
          status: 'error',
          message: 'Internal Server Error',
        };
      }
    },
    {
      tags: ['coffeeshop'],
      body: UpdateCoffeeshopRequestSchema,
    }
  )
  .delete(
    '/coffeeshop/:id',
    async ({ params, set }) => {
      await coffeeshopService.delete(params.id);
      set.status = 204;
      return {
        status: 'success',
        message: 'Coffeeshop deleted successfully',
      };
    },
    {
      tags: ['coffeeshop'],
    }
  )

  .get('/', async ({}) => {
    return 'Hello World';
  });
