# Task Manager Project

A full-stack task manager application built using the MERN stack (MongoDB, Express, React, Node.js).

This project is designed to help teams manage their projects, track progress, and assign tasks to different people.

## Features

- User login and signup with JWT
- Admin and Member roles
- Create new projects (Admins only)
- Add tasks to projects and assign them to specific members
- Simple kanban board for To Do, In Progress, and Done tasks
- Dashboard to view task stats

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Framer Motion for simple animations
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas

## How to run it on a local machine

First, clone the repository and open the folder.

### Backend Setup

1. Open a terminal and go to the backend folder: `cd backend`
2. Run `npm install` to get all the packages
3. Create a `.env` file in the backend folder and add the database link:
   ```text
   MONGO_URI=your_mongo_url_here
   JWT_SECRET=put_any_secret_key_here
   ```
4. Run `npm run dev` to start the server

### Frontend Setup

1. Open a new terminal and go to the frontend folder: `cd frontend`
2. Run `npm install`
3. Create a `.env` file in the frontend folder and add the local api link:
   ```text
   VITE_API_BASE_URL=http://localhost:5001/api
   ```
4. Run `npm run dev` to start the website

## Deployment

Both the frontend and backend are deployed on Railway.
