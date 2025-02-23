import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userRouter from './Routes/user.route.js'
import connectDB from './Database/connectDB.js'
import cors from "cors"

dotenv.config() // Load environment variables

const app = express()

// Middleware
app.use(express.json()) 
app.use(cookieParser()) 

// CORS Configuration

app.use(cors({
  origin: "http://localhost:5173", // Frontend URL
  credentials: true, // 👈 Allows cookies
}));

// Routes
app.use('/api/user', userRouter)


// Database Connection


// Start Server
const PORT = process.env.PORT || 5000



app.listen(PORT, () => {
  connectDB();
  console.log(`Example app listening on port ${PORT}`)
})
