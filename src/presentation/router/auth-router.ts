import { authService } from '@/applications/instance';
import Elysia, { t } from 'elysia';

export const authRouter = new Elysia()
  // router
  .post(
    '/register',
    async ({ body, set }) => {
      set.status = 201;
      const user = await authService.registerUser(body);
      return {
        message: 'User created successfully',
        data: user,
      };
    },
    {
      tags: ['auth'],
      body: t.Object({
        email: t.String(),
        password: t.String(),
        username: t.String(),
      }),
    }
  )
  .post(
    '/login',
    async ({ body, set, cookie: { session } }) => {
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
        message: 'User logged in successfully',
        data: {
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
          },
        },
      };
    },
    {
      tags: ['auth'],
      body: t.Object({
        email: t.String({ minLength: 1, format: 'email' }),
        password: t.String({ minLength: 1 }),
      }),
    }
  )
  .post(
    '/logout',
    async ({ cookie: { session }, set }) => {
      const sessionId = session.value;
      if (!sessionId) {
        set.status = 401;
        return { error: 'Unauthorized' };
      }
      await authService.logoutUser(sessionId);
      session.remove();
      set.status = 200;
      return { message: 'User logged out successfully' };
    },
    {
      tags: ['auth'],
    }
  );
