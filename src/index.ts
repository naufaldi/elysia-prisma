import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { authRouter } from '@/presentation/router/auth-router';
import { swagger } from '@elysiajs/swagger';

const app = new Elysia()
  .use(cors())
  .use(
    swagger({
      path: '/docs',
      autoDarkMode: true,
      documentation: {
        info: {
          title: 'API Coffeshop Coordinate',
          version: '1.0.0',
          description: 'API Coffeshop Coordinate',
        },
      },
    })
  )
  .use(authRouter)
  .get('/', () => 'Hello Elysia')
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
