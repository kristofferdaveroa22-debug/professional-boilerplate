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