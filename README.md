# Express Auth System

A full-stack authentication system I'm building with **Express.js** and **Next.js**.

The goal of this project is to understand authentication beyond just creating a login form. I'm building the backend API, implementing the authentication logic, and connecting it to a separate frontend application.

## What I've built
* Signup API for creating user account
* Signin API for login
* Middleware to authenticate users for protected routes
* CRUD too get and create, users and projects.
* Sign out for ending user session

### Backend

The Express backend currently supports:

* User sign up
* User sign in
* User sign out
* Getting authenticated user data
* Password hashing
* Token generation
* Token verification
* Authentication middleware
* Protected routes

### Frontend

The Next.js frontend is being built to consume the Express API and handle the authentication flow from the client side.

## Tech Stack

**Frontend**

Next.js, React, TypeScript, Tailwind CSS

**Backend**

Node.js, Express.js, TypeScript

## Running the project

The frontend and backend are separate applications inside the same repository.

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

You'll need to create the required `.env` files for the backend and frontend before running the applications.

## Current Progress

The authentication API has been built and is currently being integrated with the Next.js frontend.

I'm using this project to learn more about:

* Authentication architecture
* API design
* Password security
* Token-based authentication
* Middleware
* Protected routes
* Frontend and backend communication
* Handling authentication state
* Deployment

## What's next

The next stage is to complete the frontend authentication flow and then improve the system with additional authentication and security features.

## Author

**Abdulganiy Ibrahim**

Full Stack Developer
