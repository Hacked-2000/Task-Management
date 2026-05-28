# Task Management Frontend

A modern, responsive React application for managing tasks with user authentication, built with Material-UI and Redux.

## Tech Stack

- **Framework**: React 19.2.6
- **Build Tool**: Vite 8.0.12
- **UI Library**: Material-UI (MUI)
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Notifications**: React Toastify

## Features

- User registration and login
- JWT-based authentication
- Dashboard with task statistics
- Create, read, update, and delete tasks
- Mark tasks as completed/pending
- Filter tasks by status (All, Pending, Completed)
- Search functionality
- Pagination support
- Responsive design for mobile and desktop
- Form validation
- Toast notifications
- Protected routes

## Project Structure

```
Task-Management/
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
├── index.html
├── package.json
└── vite.config.js
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running on http://localhost:5000

### Installation

1. Navigate to the Task-Management directory:
```bash
cd Task-Management
```

2. Install dependencies:
```bash
npm install
```

3. Configure API endpoint (if different from default):
Edit `src/utils/apiEndpoints.js` and update the `BASE_URL`:
```javascript
const BASE_URL = "http://localhost:5000/api";
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to:
```
http://localhost:5173
```

6. For production build:
```bash
npm run build
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features Breakdown

### Authentication

#### Registration
- Name validation (2-50 characters)
- Email validation
- Password validation (minimum 6 characters)
- Automatic login after registration
- Redirect to dashboard

#### Login
- Email and password authentication
- JWT token storage in localStorage
- Protected route redirection
- Session management

### Dashboard

#### Task Statistics
- Total tasks count
- Completed tasks count
- Pending tasks count
- Real-time updates

#### Task Management
- Create new tasks with title and description
- Edit existing tasks
- Delete tasks with confirmation
- Toggle task status (pending/completed)
- View task creation date

#### Filtering & Search
- Filter by All, Pending, or Completed
- Search tasks by title or description
- Real-time search results
- Pagination for large datasets

### UI/UX Features

- Responsive design for all screen sizes
- Material-UI components for consistent design
- Gradient backgrounds and modern styling
- Loading states and spinners
- Toast notifications for user feedback
- Form validation with error messages
- Confirmation dialogs for destructive actions
- Empty states with helpful messages

## API Integration

The application uses a centralized API handling approach:

### API Endpoints Configuration
Located in `src/utils/apiEndpoints.js`:
- Centralized endpoint management
- Easy environment switching
- Type-safe endpoint functions

### API Request Handler
Located in `src/utils/makeApiRequest.js`:
- Axios-based HTTP client
- Automatic token injection
- Global loading state management
- Error handling and user feedback
- Session expiration handling
- 401/403/429 status code handling

### Service Layer
Services abstract API calls:
- `authService.js` - Authentication operations
- `taskService.js` - Task CRUD operations

Example usage:
```javascript
import { loginApi } from '../services/authService';

const response = await loginApi(credentials, dispatch);
if (response?.success) {
  // Handle success
}
```

## State Management

### Redux Store Structure

#### Auth Slice
```javascript
{
  user: null | Object,
  token: null | string,
  isAuthenticated: boolean,
  loading: boolean
}
```

#### Task Slice
```javascript
{
  tasks: Array,
  stats: { total, completed, pending },
  pagination: { total, page, pages },
  loading: boolean,
  filter: 'all' | 'pending' | 'completed',
  searchQuery: string
}
```

## Form Validation

### Registration
- Name: 2-50 characters, required
- Email: Valid email format, required
- Password: Minimum 6 characters, required

### Login
- Email: Valid email format, required
- Password: Required

### Task Creation/Update
- Title: 3-100 characters, required
- Description: 5-500 characters, required
- Status: pending or completed

## Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

Mobile optimizations:
- Stacked layouts
- Full-width components
- Touch-friendly buttons
- Optimized navigation

## Security Features

- JWT token authentication
- Protected routes
- Automatic session expiration handling
- Token stored in localStorage
- Authorization header injection
- XSS protection through React

## Error Handling

- Network error handling
- API error responses
- Form validation errors
- User-friendly error messages
- Toast notifications for errors
- Session expiration alerts

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Code splitting with React Router
- Lazy loading of components
- Optimized re-renders with Redux
- Debounced search input
- Pagination for large datasets
- Efficient state updates

## Assumptions

- Backend API is running on http://localhost:5000
- JWT tokens are valid for 7 days
- Users can only access their own tasks
- Maximum 10 tasks per page
- Search is case-insensitive
- Task status can only be 'pending' or 'completed'
- Internet connection is required
- Modern browser with ES6+ support

## Future Enhancements

- Dark mode toggle
- Task categories/tags
- Due dates for tasks
- Task priority levels
- Drag and drop task reordering
- Bulk task operations
- Export tasks to CSV/PDF
- Task sharing between users
- Email notifications
- Progressive Web App (PWA) support

## Troubleshooting

### Common Issues

1. **Cannot connect to backend**
   - Ensure backend is running on port 5000
   - Check CORS configuration in backend
   - Verify BASE_URL in apiEndpoints.js

2. **Token expired errors**
   - Clear localStorage and login again
   - Check JWT_EXPIRE setting in backend

3. **Build errors**
   - Delete node_modules and package-lock.json
   - Run `npm install` again
   - Clear npm cache: `npm cache clean --force`

## Development Guidelines

- Follow React best practices
- Use functional components and hooks
- Maintain consistent code formatting
- Keep components small and focused
- Use meaningful variable names
- Add comments for complex logic
- Test on multiple screen sizes
- Handle loading and error states

## License

ISC
