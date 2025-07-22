<div align="center">

# 🚀 ChatNotes

### 💫 Seamless real-time chat with intelligent note-taking, powered by AI.

<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/github/license/[USER]/[REPO]?style=for-the-badge" alt="License"/>
  <img src="https://img.shields.io/github/stars/[USER]/[REPO]?style=for-the-badge" alt="Stars"/>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-configuration">Configuration</a> •
  <a href="#-api-documentation">API</a> •
  <a href="#-contributing">Contributing</a>
</p>

</div>

---

## 📋 About

`ChatNotes` is a robust full-stack application designed to revolutionize digital communication and knowledge management. It integrates real-time private messaging with an innovative AI-powered note-taking system, all within a sleek, user-friendly interface. This project aims to provide a unified platform where conversations seamlessly transform into organized, actionable notes, enhancing productivity for individuals and teams alike.

## ✨ Features

*   💬 **Real-time Messaging**: Engage in instant, private conversations with other users, supporting both text and image messages for rich communication. Messages are delivered instantly via Socket.io.
*   🔐 **Secure User Authentication**: Robust user management system featuring secure JWT-based authentication, password hashing with `bcryptjs`, and HTTP-only cookies for enhanced security.
*   🧠 **AI-Powered Note Generation**: Leverage Google Gemini AI to automatically generate concise and structured notes directly from your chat conversations, saving time and ensuring no important details are missed.
*   📝 **Comprehensive Note Management**: Create, view, edit, and delete notes with extensive capabilities including categorization, tagging, full-text search, filtering, pagination, and the ability to share notes with other users.
*   🧑‍💻 **User Profiles**: Personalize your presence with dynamic profile picture updates, securely stored and served via Cloudinary.
*   🎨 **Dynamic Theme Switching**: Customize your application's aesthetic with a wide array of themes powered by DaisyUI, complete with a live preview in settings.
*   🔍 **Efficient User Search**: Quickly find other users by their full name or email through a debounced search functionality in the chat sidebar.
*   📱 **Responsive Design**: Enjoy a consistent and fluid experience across various devices and screen sizes.

## 🛠️ Tech Stack

<div align="center">

### Backend
<p>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/Mongoose-800000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose"/>
</p>

### Frontend  
<p>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind"/>
  <img src="https://img.shields.io/badge/DaisyUI-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white" alt="DaisyUI"/>
  <img src="https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=zustand&logoColor=white" alt="Zustand"/>
</p>

### Tools & Services
<p>
  <img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white" alt="Socket.io"/>
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white" alt="JWT"/>
  <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" alt="Cloudinary"/>
  <img src="https://img.shields.io/badge/Google_Gemini_AI-F06C04?style=for-the-badge&logo=google&logoColor=white" alt="Google Gemini AI"/>
</p>

</div>

## 🚀 Quick Start

Follow these steps to get ChatNotes up and running on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js**: (LTS version recommended)
*   **npm** or **Yarn**: Package manager for Node.js
*   **MongoDB**: A running instance of MongoDB (local or cloud-hosted)
*   **Cloudinary Account**: For image uploads (profile pictures, message images)
*   **Google Gemini API Key**: For AI note generation

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/[USER]/[REPO].git
    cd ChatNotes
    ```

2.  **Backend Setup:**

    ```bash
    cd backend
    npm install # or yarn
    ```

    Create a `.env` file in the `backend/` directory and add your environment variables (refer to the 🔧 Configuration section).

3.  **Frontend Setup:**

    ```bash
    cd ../frontend
    npm install # or yarn
    ```

### Running the Application

1.  **Start the Backend Server:**

    ```bash
    cd backend
    npm run dev
    ```
    The backend server will start on `http://localhost:5001`.

2.  **Start the Frontend Development Server:**

    ```bash
    cd ../frontend
    npm run dev
    ```
    The frontend application will typically open in your browser at `http://localhost:5173`.

### Seeding Dummy Data (Optional)

To quickly populate your database with test users:

```bash
cd backend
npm run seed:users
```

## 📁 Project Structure

The project is organized into two main directories: `backend` for the Node.js/Express API and `frontend` for the React application.

