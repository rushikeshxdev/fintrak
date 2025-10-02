# FinTrack Pro - Personal Finance Tracker

## 💰 Project Overview

**FinTrack Pro** is a modern, full-stack personal finance tracker built using the **MERN** stack (MongoDB, Express, React, Node.js) with **Tailwind CSS** for a responsive, dark-mode user interface.

It allows users to register, log in, add income and expense transactions, view a real-time summary, and analyze their cash flow and category spending via interactive charts.

| Feature | Description | Status |
| :--- | :--- | :--- |
| **User Authentication** | Register and Login with JWT-based sessions. | ✅ Complete |
| **Transaction Management** | CRUD operations (Create, Read, Delete) for transactions. | ✅ Complete |
| **Data Segregation** | Users can only see and manage their own transactions. | ✅ Complete |
| **Real-time Analytics** | Category Breakdown Pie Chart & Monthly Cash Flow Line Chart. | ✅ Complete |
| **Modern UI/UX** | Responsive design using Tailwind CSS. | ✅ Complete |

***

## 🚀 Getting Started

Follow these steps to get your local development environment set up and running.

### Prerequisites

You need the following installed on your machine:
* **Node.js** (v18+)
* **npm** (comes with Node.js)
* **MongoDB Atlas Account** (for cloud database hosting)
* **Git**

### Step 1: Clone the Repository

Clone the project to your local machine:

```bash
git clone [https://github.com/rushikeshxdev/fintrak.git](https://github.com/rushikeshxdev/fintrak.git)
cd fintrak
````

### Step 2: Backend Setup

The backend runs on Node.js and Express, listening on port `5000`.

#### A. Environment Variables

Create a file named **`.env`** inside the **`backend/`** directory:

```
# .env file in backend/

# MongoDB Connection String (Replace with your Atlas details)
# Note: Ensure your current IP is whitelisted in Atlas Network Access settings!
MONGO_URI=mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER_NAME>.mongodb.net/fintrackpro?retryWrites=true&w=majority

# JWT Secret Key (Use a long, random string)
JWT_SECRET=YOUR_SECRET_KEY_HERE

# Port for the Express server
PORT=5000
```

#### B. Install Dependencies and Start

```bash
cd backend
npm install
npm start
# Server should now be running on http://localhost:5000
```

-----

### Step 3: Frontend Setup

The frontend runs on React and Vite, typically listening on port `5173`.

#### A. Install Dependencies and Run

The frontend uses Tailwind CSS, configured via `tailwind.config.js` and `postcss.config.js` (or `.cjs` files, depending on your environment).

```bash
cd frontend
npm install
npm run dev
# Frontend should now be running on http://localhost:5173
```

#### B. Important Configuration Check (CORS)

If you encounter **CORS errors** (`blocked by CORS policy`) in the browser console, ensure your backend's main server file (`server.js` or `app.js`) is correctly configured to allow requests from your frontend:

```javascript
// Example backend CORS configuration (Ensure this is in your server.js)
const cors = require('cors');
// ...
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true 
}));
// ...
```

-----

## ⚙️ Project Structure

The project follows a standard MERN separation between the `backend` and `frontend` directories.

```
fintrak/
├── backend/
│   ├── controllers/         # API logic (e.g., transactionController)
│   ├── middleware/          # Authentication middleware (authMiddleware)
│   ├── models/              # Mongoose Schemas (User, Transaction)
│   ├── routes/              # Express routing definitions
│   └── server.js            # Main Express server entry point
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/      # All React UI components (Auth, Dashboard, Transactions)
    │   ├── context/         # AuthContext.jsx
    │   ├── hooks/           # useApi.js
    │   ├── utils/           # constants.js
    │   ├── App.jsx          # Main application router
    │   └── main.jsx         # App entry point
    ├── postcss.config.js
    ├── tailwind.config.js
    └── vite.config.js
```

-----

## 🛠️ Technologies Used

  * **Frontend:** React 18+ (Vite), Tailwind CSS (for styling), `lucide-react` (for icons), `recharts` (for data visualization).
  * **Backend:** Node.js, Express.js (for routing).
  * **Database:** MongoDB (via Mongoose ORM).
  * **Security:** JSON Web Tokens (JWT) for authentication.

<!-- end list -->
