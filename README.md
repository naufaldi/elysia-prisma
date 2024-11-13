# Elysia with Bun runtime

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
