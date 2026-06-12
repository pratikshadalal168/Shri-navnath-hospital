# CarePoint Hospital Management System

A modern, full-stack hospital management web application built with React, Node.js, Express, and MongoDB.

## Features

### 1. Public Website
- **Professional Hero Section** with call-to-action.
- **Detailed About Us** page describing mission, vision, and history.
- **Service Departments** (Cardiology, Neurology, etc.) with detailed descriptions.
- **Doctor's Directory** with search and filter capabilities.
- **Responsive Footer** with contact and social links.
- **Contact Us** page with integrated contact form.

### 2. Appointment System
- **Advanced Booking Form** with validation (Zod + React Hook Form).
- **Patient Details**: Name, Age, Gender, Phone, Symptoms.
- **Doctor Availability**: Select department and linked doctor.
- **Success Feedback**: Visual confirmation after booking.

### 3. Admin Panel
- **Secure Login**: JWT-based authentication.
- **Comprehensive Dashboard**: Real-time stats (Total Doctors, Appointments, etc.).
- **Appointment Management**: Approve, Reject, or Delete appointment requests.
- **Doctor Management**: Add, Edit, or Remove doctors.
- **Department Management**: Configure hospital departments.

## Tech Stack
- **Frontend**: React 18, Tailwind CSS 4.0, Motion, Lucide Icons, React Router 7.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose ORM).
- **Security**: JWT (Json Web Token), Bcrypt.js password hashing.
- **Form Handling**: React Hook Form, Zod validation.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root and add the following:
```env
MONGODB_URI="your_mongodb_atlas_uri_here"
JWT_SECRET="your_secure_random_secret_key"
```

### 3. Run the Application (Development)
```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

### 4. Seed Admin Account
To access the admin dashboard initially, navigate to `/admin/login` and click the **"Seed Admin User"** button. 
- **Default Username**: `admin`
- **Default Password**: `admin123`

### 5. Production Build
```bash
npm run build
npm start
```

## Folder Structure
- `/server.ts` - Main entry point (Express + Vite adapter).
- `/src/server/` - Backend API routes, models, and middleware.
- `/src/pages/` - React frontend pages.
- `/src/components/` - Reusable UI components.
- `/src/context/` - Auth and global state.
- `/src/lib/` - Utility functions.

---

*Developed with Care for Healthcare Excellence.*
