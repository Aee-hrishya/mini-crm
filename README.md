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
MONGO_URI=your_mongodb_connection_string
```
4. Start backend server

```
npm run dev
```
5. Backend will run on

```
http://localhost:5000
```

