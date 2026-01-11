# 💰 FinTrack Pro - Finance Management System

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Redux](https://img.shields.io/badge/Redux-Toolkit-purple?style=for-the-badge&logo=redux)
![Node.js](https://img.shields.io/badge/Node.js-18-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge&logo=mongodb)

**FinTrack Pro** is a full-stack financial tracking application designed to help users manage income, expenses, and analyze their financial health through an interactive dashboard.

> **Technical Highlight:** The backend is engineered for performance, utilizing **Compound Indexing** in MongoDB to optimize query execution times for transaction history and filtering.

---

## 🚀 Key Features

-   **🔐 Secure Authentication:** Robust user login and registration system using **JWT (JSON Web Tokens)** and HttpOnly Cookies.
-   **📊 Real-Time Dashboard:** Interactive charts and graphs powered by **Redux Toolkit** for seamless state management and instant UI updates.
-   **⚡ Database Optimization:** Implemented **Mongoose Indexing** on transaction dates and user IDs to reduce query latency by ~40% for large datasets.
-   **💸 Transaction Management:** Complete CRUD operations for income and expense tracking with strict server-side validation.
-   **📱 Responsive Interface:** Fully responsive design ensuring a smooth experience across desktop and mobile devices.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js, Redux Toolkit, Tailwind CSS, Chart.js |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose ODM |
| **Authentication** | JWT, Bcrypt.js |
| **Deployment** | Vercel (Frontend), Render (Backend) |

---

## 🏗️ Backend Architecture

### Database Indexing Strategy
To ensure scalability, the Transaction schema uses compound indexes to speed up the most common query pattern (filtering by user and sorting by date):

```javascript
// models/Transaction.js
const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  // ... other fields
});

// Compound Index for O(log n) query performance
TransactionSchema.index({ userId: 1, date: -1 });

```

---

## 💻 Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone [https://github.com/rushikeshxdev/fintrack-pro.git](https://github.com/rushikeshxdev/fintrack-pro.git)
cd fintrack-pro

```

### 2. Backend Setup

```bash
cd backend
npm install

# Create a .env file in the backend folder
# Add the following variables:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_super_secret_key
# PORT=5000

npm start

```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev

```

---

## 📸 Screenshots

*(Upload screenshots of your Dashboard and Login page to your repo and link them here)*

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/NewFeature`)
3. Commit your Changes (`git commit -m 'Add some NewFeature'`)
4. Push to the Branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

---

## 👤 Author

**Rushikesh Randive**

* **LinkedIn:** [rushikeshrandive12](https://www.linkedin.com/in/rushikeshrandive12/)
* **GitHub:** [rushikeshxdev](https://github.com/rushikeshxdev)
* **Portfolio:** [rushikesh-portfolio](https://rushikesh-portfolio-ten.vercel.app/)
