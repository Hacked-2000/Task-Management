# Task Management Application

A full-stack web application for managing tasks with user authentication, built with React.js, Node.js, Express.js, TypeScript, and MongoDB.

## Project Overview

This application allows users to register, login, and manage their personal tasks. Users can create, read, update, and delete tasks, mark them as completed or pending, filter by status, and search through their tasks. The application features a modern, responsive UI and secure JWT-based authentication.

## Tech Stack

### Frontend
- **Framework**: React 19.2.6
- **Build Tool**: Vite 8.0.12
- **UI Library**: Material-UI (MUI)
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Notifications**: React Toastify

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi
- **Password Hashing**: bcryptjs

## Features

### User Management
- User registration with validation
- User login with JWT authentication
- Protected routes and API endpoints
- Session management
- User profile access

### Task Management
- Create tasks with title and description
- View all tasks with pagination
- Update task details and status
- Delete tasks
- Mark tasks as completed/pending
- Filter tasks by status (All, Pending, Completed)
- Search tasks by title or description
- Task statistics dashboard

### UI/UX
- Responsive design for mobile and desktop
- Modern gradient-based design
- Real-time form validation
- Toast notifications
- Loading states
- Empty states
- Confirmation dialogs

## Project Structure

```
Assignment3/
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   └── taskController.ts
│   │   ├── interfaces/
│   │   │   ├── user.interface.ts
│   │   │   └── task.interface.ts
│   │   ├── middlewares/
│   │   │   ├── auth.ts
│   │   │   ├── errorMiddleware.ts
│   │   │   └── validate.ts
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   └── Task.ts
│   │   ├── routes/
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   ├── customValidation.ts
│   │   │   ├── errorHandler.ts
│   │   │   └── jwt.ts
│   │   └── server.ts
│   ├── .env
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
└── Task-Management/
    ├── src/
    │   ├── assets/
    │   │   └── common.css
    │   ├── componnets/
    │   │   ├── PrivateRoute.jsx
    │   │   ├── TaskCard.jsx
    │   │   └── TaskModal.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   └── Dashboard.jsx
    │   ├── services/
    │   │   ├── authService.js
    │   │   └── taskService.js
    │   ├── store/
    │   │   ├── store.js
    │   │   └── reducers/
    │   │       ├── authSlice.js
    │   │       └── taskSlice.js
    │   ├── utils/
    │   │   ├── apiEndpoints.js
    │   │   ├── makeApiRequest.js
    │   │   └── toast.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    ├── vite.config.js
    └── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the Backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the Backend directory:
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

5. Run the backend server:
```bash
npm run dev
```

The backend will run on http://localhost:5000

### Frontend Setup

1. Navigate to the Task-Management directory:
```bash
cd Task-Management
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on http://localhost:5173

### Access the Application

1. Open your browser and navigate to http://localhost:5173
2. Register a new account or login
3. Start managing your tasks!

