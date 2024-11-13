import { authService } from '@/applications/instance';
import Elysia, { t } from 'elysia';
import {
  RegisterUserRequestSchema,
  RegisterUserResponseSchema,
} from './schemas/register-user';
import {
  LoginUserRequestSchema,
  LoginUserResponseSchema,
} from './schemas/login-user';

export const authRouter = new Elysia()
  // router
  .post(
    '/register',
    async ({ body, set }) => {
      try {
        const newUser = await authService.registerUser(body);
        set.status = 201;
        return {
          status: 'success',
          message: 'User registered successfully',
          data: newUser,
        };
      } catch (error) {
        set.status = 400;
        return {
          status: 'error',
          message:
            error instanceof Error ? error.message : 'Registration failed',
        };
      }
    },
    {
      body: RegisterUserRequestSchema,
      response: {
        201: t.Object({
          status: t.Literal('success'),
          message: t.String(),
          data: RegisterUserResponseSchema,
        }),
        400: t.Object({
          status: t.Literal('error'),
          message: t.String(),
        }),
      },
      detail: {
        tags: ['Auth'],
        summary: 'Register a new user',
        description: 'Create a new user account',
      },
    }
  )
  .post(
    '/login',
    async ({ body, set, cookie: { session } }) => {
      try {
        const { user, session: newSession } = await authService.loginUser(
          body.email,
          body.password
        );

        session.set({
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 7, // 1 week
          value: newSession.id,
        });

        set.status = 200;
        return {
          status: 'success',
          message: 'User logged in successfully',
          data: {
            user: {
              id: user.id,
              email: user.email,
              username: user.username,
            },
          },
        };
      } catch (error) {
        set.status = 401;
        return {
          status: 'error',
          message: error instanceof Error ? error.message : 'Login failed',
        };
      }
    },
    {
      body: LoginUserRequestSchema,
      response: {
        200: t.Object({
          status: t.Literal('success'),
          message: t.String(),
          data: t.Object({
            user: LoginUserResponseSchema,
          }),
        }),
        401: t.Object({
          status: t.Literal('error'),
          message: t.String(),
        }),
      },
      detail: {
        tags: ['Auth'],
        summary: 'User login',
        description: 'Authenticate user and start a session',
      },
    }
  )
  .post(
    '/logout',
    async ({ cookie: { session }, set }) => {
      const sessionId = session.value;
      if (!sessionId) {
        set.status = 401;
        return { status: 'error', message: 'Unauthorized' };
      }
      await authService.logoutUser(sessionId);
      session.remove();
      set.status = 200;
      return { status: 'success', message: 'User logged out successfully' };
    },
    {
      detail: {
        tags: ['Auth'],
        summary: 'User logout',
        description: 'End user session',
      },
    }
  );
