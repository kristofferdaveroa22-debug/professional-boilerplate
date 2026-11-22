Task Management API
A RESTful backend API built with Node.js, Express.js, TypeScript,
TypeORM, and MySQL. The application supports user and task management,
authentication, task categories and tags, filtering, pagination,
sorting, database transactions, and API versioning.
1. Project Description
The Task Management API is a backend application that allows users to
manage their accounts and organize their tasks. It provides endpoints
for authentication, user management, task creation, task filtering, and
task statistics.

The project uses TypeScript and Express.js to build the API, TypeORM to
manage database entities and relationships, and MySQL to store
application data. It also follows a modular project structure using
entities, DTOs, repositories, middleware, migrations, and seeders.
2. Features
- User registration and management
- User login using email and password
- Password hashing using bcrypt
- Password exclusion from API responses
- User creation with an initial task using database transactions
- Task creation and management
- Task categories
- Task tags with many-to-many relationships
- Task filtering by status and priority
- Task pagination
- Task sorting
- Overdue task retrieval
- User task statistics
- Soft deletion of tasks
- Computed isOverdue property
- Custom Task repository
- Request validation using Joi
- DTOs for request body typing
- Input sanitization for task titles and descriptions
- Request logging middleware
- API versioning using the /api/v1 prefix
- TypeORM database migrations
- Database seeding
- Graceful server shutdown
- Environment-specific database configuration
3. Technology Stack
  Technology   Purpose
  Node.js      JavaScript runtime
Express.js   Backend web framework
TypeScript   Static typing
MySQL        Relational database
TypeORM      Database ORM and entity relationships
Joi          Request validation
bcrypt       Password hashing
dotenv       Environment variable configuration
4. Project Setup
4.1 Prerequisites
Make sure the following are installed:
- Node.js
- npm
- MySQL Server
- MySQL Workbench (optional)
- Visual Studio Code or another code editor
4.2 Install Dependencies
Open the project folder in a terminal and run:
npm install
4.3 Create the Database
Open MySQL Workbench or the MySQL command line and execute:
CREATE DATABASE midterm_api;
Use the database name configured in your .env file.
4.4 Configure Environment Variables
Create a .env file in the root directory:
NODE_ENV=development
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
DB_DATABASE=midterm_api

FRONTEND_URL=http://localhost:4200
Create a .env.example file with the same variable names, but do not
include your real database password.
4.5 Start the Development Server
Run:
npm run dev
The API runs at:
http://localhost:3000
5. Environment Variables
  Variable                Description             Example
  NODE_ENV              Application environment development

  PORT                  Port used by the        3000
Express server          

  DB_HOST               MySQL server host       localhost

  DB_PORT               MySQL server port       3306

  DB_USERNAME           MySQL username          root

  DB_PASSWORD           MySQL password          your_mysql_password

  DB_DATABASE           Database name           midterm_api
FRONTEND_URL          Allowed frontend origin http://localhost:4200
for CORS
Important: Do not commit .env to a public repository. Add it to
.gitignore and share .env.example instead.
6. Database Migrations and Seeders
6.1 Database Migrations
The project uses TypeORM migrations to create and update the database
schema.

Generate a migration after making changes to entities:
npm run migration:generate -- -n MigrationName
Run pending migrations:
npm run migration:run
Revert the most recently applied migration:
npm run migration:revert
Use the migration scripts configured in package.json. Migration
commands should be run after confirming that the database connection
settings in .env are correct.

The project uses migrations to keep database schema changes consistent.
TypeORM synchronization should remain disabled when migrations are being
used.
6.2 Database Seeder
The project includes a seed script that creates:
- 5 dummy users
- 15 dummy tasks
Run the seeder with:
npm run seed
The seed script checks for existing users and tasks before inserting
records, helping prevent duplicate data when it is run more than once.
7. API Documentation
7.1 API Documentation
API Versioning
All API endpoints are available under the /api/v1 prefix.

Example:
GET /api/v1/users
Old /api endpoints return 410 Gone and indicate that the endpoint
has moved to /api/v1.
New API Endpoints
Authentication

POST /api/v1/auth/login

Used to log in a user using their email and password.

User With Initial Task

POST /api/v1/users/with-initial-task

Creates a user and their first task at the same time using a TypeORM
transaction.

If task creation fails, the user creation is rolled back.

Overdue Tasks

GET /api/v1/overdue

Returns tasks where the due date is in the past and the task status is
not completed.

User Task Statistics

GET /api/v1/users/:userId/stats

Returns the total, completed, and pending tasks for a user.

User Tasks

GET /api/v1/users/:userId/tasks

POST /api/v1/users/:userId/tasks

