# Authentication System

A robust backend API service for JWT authentication with role-based access control.

## Setup and Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd authentication-system
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add your configuration settings:
     ```
     PORT=3000
     MONGODB_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     ```

## How to Run the Project

### Local Development

1. Seed the database with test users:

   ```bash
   npm run seed:users
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

### Docker Setup

1. Start the Docker containers:

   ```bash
   docker-compose up --build
   ```

   The seed script will automatically run before the main application starts, ensuring test users are available in the database.

2. To run in detached mode:

   ```bash
   docker-compose up -d --build
   ```

3. To stop the containers:

   ```bash
   docker-compose down
   ```

## Project Structure

```
authentication-system/
├── src/
│   ├── config/
│   │   └── app.config.ts
│   ├── db/
│   │   ├── db.types.ts
│   │   ├── mongo/
│   │   │   └── mongoClient.ts
│   │   └── index.ts
│   ├── express.app.ts
│   ├── index.ts
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   ├── rate-limit.middleware.ts
│   │   └── role-access.middleware.ts
│   ├── modules/
│   │   └── users/
│   │       ├── db/
│   │       │   ├── user.repository.interface.ts
│   │       │   └── user.repository.ts
│   │       ├── domain/
│   │       │   └── user.type.ts
│   │       ├── services/
│   │       │   └── user.service.ts
│   │       ├── user.controller.ts
│   │       ├── user.mapper.ts
│   │       └── user.routes.ts
│   ├── tokenGenerator.ts
│   ├── types/
│   │   └── express.types.ts
│   ├── utils/
│   │   ├── cache/
│   │   │   ├── cache-client.interface.ts
│   │   │   └── redis-cache-client.ts
│   │   ├── crypto.ts
│   │   ├── jwt.util.ts
│   │   ├── password.util.ts
│   │   └── response.util.ts
├── dist/                  # Compiled TypeScript output
├── .gitignore
├── package.json
├── tsconfig.json
└── .eslintrc.json
```

## Features

- JWT-based Authentication
- Role-based Access Control
- Redis Caching
- MongoDB Integration
- Rate Limiting
- Secure Password Hashing
- TypeScript Type Safety
- Clean Architecture
- Database Seeding

## Testing Credentials

The application comes with pre-configured test users that can be seeded into the database:

1. **Admin User**

   - Email: admin@example.com
   - Password: Admin@123
   - Role: Admin

2. **Normal User**
   - Email: user@example.com
   - Password: User@123
   - Role: User

These credentials can be used for testing the authentication and authorization features of the application.

## Technologies Used

- Node.js - Runtime environment
- Express - Web framework
- MongoDB - NoSQL database
- Mongoose - MongoDB ORM
- Redis - In-memory data store for caching
- JWT - JSON Web Tokens for secure authentication
- TypeScript - Type-safe programming
- bcrypt - Password hashing
- Express Rate Limit - API rate limiting
- ESLint - Code linting

### Technology Stack Details

1. **Authentication**

   - JWT-based authentication system
   - Secure token generation and validation
   - Token-based session management
   - Role-based access control

2. **Performance**

   - Redis caching layer
   - Cached API responses
   - TTL-based cache invalidation

3. **Security**

   - Password hashing with bcrypt
   - Rate limiting
   - Request validation
   - Secure token handling

4. **Architecture**

   - Clean architecture principles
   - Modular design
   - Separation of concerns
   - Type-safe codebase

5. **Database**

   - MongoDB with Mongoose
   - Optimized indexes
   - Schema validation
   - Type-safe models
   - Rate limiting for API endpoints
   - Standard rate limit headers for client integration
   - Health check endpoint remains unrate-limited

6. **API Rate Limiting**
   - All API endpoints: `/api/*` (10 requests per minute)
   - Rate limit headers:
     - `RateLimit-Limit`: Maximum number of requests allowed
     - `RateLimit-Remaining`: Number of requests remaining
     - `RateLimit-Reset`: Time until rate limit resets
   - Error response format:
     ```json
     {
       "success": false,
       "message": "Too many requests from this IP, please try again later."
     }
     ```