```
.
├── .gitignore          # Specifies intentionally untracked files to ignore
├── LICENSE             # Project license
├── README.md           # This README file
├── package.json        # Root workspace package definitions
├── backend/            # Node.js/Express API
│   ├── .env            # Environment variables (local, not committed)
│   ├── package.json    # Backend dependencies and scripts
│   ├── node_modules/   # Installed backend packages
│   └── src/            # Backend source code
│       ├── index.js          # Main entry point for the backend server and Socket.io
│       ├── controllers/      # Handles API request logic
│       │   ├── auth.controller.js    # User authentication and profile management
│       │   ├── message.controller.js # Sending and retrieving chat messages
│       │   ├── notes.controller.js   # CRUD operations for notes, AI generation
│       │   └── search.controller.js  # User search functionalities
│       ├── lib/              # Utility functions and configurations
│       │   ├── cloudinary.js         # Cloudinary configuration for image uploads
│       │   ├── db.js                 # MongoDB connection setup
│       │   ├── socket.js             # Socket.io instance and user-socket map
│       │   └── utils.js              # General utilities, e.g., JWT generation
│       ├── middleware/       # Express middleware for request processing
│       │   └── auth.middleware.js    # Protects routes requiring authentication
│       ├── models/           # Mongoose schemas for MongoDB collections
│       │   ├── message.model.js      # Defines chat message structure
│       │   ├── note.model.js         # Defines user note structure
│       │   └── user.model.js         # Defines user account structure
│       ├── routes/           # API route definitions
│       │   ├── auth.route.js         # Authentication related endpoints
│       │   ├── message.route.js      # Message related endpoints
│       │   ├── notes.route.js        # Note management endpoints
│       │   └── search.route.js       # User search endpoints
│       └── seeds/            # Scripts for populating the database with dummy data
│           └── user.seed.js          # Seeds initial user data
└── frontend/           # React application
    ├── README.md           # Frontend specific README (optional, typically merged into main)
    ├── eslint.config.js    # ESLint configuration for code quality
    ├── index.html          # Main HTML file for the React app
    ├── package.json        # Frontend dependencies and scripts
    ├── postcss.config.js   # PostCSS configuration for Tailwind CSS
    ├── tailwind.config.js  # Tailwind CSS and DaisyUI theme configuration
    ├── vite.config.js      # Vite build configuration
    ├── node_modules/       # Installed frontend packages
    ├── public/             # Static assets
    └── src/                # Frontend source code
        ├── App.jsx           # Root component, handles routing and global state
        ├── index.css         # Global CSS styles
        ├── main.jsx          # Entry point for React DOM rendering
        ├── components/       # Reusable UI components
        │   ├── AuthImagePattern.jsx    # Decorative background for auth pages
        │   ├── ChatContainer.jsx       # Displays chat messages for selected user
        │   ├── ChatHeader.jsx          # Displays selected chat user's info
        │   ├── MessageInput.jsx        # Input for sending chat messages (text/image)
        │   ├── Navbar.jsx              # Global navigation bar
        │   ├── NoChatSelected.jsx      # Placeholder for unselected chat
        │   ├── SearchBar.jsx           # User search input for sidebar
        │   ├── Sidebar.jsx             # Lists chat users and online status
        │   └── skeletons/              # Loading skeleton components
        │       ├── MessageSkeleton.jsx # Placeholder for loading messages
        │       └── SidebarSkeleton.jsx # Placeholder for loading sidebar users
        ├── constants/        # Global constants
        │   └── index.js
        ├── lib/              # Frontend utility functions
        │   ├── axios.js                # Custom Axios instance for API calls
        │   └── utils.js                # General utility functions, e.g., date formatting
        ├── pages/            # Top-level page components
        │   ├── HomePage.jsx          # Main chat interface page
        │   ├── LoginPage.jsx         # User login page
        │   ├── NotePage.jsx          # Note management page (CRUD)
        │   ├── ProfilePage.jsx       # User profile and picture update page
        │   ├── SettingsPage.jsx      # Application settings, theme selection
        │   └── SignUpPage.jsx        # User registration page
        └── store/            # Zustand global state stores
            ├── useAuthStore.js # Manages user authentication state and Socket.io connection
            ├── useChatStore.js # Manages chat users and message states
            ├── useNoteStore.js # Manages user notes state
            └── useThemeStore.js # Manages application theme state
```

## 🔧 Configuration

The backend requires several environment variables for proper functioning. Create a `.env` file in the `backend/` directory with the following variables:

| Variable                     | Description                                                                 | Example Value                       |
| :--------------------------- | :-------------------------------------------------------------------------- | :---------------------------------- |
| `PORT`                       | The port on which the backend server will run.                              | `5001`                              |
| `MONGO_URI`                  | Connection URI for your MongoDB database.                                   | `mongodb://localhost:27017/chatdb`  |
| `JWT_SECRET`                 | A strong, random string for signing JWTs.                                   | `supersecretjwtkey123`              |
| `CLOUDINARY_CLOUD_NAME`      | Your Cloudinary cloud name.                                                 | `your_cloud_name`                   |
| `CLOUDINARY_API_KEY`         | Your Cloudinary API Key.                                                    | `123456789012345`                   |
| `CLOUDINARY_API_SECRET`      | Your Cloudinary API Secret.                                                 | `your_api_secret_xyz`               |
| `GEMINI_API_KEY`             | Your Google Gemini API Key for AI note generation.                          | `AIzaSyB...`                        |