These endpoints support task retrieval and creation, including
filtering, pagination, and sorting for task retrieval.

Delete Task

DELETE /api/v1/tasks/:id

Uses soft deletion by setting isDeleted to true instead of
permanently removing the task.
Task Filtering, Pagination, and Sorting
Tasks can be filtered by:
- status
- priority
Example:
GET /api/v1/users/6/tasks?status=pending&priority=high
Pagination is supported using:
- page
- limit
Example:
GET /api/v1/users/6/tasks?page=1&limit=10
Sorting is supported using:
- sortBy
- order
Example:
GET /api/v1/users/6/tasks?sortBy=title&order=ASC
7.2 Database Schema
User

The users table contains:
- id
- name
- email
- phoneNumber
- password
- isActive
- createdAt
- updatedAt
Task

The tasks table contains:
- id
- title
- description
- status
- priority
- dueDate
- userId
- categoryId
- isDeleted
- createdAt
- updatedAt
Category

The categories table contains:
- id
- name
Tag

The tags table contains:
- id
- name
7.3 Database Relationships
User and Task

One user can have many tasks.
User 1 ───────── * Task
A task belongs to one user.

If a user is deleted, the task's userId is set to NULL.

Category and Task

One category can have many tasks.
Category 1 ───── * Task
A task can belong to one category.

Task and Tag

Tasks and tags have a many-to-many relationship.
Task * ───────── * Tag
A task can have multiple tags, and a tag can belong to multiple tasks.

TypeORM uses a junction table to connect tasks and tags.
7.4 Computed Task Property
The Task entity has an isOverdue computed property.

It returns true when:
- The dueDate is in the past.
- The task status is not completed.
Example:
{
  "title": "Finish project",
  "status": "pending",
  "isOverdue": true
}
7.5 Custom Task Repository
The project includes a custom Task repository with the following method:

findOverdueTasks()

This method finds tasks where the due date is before today and the task
status is not completed.

It provides a reusable way to retrieve overdue tasks without repeating
the same query logic throughout the application.
7.6 DTOs
The project uses Data Transfer Objects (DTOs) for request body typing.

DTOs are located in:
src/dto/
The project includes:
- CreateUserDto
- UpdateUserDto
- CreateTaskDto
DTOs help define the expected structure of incoming data and improve
type safety and code organization.
7.7 Other Implemented Features
The API also includes:
- Password hashing using bcrypt
- Password exclusion from API responses
- Input sanitization for task title and description
- Request logging middleware
- Database transactions
- Custom Task repository
- Soft delete
- Pagination
- Sorting
- Filtering
- API versioning
- Graceful shutdown
- Environment-specific database configuration
- TypeORM migrations
8. Reflection
8.1 What did you learn from this project?
I learned how to build and organize a RESTful API using Node.js,
Express.js, TypeScript, and TypeORM. I also gained a better
understanding of database relationships, migrations, DTOs, middleware,
validation, and how backend components work together. This project
helped me understand how to develop an API that is more organized,
maintainable, and scalable.
8.2 What challenges did you encounter, and how did you solve them?
One of the challenges I encountered was configuring TypeORM and making
sure the entities and database tables were properly connected. I also
experienced errors involving migrations, database connections, and
TypeScript imports. I solved these problems by checking error messages,
reviewing my configuration and entity files, correcting the code, and
testing each feature step by step.
8.3 Why are database relationships important?
Database relationships help organize information and connect related
records. For example, a user can own multiple tasks, a category can be
assigned to multiple tasks, and tasks can have multiple tags. Using the
correct relationships helps maintain data consistency and reduces
unnecessary duplication.
8.4 Why are transactions important when creating a user with an initial task?
Transactions ensure that related database operations are completed
together. When creating a user and their initial task, both operations
should succeed. If task creation fails, the transaction rolls back the
user creation as well. This prevents incomplete or inconsistent records
from being stored in the database.
8.5 What improvements would you make in the future?
In the future, I would add more automated tests, improve API
documentation, strengthen authentication and authorization, and improve
error monitoring. I would also consider adding more advanced task
management features and preparing the application for production
deployment. These improvements would make the API more reliable, secure,
and easier to maintain.


## 8. Reflection Questions

### 1. What was the most challenging part of building this boilerplate? How did you overcome it?

The most challenging part was organizing the project structure and making sure all components worked together properly, especially TypeORM, database migrations, middleware, validation, and centralized error handling. I overcame this by following the project requirements step by step, understanding the purpose of each file, testing the endpoints, and fixing errors as they appeared.

### 2. How does this boilerplate differ from your Midterm project? What specific improvements did you make?

