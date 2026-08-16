# Student List Management System

A full-stack Student List Management System built using the MERN stack. This project allows users to add, view, update, and delete student records, 
along with uploading and managing student photos.

## 🚀 Live Demo

**Frontend:**
https://student-list-proj1.vercel.app

**Backend API:**
https://student-list-backend-q22d.onrender.com

## 🛠️ Technologies Used

### Frontend

* React
* React Router
* Vite
* CSS
* Cloudinary image upload

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Cloudinary

### Deployment

* Vercel — Frontend
* Render — Backend
* MongoDB Atlas — Database
* Cloudinary — Image storage

## ✨ Features

* Add new students
* View student details
* Update student information
* Delete student records
* Upload student photos
* Replace student photos
* Automatically remove old photos from Cloudinary when replaced
* Delete student data from MongoDB
* Delete associated photos from Cloudinary
* Form validation
* Responsive user interface
* Student information organized into a clean layout

## 📋 Student Information

The application can store information such as:

* Registration Number
* Name
* Branch
* Date of Birth
* Gender
* Blood Group
* Grade
* Section
* CGPA
* Father Name
* Mother Name
* Phone
* Email
* Address
* Student Photo

## 📁 Project Structure

```text
student-list-proj1/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 🔄 How It Works

The React frontend communicates with the Express backend through REST API endpoints.

The backend handles student data and communicates with MongoDB Atlas for database operations.

Student photos are uploaded to Cloudinary, while the photo URL and public ID are stored with the student's database record.

```text
React Frontend
      ↓
Express / Node.js API
      ↓
MongoDB Atlas

React Frontend
      ↓
Cloudinary
      ↓
Student Photos
```

## 🔐 Environment Variables

Environment variables are used for sensitive configuration such as database credentials and Cloudinary credentials.

Sensitive `.env` files are excluded from the Git repository using `.gitignore`.

## 🎯 What I Learned

This project helped me understand how the different parts of a MERN application work together.

I gained practical experience with:

* Building REST APIs
* CRUD operations
* Connecting Node.js and Express with MongoDB
* Working with MongoDB Atlas
* Uploading and managing images with Cloudinary
* Connecting a React frontend to a backend API
* Handling forms and API requests
* Managing application state in React
* Deploying a frontend with Vercel
* Deploying a backend with Render
* Using Git and GitHub to manage and publish a project

## 👨‍💻 Project

This project was developed as an independent continuation and improvement of a MERN-based student management project.

I continued developing and refining the application after completing a MERN workshop to gain more practical experience with full-stack development.
