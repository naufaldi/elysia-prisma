import { authService } from '@/applications/instance';
import { Context } from 'elysia'; // Ensure correct module

export async function sessionMiddleware({ cookie: { session }, set }: Context) {
  if (!session?.value) {
    set.status = 401;
    throw new Error('Unauthorized');
  }

  const { user } = await authService.getSession(session.value);

  if (!user) {
    set.status = 401;
    throw new Error('Unauthorized');
  }

  return { user };
}
