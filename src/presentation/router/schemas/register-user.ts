import { t } from 'elysia';

export const RegisterUserRequestSchema = t.Object({
  email: t.String({ format: 'email' }),
  password: t.String({ minLength: 6 }), // Example constraint
  username: t.String({ minLength: 3 }), // Example constraint
});

// Define the response schema
export const RegisterUserResponseSchema = t.Object({
  id: t.String(),
  email: t.String(),
  username: t.String(),
});