Compared to my Midterm project, this boilerplate has a more organized and scalable structure. I added centralized error handling, Joi request validation, Winston structured logging, environment configuration, database migrations, reusable middleware, and improved API organization. These improvements make the application easier to maintain, debug, and expand.

### 3. Why is centralized error handling better than try-catch in every controller?

Centralized error handling reduces repetitive code because controllers do not need to handle every error individually. It provides consistent error responses, makes debugging easier, and keeps controllers clean and focused on business logic.

### 4. How does request validation with Joi improve security and code quality?

Joi validates incoming request data before it reaches the application logic. It helps prevent invalid or unexpected data, reduces potential errors, and ensures that required fields and data formats follow the expected rules. It also makes the code more reliable and easier to maintain.

### 5. What's the difference between synchronize: true and migrations? Why are migrations essential for production?

`synchronize: true` automatically updates database tables based on entity changes. However, it can cause unexpected database changes or data loss.

Migrations provide controlled and versioned database schema changes. They are essential in production because they allow developers to track, apply, and reverse database changes safely and consistently across different environments.

### 6. How does structured logging (Winston) help in production debugging compared to console.log?

Winston provides structured and organized logs with timestamps, severity levels, and different output files. Unlike `console.log`, it allows developers to separate errors from regular application activity, making it easier to monitor the application and investigate problems in production.

### 7. If you had to add a new feature (e.g., Product CRUD), how would you use this boilerplate? What would you need to add?

I would follow the existing project structure and use the current implementation as a reference. I would add a Product entity, create a database migration, implement a Product controller and routes, add Joi validation schemas, and register the routes in the main application. I would also add the necessary CRUD operations and test each endpoint to make sure everything works correctly.

### 8. What additional features would you add to make this boilerplate even more production-ready?

I would add automated testing using Jest, API documentation using Swagger, role-based access control, refresh token authentication, rate limiting, Docker support, and CI/CD integration. These features would improve security, reliability, scalability, and deployment efficiency.

# Professional Boilerplate API

A professional RESTful API built with **Node.js, Express, TypeScript, TypeORM, and MySQL**, featuring JWT-based authentication, password hashing, request validation, centralized error handling, structured logging, and database migrations.

This project provides a reusable backend foundation with secure authentication and organized API architecture.

---

## 1. Project Description

The Professional Boilerplate API is designed to provide a structured and reusable backend system for building web applications.

### Key Features

- Node.js and Express REST API
- TypeScript for type safety
- MySQL database integration
- TypeORM for database management
- JWT-based user authentication
- Password hashing using bcrypt
- Protected API routes using authentication middleware
- Joi request validation
- Centralized error handling
- Structured logging using Winston
- Database migrations and seeders
- Environment variable configuration
- Pagination support for user records

---

## 2. Authentication Flow

This project uses JSON Web Tokens (JWT) to authenticate users.

The authentication process follows these steps:

1. The user submits their email and password through the login endpoint.
2. The server searches for the user in the database.
3. The server checks whether the account is active.
4. bcrypt compares the submitted password with the stored hashed password.
5. If the credentials are correct, the server generates a JWT token.
6. The server returns the token and user information.
7. The client stores the token and includes it in subsequent protected requests.
8. The authentication middleware verifies the token.
9. If the token is valid, the middleware attaches the user's information to the request.
10. The request continues to the protected controller.

### Authentication Flow Diagram

```text
Client
  |
  v
POST /api/auth/login
  |
  v
Validate Email and Password
  |
  v
Find User in Database
  |
  v
Compare Password using bcrypt
  |
  v
Generate JWT Token
  |
  v
Return Token to Client
  |
  v
Client Sends Bearer Token
  |
  v
Authentication Middleware
  |
  v
Verify JWT Token
  |
  v
Attach User Information
  |
  v
Access Protected Endpoint
```

---

## 3. How to Get an Authentication Token

Users must log in to receive a JWT token.

### Login Endpoint

**POST** `/api/auth/login`

Request Body:

```json
{
    "email": "test@example.com",
    "password": "Test123!"
}
```

Successful Response:

```json
{
    "success": true,
    "message": "Login successful",
    "data": {
        "token": "YOUR_JWT_TOKEN",
        "user": {
            "id": 2,
            "email": "test@example.com",
            "name": "Test User"
        }
    }
}
```

Copy the `token` value from the response.

### Seeded Test Accounts

| Name | Email | Password |
|---|---|---|
| Admin User | admin@example.com | Admin123! |
| Test User | test@example.com | Test123! |

These are development seed credentials only. Do not use them in production.

---

## 4. How to Use the JWT Token

Protected endpoints require a valid JWT token.

In Postman:

