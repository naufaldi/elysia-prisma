# Use the official Bun image
FROM oven/bun:1 AS base
WORKDIR /usr/src/app

# Install dependencies into temp directory
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# Install production dependencies
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# Build stage
FROM base AS build
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# Generate Prisma Client
RUN bunx prisma generate

# [Optional] Run database migrations
# Note: In production, you might want to run migrations separately
# RUN bunx prisma migrate deploy

# Final stage
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=build /usr/src/app/src ./src
COPY --from=build /usr/src/app/prisma ./prisma
COPY --from=build /usr/src/app/package.json .
COPY --from=build /usr/src/app/tsconfig.json .
COPY --from=build /usr/src/app/node_modules/.prisma ./node_modules/.prisma

# Set production environment
ENV NODE_ENV=production

# Create volume for SQLite database
VOLUME ["/usr/src/app/prisma"]

# Run as non-root user
USER bun

# Expose the port
EXPOSE 3000

# Start the application
CMD ["bun", "run", "src/index.ts"]