## API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Body: { name, email, password }
Response: { success, message, data: { token, user } }
```

#### Login User
```
POST /api/auth/login
Body: { email, password }
Response: { success, message, data: { token, user } }
```

#### Get Profile
```
GET /api/auth/profile
Headers: { Authorization: Bearer <token> }
Response: { success, message, data: { user } }
```

### Task Endpoints

#### Create Task
```
POST /api/tasks
Headers: { Authorization: Bearer <token> }
Body: { title, description, status }
Response: { success, message, data: { task } }
```

#### Get All Tasks
```
GET /api/tasks?status=all&page=1&limit=10&search=keyword
Headers: { Authorization: Bearer <token> }
Response: { success, message, data: { tasks, pagination } }
```

#### Get Task Stats
```
GET /api/tasks/stats
Headers: { Authorization: Bearer <token> }
Response: { success, message, data: { stats } }
```

#### Get Single Task
```
GET /api/tasks/:id
Headers: { Authorization: Bearer <token> }
Response: { success, message, data: { task } }
```

#### Update Task
```
PUT /api/tasks/:id
Headers: { Authorization: Bearer <token> }
Body: { title, description, status }
Response: { success, message, data: { task } }
```

#### Delete Task
```
DELETE /api/tasks/:id
Headers: { Authorization: Bearer <token> }
Response: { success, message }
```

## Database Schema

### User Collection
```javascript
{
  name: String (required, 2-50 chars),
  email: String (required, unique, valid email),
  password: String (required, hashed, min 6 chars),
  role: String (enum: ['user', 'admin'], default: 'user'),
  createdAt: Date,
  updatedAt: Date
}
```

### Task Collection
```javascript
{
  title: String (required, 3-100 chars),
  description: String (required, 5-500 chars),
  status: String (enum: ['pending', 'completed'], default: 'pending'),
  userId: String (required, ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

## Security Features

- Password hashing with bcrypt (10 rounds)
- JWT token authentication
- Protected API routes
- Input validation with Joi
- Error handling middleware
- CORS enabled
- MongoDB injection prevention
- XSS protection

## Validation Rules

### User Registration
- Name: 2-50 characters, required
- Email: Valid email format, required, unique
- Password: Minimum 6 characters, required

### Task Creation/Update
- Title: 3-100 characters, required
- Description: 5-500 characters, required
- Status: 'pending' or 'completed'

## Error Handling

The application includes comprehensive error handling:
- Validation errors (400)
- Authentication errors (401)
- Authorization errors (403)
- Resource not found (404)
- Duplicate entry errors (400)
- Server errors (500)

All errors return a consistent format:
```javascript
{
  success: false,
  message: "Error message"
}
```

## Testing the Application

### Manual Testing Steps

1. **Registration**
   - Navigate to /register
   - Fill in name, email, and password
   - Submit the form
   - Verify redirect to dashboard

2. **Login**
   - Navigate to /login
   - Enter email and password
   - Submit the form
   - Verify redirect to dashboard

3. **Create Task**
   - Click "New Task" button
   - Fill in title and description
   - Select status
   - Submit the form
   - Verify task appears in the list

4. **Update Task**
   - Click edit icon on a task
   - Modify title, description, or status
   - Submit the form
   - Verify changes are reflected

5. **Delete Task**
   - Click delete icon on a task
   - Confirm deletion
   - Verify task is removed

6. **Filter Tasks**
   - Click on filter chips (All, Pending, Completed)
   - Verify filtered results

7. **Search Tasks**
   - Enter search query
   - Verify search results

8. **Pagination**
   - Create more than 10 tasks
   - Verify pagination controls appear
   - Navigate between pages

## Performance Considerations

- Database indexing on userId and status fields
- Pagination to limit data transfer
- Efficient Redux state updates
- Debounced search input
- Optimized re-renders
- Code splitting with React Router

## Assumptions

- MongoDB is running locally on default port 27017
- Users can only access their own tasks
- JWT tokens expire after 7 days
- Maximum 10 tasks per page
- Task status can only be 'pending' or 'completed'
- Internet connection is required
- Modern browser with ES6+ support

## Future Enhancements

- Role-based access control (admin panel)
- Task categories and tags
- Due dates and reminders
- Task priority levels
- File attachments
- Task sharing and collaboration
- Email notifications
- Dark mode
- Export tasks to CSV/PDF
- Mobile app (React Native)
- Real-time updates with WebSockets
- Task comments and activity log
- Advanced search and filters
- Task templates
- Recurring tasks

## Troubleshooting

### Backend Issues

1. **MongoDB connection failed**
   - Ensure MongoDB is running
   - Check MONGODB_URI in .env
   - Verify MongoDB port (default: 27017)

2. **Port already in use**
   - Change PORT in .env
   - Kill process using port 5000

### Frontend Issues

1. **Cannot connect to backend**
   - Ensure backend is running
   - Check BASE_URL in apiEndpoints.js
   - Verify CORS configuration

2. **Token expired**
   - Clear localStorage
   - Login again

### Common Issues

1. **Dependencies installation fails**
   - Delete node_modules and package-lock.json
   - Run `npm install` again
   - Clear npm cache: `npm cache clean --force`

2. **TypeScript errors in backend**
   - Run `npm run build` to check for errors
   - Ensure all types are properly defined

## Development Guidelines

- Follow NFC pattern in backend
- Use TypeScript for type safety
- Implement proper error handling
- Write clean, maintainable code
- Use meaningful variable names
- Keep functions small and focused
- Follow React best practices
- Maintain consistent code formatting
- Test on multiple screen sizes

## License

ISC

## Contact

For any questions or issues, please contact the development team.
