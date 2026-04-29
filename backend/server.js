require('dotenv').config();
const express = require('express');
const cors = require('cors')
const connectDB = require('./config/db');
const leadRoutes = require('./routes/lead.routes')
const dashboardRoutes = require('./routes/dashboard.routes')

const app = express();

//connect to DB
connectDB();

//allowed origins for CORS
const allowedOrigins = [
    "http://localhost:5173", //local frontend
    "https://mini-crm-wine.vercel.app" //production frontend
];

//Middleware
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));
app.use(express.json());
app.use('/api/leads', leadRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.get("/", (req, res) => {
    res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});