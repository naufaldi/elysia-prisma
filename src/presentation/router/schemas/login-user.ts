import { t } from 'elysia';

export const LoginUserRequestSchema = t.Object({
  email: t.String({ format: 'email' }),
  password: t.String({ minLength: 1 }),
});

export const LoginUserResponseSchema = t.Object({
  id: t.String(),
  email: t.String(),
  username: t.String(),
});
