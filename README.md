# edumatch-Nigeria

Edumatch Nigeria

Overview

Edumatch Nigeria is a technology-driven educational platform designed to provide students with access to digital learning resources, exam preparation tools, and AI-powered career recommendations.

🚀 Features

User Authentication (Sign Up, Login, JWT-based Authorization)

Course Management System (CRUD operations for educational content)

Career Recommendation System (AI-powered career assessment and personalized suggestions)

Exam Preparation Tools (Past questions, quizzes, and interactive learning materials)

Progress Tracking & Notifications

Offline Content Management (Future feature for improved accessibility)

🛠️ Tech Stack

Frontend (Deployed on Vercel)

React.js

Tailwind CSS

Axios (for API requests)

Framer Motion (for animations)

Backend (Deployed on Render)

Node.js

Express.js

MongoDB Atlas (Database)

Mongoose (ODM)

JWT Authentication

Bcrypt.js (Password Hashing)

CORS

edumatch-Nigeria/
├── node_modules/
├── src/
│   ├── config/            # Configuration files (DB, dotenv, etc.)
│   ├── controllers/       # Route handlers
│   ├── middleware/        # Middleware functions
│   ├── models/            # Mongoose models
│   ├── routes/            # API route files
│   ├── services/          # Business logic services
│   ├── utils/             # Helper functions
│   ├── app.js             # Express app setup
│   ├── server.js          # Entry point
├── .env                   # Environment variables
├── package.json
├── README.md

🔧 Installation & Setup

Backend

Clone the repository

git clone https://github.com/Shyllon/edumatch-Nigeria.git
cd edumatch-Nigeria

Install dependencies

npm install

Create a .env file in the root directory and add:

MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key

Run the server

npm run dev

📡 API Endpoints

Authentication 
Method | Endpoint | Description

POST | /api/auth/register | User Registration

POST | /api/auth/login | User Login

POST | /api/auth/logout | User Logout

Course Management

Method | Endpoint | Description

GET | /api/courses | Get all courses

POST | /api/courses | Add a new course (Admin only)

GET | /api/courses/:id | Get a single course

PUT | /api/courses/:id | Update a course (Admin only)

DELETE | /api/courses/:id | Delete a course (Admin only)

Upcoming Features

Enhanced AI-powered Career Recommendations

Offline Content for Students with Low Internet Access

🤝 Contribution

We welcome contributions! Follow these steps:

Fork the repo

Create a new branch (feature-branch)

Commit changes (git commit -m "Added new feature")

Push to GitHub (git push origin feature-branch)

Create a Pull Request (PR)

📞 Contact

For inquiries or support, contact us at support@edumatch.ng.

🎉 Thank you for being part of the Edumatch Nigeria journey! 🚀

