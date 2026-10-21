# Campusly Mini School ERP

A small, interview-friendly School ERP for the take-home assignment. The frontend follows the provided school app reference with a soft blush background, rounded white cards, deep red actions, responsive navigation, attendance controls, and notice workflows.

## Features

- Admin and Teacher login roles
- Dashboard summary cards and attendance overview
- Student, teacher, and class management
- Attendance marking by class and date
- Notice drafts, review, publishing, and status filters
- Responsive layout for mobile, tablet, and desktop
- Demo data persists in the browser while the API is being configured

## Stack

React + Vite + Tailwind CSS on the frontend. Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, CORS, and dotenv on the backend.

## Folder structure

- `src/` - frontend screens and styles
- `backend/models/` - Mongoose models
- `backend/routes/` - API routes
- `backend/middleware/` - JWT protection and role checks
- `backend/server.js` - Express server and MongoDB connection

## Run locally

1. Install frontend packages from the project root.
2. Copy `frontend/.env.example` to the frontend environment file if you connect the browser to the API.
3. In `backend/`, run `npm install`.
4. Copy `backend/.env.example` to `backend/.env`.
5. Start the frontend with the existing Vite workflow and the API with `npm start` from `backend/`.

The browser demo can be explored immediately with the Admin or Teacher role buttons. It stores its sample records in local browser storage. The current UI is intentionally kept simple enough to explain in an interview; connecting its forms to the API is the next integration step.

## MongoDB Atlas setup

Paste the MongoDB Atlas connection string into `backend/.env` as `MONGODB_URI`. Replace the username, password, and database name in the Atlas-generated connection string. In Atlas, create a database user with read/write access and add your development IP address under Network Access. Never place this URI or the JWT secret in frontend variables or commit `backend/.env`.

Create the first administrator once with `POST /api/auth/setup-admin` using a JSON body containing `name`, `email`, and a password of at least eight characters. This route refuses to create a second admin.

## API routes

- `POST /api/auth/login`
- `POST /api/auth/setup-admin`
- `GET|POST|PUT|DELETE /api/students`
- `GET|POST|PUT|DELETE /api/teachers`
- `GET|POST|PUT|DELETE /api/classes`
- `GET /api/attendance`, `POST /api/attendance/bulk`
- `GET|POST|PUT|DELETE /api/notices`
- `GET /api/dashboard`

Protected routes use `Authorization: Bearer <token>`. Admins manage records and publish notices. Teachers can work with attendance for their assigned class and submit notices for review.

## Known limitations

The polished frontend currently uses browser storage so the assignment can be demonstrated without exposing database credentials. The Express API contains the MongoDB models and protected CRUD routes, but the frontend does not yet switch between browser storage and API calls automatically. Attendance summaries are intentionally basic, and a production deployment would add stronger validation, pagination, audit logs, and password reset flows.
