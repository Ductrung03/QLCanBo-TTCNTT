# Faculty Management System

A full-stack application for managing faculty members at the Military Technical Academy, built with React, Vite, TailwindCSS, shadcn/ui, Express, and Sequelize.

## Setup Instructions

### Prerequisites
- Node.js (>=18.x)
- MySQL (>=8.x)
- Yarn or npm

### Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory with:
   ```
   DATABASE_URL=mysql://root:your_password@localhost:3306/QLcanbo
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```
4. Ensure MySQL is running and create the `QLcanbo` database:
   ```sql
   CREATE DATABASE QLcanbo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
5. Run the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

### Database Schema
The database schema is defined in the problem statement and automatically synced via Sequelize.

### Initial Roles
Create initial roles (e.g., 'admin', 'user') via the `/roles` endpoint or directly in the database.

## Usage
- Access the application at `http://localhost:5173`
- Login with user credentials
- Use the dashboard to navigate to user management
- Perform CRUD operations on users and assign roles

## Project Structure
- **client**: React frontend with Vite, TailwindCSS, and shadcn/ui
- **server**: Express backend with Sequelize for MySQL
- **Scalable structure**: Modular components, services, and controllers for easy extension

## Future Enhancements
- Add role-based UI restrictions
- Implement password reset
- Add audit logging
- Expand with additional entities (e.g., Departments, Courses)