1. Open the request.
2. Select the Authorization tab.
3. Choose Bearer Token.
4. Paste your JWT token.
5. Click Send.

Alternatively, include the following HTTP header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

### Example Protected Request

```http
GET /api/users
Authorization: Bearer YOUR_JWT_TOKEN
```

If the token is valid, the server processes the request.

If no token is provided, the server returns:

```json
{
    "success": false,
    "error": {
        "code": "UNAUTHORIZED",
        "message": "No token provided"
    }
}
```

---

## 5. Public vs. Protected Endpoints

### Public Endpoints

These endpoints do not require authentication.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | Authenticate a user and generate a JWT token |
| GET | `/health` | Check API health |

### Protected Endpoints

These endpoints require a valid JWT token.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/auth/me` | Get the currently authenticated user |
| GET | `/api/users` | Retrieve all users with pagination |
| GET | `/api/users/:id` | Retrieve a specific user |
| POST | `/api/users` | Create a new user |
| PUT | `/api/users/:id` | Update a user |
| DELETE | `/api/users/:id` | Delete a user |

All routes registered in `userRoutes` are protected using `authMiddleware`.

---

# 6. Reflection Questions and Answers

### 1. What is the difference between authentication and authorization? Give a real-world example of each.

Authentication is the process of verifying someone's identity. It answers the question, "Who are you?"

Authorization determines what an authenticated user is allowed to access or perform. It answers the question, "What are you allowed to do?"

For example, when logging into an online banking application, entering the correct username and password is authentication. Being allowed to view your own account but not another person's account is authorization.

### 2. Why is JWT considered stateless and how does that benefit scalability?

JWT is considered stateless because the server does not need to maintain a session record for every authenticated user.

The token contains the necessary information for authentication, and the server verifies its signature whenever a protected request is received.

This benefits scalability because multiple server instances can independently validate tokens without sharing session storage. It makes it easier to distribute requests across multiple servers.

### 3. What are the three parts of a JWT token and what does each part do?

A JWT consists of three parts separated by periods.

1. **Header** - Contains information about the token type and signing algorithm.
2. **Payload** - Contains claims or information about the user, such as user ID and email.
3. **Signature** - Verifies that the token has not been modified and was signed using the correct secret.

These three parts are encoded and combined to form the JWT.

### 4. Why should you never put sensitive data like passwords in the JWT payload?

JWT payloads are encoded, not encrypted by default. This means anyone who obtains the token can decode and read its payload.

Putting passwords, credit card information, or other sensitive data inside the payload could expose private information.

Only necessary information, such as a user ID and email, should be included.

### 5. How does bcrypt protect user passwords? What is the purpose of the salt and rounds?

bcrypt protects passwords by hashing them before storing them in the database.

Instead of saving the original password, the application saves its hashed version.

A salt is a random value added during hashing to ensure that identical passwords produce different hashes.

Rounds determine the computational cost of the hashing


1. Email verification: Confirms the user owns the email address. It helps prevent fake accounts, mistyped emails, and unauthorized use of someone else’s email.

2. Always return success: The forgot-password endpoint gives the same response whether or not the email exists. This prevents attackers from discovering registered accounts.

3. Verification vs. reset token: A verification token confirms email ownership and usually lasts 24 hours. A reset token allows password changes and usually lasts 1 hour because it grants access to a sensitive account action.

4. crypto.randomBytes(32): It generates cryptographically secure random data that is difficult to predict. Math.random() and Date.now() are not suitable for secure tokens because their values may be predictable.

5. User never verifies: The account remains unverified, and login is blocked. The user can request another verification email. The system could also delete old unverified accounts after a set period.

6. Clearing tokens after use: Prevents a token from being reused. This reduces the risk of someone using a previously valid link to verify an account or reset its password again.

7. Email enumeration: It is when someone tries to discover which email addresses have accounts in a system. Returning the same response for existing and non-existing emails prevents the forgot-password endpoint from revealing that information.

8. Adding 2FA: I would require users to verify their email and enroll a second factor, such as an authenticator app. After entering their password, they would also enter a time-based code. I would protect recovery codes, rate-limit attempts, and provide a secure recovery process.

9. Ethereal vs. SendGrid: Ethereal is useful for development because it captures test emails without delivering them to real inboxes. SendGrid is designed for production delivery and provides sending infrastructure and delivery monitoring, but requires configuration and may have costs or sending limits.

10. Emails marked as spam: I would check the email content and sending logs, configure SPF, DKIM, and DMARC, and use a verified sending domain. I would also monitor bounce and spam-complaint rates, avoid sending unnecessary emails, and provide a way to request a new verification or reset email.