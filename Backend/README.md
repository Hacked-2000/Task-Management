# Task Management Backend API

A RESTful API built with Node.js, Express.js, TypeScript, and MongoDB for managing tasks with user authentication.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: express-validator
- **Password Hashing**: bcryptjs

## Features

- User registration and login with JWT authentication
- Protected routes with middleware
- CRUD operations for tasks
- Task filtering by status (all, pending, completed)
- Search functionality for tasks
- Pagination support
- Task statistics
- Role-based access control ready
- Comprehensive error handling
- Input validation

## Project Structure

```
Backend/
├── src/
│   ├── config/
│   │   └── database.ts
│   ├── controllers/
│   │   ├── authController.ts
│   │   └── taskController.ts
│   ├── interfaces/
│   │   ├── user.interface.ts
│   │   └── task.interface.ts
│   ├── middlewares/
│   │   ├── auth.ts
│   │   └── errorMiddleware.ts
│   ├── models/
│   │   ├── User.ts
│   │   └── Task.ts
│   ├── routes/
│   │   └── index.ts
│   ├── utils/
│   │   ├── customValidation.ts
│   │   ├── errorHandler.ts
│   │   └── jwt.ts
│   └── server.ts
├── .env
├── .gitignore
├── nodemon.json
├── package.json
└── tsconfig.json
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Navigate to the Backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the root directory with:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanagement
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

4. Start MongoDB:
```bash
mongod
```

5. Run the development server:
```bash
npm run dev
```

6. For production build:
```bash
npm run build
npm start
```

## API Endpoints

### Authentication

#### Register User
- **POST** `/api/auth/register`
- **Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
- **POST** `/api/auth/login`
- **Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Profile
- **GET** `/api/auth/profile`
- **Headers**: `Authorization: Bearer <token>`

### Tasks

#### Create Task
- **POST** `/api/tasks`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
```json
{
  "title": "Complete project",
  "description": "Finish the task management app",
  "status": "pending"
}
```

#### Get All Tasks
- **GET** `/api/tasks?status=all&page=1&limit=10&search=keyword`
- **Headers**: `Authorization: Bearer <token>`
- **Query Parameters**:
  - `status`: all | pending | completed (default: all)
  - `page`: page number (default: 1)
  - `limit`: items per page (default: 10)
  - `search`: search keyword (optional)

#### Get Task Stats
- **GET** `/api/tasks/stats`
- **Headers**: `Authorization: Bearer <token>`

#### Get Single Task
- **GET** `/api/tasks/:id`
- **Headers**: `Authorization: Bearer <token>`

#### Update Task
- **PUT** `/api/tasks/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "completed"
}
```

#### Delete Task
- **DELETE** `/api/tasks/:id`
- **Headers**: `Authorization: Bearer <token>`

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message"
}
```

## Validation Rules

### User Registration
- Name: 2-50 characters
- Email: Valid email format
- Password: Minimum 6 characters

### Task Creation/Update
- Title: 3-100 characters
- Description: 5-500 characters
- Status: pending or completed

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes
- Input validation and sanitization
- Error handling middleware
- CORS enabled

## Database Schema

### User Model
```typescript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (user/admin),
  createdAt: Date,
  updatedAt: Date
}
```

### Task Model
```typescript
{
  title: String,
  description: String,
  status: String (pending/completed),
  userId: String (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

## Assumptions

- MongoDB is running locally on default port 27017
- Users can only access their own tasks
- Default user role is 'user'
- JWT tokens expire after 7 days
- Pagination defaults to 10 items per page
- Task status can only be 'pending' or 'completed'

## Error Handling

The API includes comprehensive error handling for:
- Validation errors
- Authentication errors
- Database errors
- Resource not found errors
- Duplicate entry errors
- Server errors

## Development

- TypeScript for type safety
- Nodemon for auto-restart during development
- ESLint ready for code quality
- Modular architecture following NFC pattern
- Separation of concerns (routes, controllers, models, services)
