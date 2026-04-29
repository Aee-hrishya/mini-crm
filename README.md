# Mini CRM

A full-stack CRM (Customer Relationship Management) application to manage leads, track their progress, and maintain notes. Built with a focus on usability, clean UI, and real-world workflow.

---

## 🚀 Features

- 📊 Dashboard with real-time lead statistics
- ➕ Create new leads
- 📋 View and manage all leads in a data grid
- 🔍 Search, filter, and sort leads
- 👁 View detailed lead information
- 📝 Add notes to each lead
- 🔄 Update lead status (New, Contacted, Closed, Site Visit)
- 🎯 Action-driven UI with intuitive navigation

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- AG Grid
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

---

## 📁 Project Structure
mini-crm/
│
├── frontend/ # React application
├── backend/ # Express API server
└── README.md # Project documentation

---

## ⚙️ Prerequisites

Ensure you have installed:

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB Atlas (or local MongoDB)

---

# 🚀 Setup Instructions

---

## 🔧 Backend Setup

1. Navigate to backend folder:

```bash
cd backend
```
2. Install dependencies

```
npm install
```
3. Create a new .env file inside the backend/ folder

```
PORT=5000
MONGO_URI=mongodb+srv://Hrishikesh:Mimarathi%4069@cluster0.2hcowff.mongodb.net/mini-crm?retryWrites=true&w=majority
```
4. Start backend server

```
npm run dev
```
5. Backend will run on

```
http://localhost:5000
```

---

## 💻 Frontend Setup

1. Open a new terminal and navigate to frontend

```
cd frontend
```
2. install dependencies

```
npm install
```
3. Create a .env file inside frontend/

```
VITE_API_URL=http://localhost:5000
```
4. Start the frontend

```
npm run dev
```
5. Frontend will run on

```
http://localhost:5173
```

---

## 🔗 API Base URL

Ensure your frontend is configured to use

```
http://localhost:5000
```

---

## 🧪 Sample Data

The application includes a few pre-created leads to demonstrate:
- Dashboard statistics
- Lead listing
- Status updates
- Notes functionality

---

## 📌 Notes
- Backend must be running before starting frontend
- MongoDB connection must be active
- CORS is enabled for local development

---

🔮 Future Improvements
- Authentication (login/signup)
- Role-based access control
- Advanced analytics (charts & graphs)
- File attachments for leads
- Notifications & reminders

---

👤 Author
Hrishikesh Shinde


