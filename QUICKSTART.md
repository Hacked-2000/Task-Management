# Quick Start Guide

Get the Task Management Application running in 5 minutes!

## Prerequisites Check

```bash
node --version  # Should be v16 or higher
npm --version   # Should be 7 or higher
mongod --version  # MongoDB should be installed
```

## Step 1: Start MongoDB

```bash
mongod
```

Leave this terminal running.

## Step 2: Setup and Start Backend

Open a new terminal:

```bash
cd Backend
npm install
npm run dev
```

The backend will start on http://localhost:5000

## Step 3: Setup and Start Frontend

Open another new terminal:

```bash
cd Task-Management
npm install
npm run dev
```

The frontend will start on http://localhost:5173

## Step 4: Access the Application

1. Open your browser
2. Navigate to http://localhost:5173
3. Click "Sign Up" to create an account
4. Fill in your details and register
5. You'll be automatically logged in and redirected to the dashboard
6. Start creating tasks!

## Quick Test

1. **Register**: Create account with name, email, password
2. **Create Task**: Click "New Task" button
3. **Add Details**: Enter title and description
4. **Save**: Click "Create"
5. **Manage**: Edit, delete, or mark as complete

## Default Configuration

- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:5173
- **Database**: mongodb://localhost:27017/taskmanagement
- **JWT Expiry**: 7 days

## Troubleshooting

### MongoDB not starting?
```bash
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # macOS
```

### Port 5000 already in use?
Edit `Backend/.env` and change PORT to 5001

### Port 5173 already in use?
Vite will automatically use the next available port

### Cannot connect to backend?
- Check if backend is running on port 5000
- Check browser console for errors
- Verify `src/utils/apiEndpoints.js` has correct BASE_URL

## Next Steps

- Explore the dashboard
- Create multiple tasks
- Try filtering by status
- Use the search feature
- Test on mobile device

## Need Help?

Check the main README.md for detailed documentation.
