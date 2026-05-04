# 🌊 Flow - Premium Task Management

![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge&logo=mongodb)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

**Flow** is a modern, full-stack task management application designed to help teams organize workflows and achieve their goals faster. It features a state-of-the-art **Glassmorphic UI**, role-based access control, and an intuitive drag-and-drop-style Kanban board.

---

## ✨ Key Features

- **Premium Glassmorphic Design:** A stunning, modern interface featuring translucent panels, mesh gradients, and buttery-smooth animations powered by Framer Motion.
- **Role-Based Access Control (RBAC):**
  - **Admins:** Can create new projects, assign tasks, and oversee team progress.
  - **Members:** Can view project boards, update task statuses, and focus on their assigned work.
- **Dynamic Dashboard:** Get a bird's-eye view of your productivity with beautifully designed stat cards and recent activity logs.
- **Interactive Kanban Boards:** Organize project tasks into "To Do", "In Progress", and "Done" columns.
- **Secure Authentication:** Robust JWT-based authentication system to keep your data safe.

---

## 🛠️ Tech Stack

### Frontend
- **React (Vite):** Lightning-fast development server and optimized builds.
- **Tailwind CSS:** For rapid, custom UI styling and the signature glass effect.
- **Framer Motion:** Delivering elegant micro-interactions and page transitions.
- **Lucide React:** Clean, consistent, and beautiful iconography.

### Backend
- **Node.js & Express:** Scalable server architecture.
- **MongoDB & Mongoose:** Flexible NoSQL database for projects, tasks, and users.
- **JSON Web Tokens (JWT):** Secure stateless authentication.

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local installation or MongoDB Atlas cluster)

### 1. Backend Setup

Open your terminal and navigate to the `backend` directory:

```bash
cd backend
npm install
```

Create a `.env` file in the root of the `backend` directory and configure your environment variables:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

Start the backend development server:

```bash
npm run dev
```

### 2. Frontend Setup

Open a new terminal window and navigate to the `frontend` directory:

```bash
cd frontend
npm install
```

Create a `.env` file in the root of the `frontend` directory to link it to your backend:

```env
VITE_API_BASE_URL=http://localhost:5001/api
```

Start the Vite development server:

```bash
npm run dev
```

Your application will now be running at `http://localhost:5173`!