**Frontend Configuration:**
The frontend's Axios instance is configured to connect to `/api` in production and `http://localhost:5001/api` in development, automatically handling the backend URL. No explicit `.env` file is required for the frontend development server to connect to the local backend if running on `5001`.

## 📚 API Documentation

The `ChatNotes` backend provides a comprehensive RESTful API for managing users, messages, and notes. Authentication is handled via JWTs stored in HTTP-only cookies.

### Base URL

`http://localhost:5001/api` (development) or `/api` (production)

### Authentication

All protected routes require a valid JWT passed in an HTTP-only cookie. The `protectRoute` middleware ensures this.

### Key Endpoints

#### User Authentication (`/api/auth`)

*   **`POST /signup`**: Register a new user.
    *   **Body**: `{ fullName, email, password }`
    *   **Response**: `{ _id, fullName, email, profilePic, message }`
*   **`POST /login`**: Authenticate a user and set a JWT cookie.
    *   **Body**: `{ email, password }`
    *   **Response**: `{ _id, fullName, email, profilePic, message }`
*   **`POST /logout`**: Clear the JWT cookie and log out.
    *   **Response**: `{ message: 'Logged out successfully' }`
*   **`GET /checkauth`**: Check if a user is currently authenticated.
    *   **Response**: `{ _id, fullName, email, profilePic }` (if authenticated)
*   **`PUT /profile/update`**: Update user's profile picture.
    *   **Body**: `{ profilePic: base64ImageString }` (for image)
    *   **Response**: `{ _id, fullName, email, profilePic, message }`

#### Messaging (`/api/messages`)

*   **`GET /:id`**: Get all messages for a specific conversation with `id` (the other user's ID).
    *   **Parameters**: `id` (User ID of the chat partner)
    *   **Response**: `[ { senderId, receiverId, text, image, createdAt, ... } ]`
*   **`POST /send/:id`**: Send a new message to user `id`.
    *   **Parameters**: `id` (Receiver User ID)
    *   **Body**: `{ text: "...", image: "base64encodedImage" }` (either `text` or `image` or both)
    *   **Response**: `{ _id, senderId, receiverId, text, image, createdAt, ... }`
*   **`GET /conversations`**: Get a list of users the current user has chatted with (sidebar).
    *   **Response**: `[ { _id, fullName, profilePic, ... } ]`

#### Notes (`/api/notes`)

*   **`GET /`**: List all notes owned by or shared with the authenticated user.
    *   **Query Params**: `category`, `tags`, `search`, `limit`, `page`, `sortBy`, `sortOrder`
    *   **Response**: `{ data: [...notes], page, limit, total, pages }`
*   **`GET /:id`**: Get a single note by its ID.
    *   **Parameters**: `id` (Note ID)
    *   **Response**: `{ success: true, data: note }`
*   **`POST /`**: Create a new note.
    *   **Body**: `{ title, content, category, tags, isShared, sharedWith: [userIds] }`
    *   **Response**: `{ message: 'Note created successfully', data: note }`
*   **`PUT /:id`**: Update an existing note. (Only owner can update)
    *   **Parameters**: `id` (Note ID)
    *   **Body**: `{ title?, content?, category?, tags?, isShared?, sharedWith?: [userIds] }`
    *   **Response**: `{ message: 'Note updated successfully', data: updatedNote }`
*   **`DELETE /:id`**: Delete a note. (Only owner can delete)
    *   **Parameters**: `id` (Note ID)
    *   **Response**: `{ message: 'Note deleted successfully' }`
*   **`POST /generate-from-chat/:id`**: Generate notes from chat history with a specific user using AI.
    *   **Parameters**: `id` (User ID of the chat partner)
    *   **Response**: `{ success: true, message: 'Notes generated and saved successfully', data: generatedNote }`

#### Search (`/api/search`)

*   **`GET /users`**: Search for users by `fullName` or `email`.
    *   **Query Params**: `q` (search term)
    *   **Response**: `{ count, users: [...users] }`

## 🤝 Contributing

We welcome contributions to `ChatNotes`! If you have suggestions for improvements, new features, or bug fixes, please follow these steps:

1.  **Fork the repository.**
2.  **Create a new branch** for your feature or bug fix: `git checkout -b feature/your-feature-name` or `bugfix/issue-description`.
3.  **Make your changes** and ensure they adhere to the project's coding standards.
4.  **Write clear, concise commit messages.**
5.  **Push your branch** to your forked repository.
6.  **Open a Pull Request** to the `main` branch of this repository, describing your changes in detail.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.