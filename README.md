# <p align="center">ChatNotes-Realtime Chat Application with Note Taking</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"></a>
  <a href="#"><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"></a>
  <a href="#"><img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"></a>
  <a href="#"><img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"></a>
  <a href="#"><img src="https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=socket.io&logoColor=white" alt="Socket.io"></a>
  <a href="#"><img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"></a>
  <a href="#"><img src="https://img.shields.io/badge/Zustand-1B1B1F?style=for-the-badge&logo=zustand&logoColor=F7DF1E" alt="Zustand"></a>
</p>

## Introduction

This project is a full-stack real-time chat application with integrated note-taking functionality. It allows users to communicate with each other in real-time, manage their profiles, and create/organize notes, even generating notes based on previous conversations using AI. Designed for developers and end-users alike, this application showcases modern web development practices and technologies.

## Table of Contents

1.  [Key Features](#key-features)
2.  [Installation Guide](#installation-guide)
3.  [Usage](#usage)
4.  [Environment Variables](#environment-variables)
5.  [Project Structure](#project-structure)
6.  [Technologies Used](#technologies-used)
7.  [License](#license)

## Key Features

*   **Real-time Chat:** Send and receive messages instantly using Socket.IO.
*   **User Authentication:** Secure user registration, login, and profile management with JWT.
*   **Note-Taking:** Create, edit, delete, and categorize notes.
*   **AI Note Generation:** Automatically generate notes from chat history using an AI model (Gemini).
*   **Profile Management:** Update profile information, including avatar and personal details.
*   **Responsive UI:** Modern and responsive user interface built with React and Tailwind CSS.
*   **State Management:** Efficient state management using Zustand.
*   **Search Functionality:** Implements a search feature for users and notes.
*   **Theme Customization:** Toggle between light and dark themes.

## Installation Guide

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  **Install backend dependencies:**

    ```bash
    cd backend
    npm install
    ```

3.  **Install frontend dependencies:**

    ```bash
    cd ../frontend
    npm install
    ```

4.  **Create `.env` files in both `backend` and `frontend` directories.**

5.  **Backend `.env` configuration:**

    ```
    PORT=5000
    MONGO_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret>
    CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
    CLOUDINARY_API_KEY=<your_cloudinary_api_key>
    CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
    GEMINI_API_KEY=<your_gemini_api_key> #Google Gemini API Key
    ```

6.  **Frontend `.env` configuration:**

    ```
    VITE_BACKEND_URL=http://localhost:5000 # Or your deployed backend URL
    ```

7.  **Run the backend server:**

    ```bash
    cd ../backend
    npm run dev
    ```

8.  **Run the frontend application:**

    ```bash
    cd ../frontend
    npm run dev
    ```

## Usage

1.  Open your browser and navigate to the frontend URL (usually `http://localhost:5173`).
2.  Create a new account or log in with existing credentials.
3.  Start chatting with other users by selecting them from the sidebar.
4.  Create and manage notes in the notes section.
5.  Customize your profile and application settings in the settings and profile pages.
6.  Use the AI note generation feature to create summarized notes from chat histories.

## Environment Variables

*   **Backend:**
    *   `PORT`: The port on which the backend server will run (default: 5000).
    *   `MONGO_URI`: The MongoDB connection string.
    *   `JWT_SECRET`: Secret key used to sign JWT tokens.
    *   `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`: Cloudinary credentials for image storage.
    *   `GEMINI_API_KEY`: API key for accessing the Gemini AI model.
*   **Frontend:**
    *   `VITE_BACKEND_URL`: The URL of the backend server.

## Project Structure

```
├── backend/
│   ├── package.json
│   ├── package-lock.json
│   ├── src/
│   │   ├── index.js
│   │   ├── routes/
│   │   │   ├── search.route.js
│   │   │   ├── message.route.js
│   │   │   ├── auth.route.js
│   │   │   └── notes.route.js
│   │   ├── models/
│   │   │   ├── note.model.js
│   │   │   ├── message.model.js
│   │   │   └── user.model.js
│   │   ├── seeds/
│   │   │   └── user.seed.js
│   │   ├── middleware/
│   │   │   └── auth.middleware.js
│   │   ├── controllers/
│   │   │   ├── message.controller.js
│   │   │   ├── notes.controller.js
│   │   │   ├── auth.controller.js
│   │   │   └── search.controller.js
│   │   ├── lib/
│   │   │   ├── cloudinary.js
│   │   │   ├── db.js
│   │   │   ├── utils.js
│   │   │   └── socket.js
│   └── ...
├── frontend/
│   ├── package.json
│   ├── package-lock.json
│   ├── index.html
│   ├── vite.config.js
│   ├── src/
│   │   ├── main.jsx
│   │   ├── index.css
│   │   ├── App.jsx
│   │   ├── store/
│   │   │   ├── useThemeStore.js
│   │   │   ├── useChatStore.js
│   │   │   ├── useAuthStore.js
│   │   │   └── useNoteStore.js
│   │   ├── constants/
│   │   │   └── index.js
│   │   ├── components/
│   │   │   ├── SearchBar.jsx
│   │   │   ├── NoChatSelected.jsx
│   │   │   ├── MessageInput.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── AuthImagePattern.jsx
│   │   │   ├── ChatHeader.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ChatContainer.jsx
│   │   │   ├── skeletons/
│   │   │   │   ├── MessageSkeleton.jsx
│   │   │   │   └── SidebarSkeleton.jsx
│   │   ├── pages/
│   │   │   ├── SettingsPage.jsx
│   │   │   ├── NotePage.jsx
│   │   │   ├── SignUpPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   └── ProfilePage.jsx
│   │   ├── lib/
│   │   │   ├── utils.js
│   │   │   └── axios.js
│   └── ...
├── README.md
└── package.json
```

## Technologies Used

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"></a>
  <a href="#"><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"></a>
  <a href="#"><img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"></a>
  <a href="#"><img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"></a>
  <a href="#"><img src="https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=socket.io&logoColor=white" alt="Socket.io"></a>
  <a href="#"><img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"></a>
  <a href="#"><img src="https://img.shields.io/badge/Zustand-1B1B1F?style=for-the-badge&logo=zustand&logoColor=F7DF1E" alt="Zustand"></a>
  <a href="#"><img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios"></a>
  <a href="#"><img src="https://img.shields.io/badge/jsonWebToken-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white" alt="JSON Web Token"></a>
</p>

*   **Backend:** Node.js, Express, MongoDB, Mongoose, Socket.IO, JWT, bcrypt, Cloudinary.
*   **Frontend:** React, Zustand, Tailwind CSS, Socket.IO-client, Axios.
*   **AI:** Google Gemini

## License

MIT License

<p align="center">
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a>
</p>