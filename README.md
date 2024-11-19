# Elysia with Bun runtime

## TO DO

## TO DO

- [x] Create Coffeshop
- [x] Create Session
- [x] Create User
- [x] Register User
- [x] Login User
- [x] Logout User
- [x] Get Coffeshop
- [x] Get Coffeshop by ID
- [x] Update Coffeshop
- [x] Delete Coffeshop
- [ ] Move List Coffeshop into Public
- [ ] Add Tests for all endpoints
- [ ] Add prefix for public, private routes and prefix for version
- [ ] Add input validation for all request payloads using Zod or similar
- [ ] Implement proper error handling middleware
- [ ] Add rate limiting for API endpoints
- [ ] Implement request logging and monitoring
- [ ] Add API documentation using OpenAPI/Swagger
- [ ] Implement refresh token mechanism
- [ ] Add pagination for list endpoints
- [ ] Implement proper CORS configuration
- [ ] Add health check endpoint
- [ ] Implement caching mechanism
- [ ] Add database migrations and seeding scripts
- [ ] Implement proper TypeScript types for all responses
- [ ] Add environment variables validation
- [ ] Add Docker deployment documentation
- [ ] Setup Docker Compose for development environment
- [ ] Configure CI/CD pipeline for Docker builds
- [ ] Add health check endpoint for Docker container
- [ ] Setup proper Docker volumes for database persistence

## Layered Architecture Overview

Our application is structured using a layered architecture, which organizes the codebase into distinct layers, each with specific responsibilities. This approach enhances maintainability, scalability, and clarity.

### Layers

1. **Infrastructure Layer**:

   - Manages technical details and frameworks.
   - Includes database configurations and ORM tools like Prisma.
   - Example: Database models and Prisma setup.

2. **Applications Layer**:

   - Contains business logic and core functionalities.
   - Processes data and applies business rules.
   - Example: User registration and login services.

3. **Presentation Layer**:
   - Handles user interface and interactions.
   - Manages HTTP routes and API endpoints.
   - Example: Routes and controllers for handling requests.
