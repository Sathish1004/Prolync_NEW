import express from "express"
import cors from "cors"
import errorHandler from "./middlewares/error.middleware.js"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))

// Default Root Route for status check
app.get('/', (req, res) => {
    res.send({ message: "Prolync Backend Server is Running on Port 5000" });
});

// routes import
import healthRouter from './routes/health.routes.js'
import authRouter from './routes/auth.routes.js' // This effectively serves as user routes
import adminRouter from './routes/admin.routes.js'
import lecturerRouter from './routes/lecturer.routes.js'

// routes declaration
app.use("/api/v1/health", healthRouter)
app.use("/api/user", authRouter) // Remapping existing auth to /api/user as requested, also keeping /api for backward compat if needed? 
// Actually user asked for /api/user/login, existing is /api/login. 
// I will mount authRouter to /api/user AND /api/v1/auth to be safe, or just /api/user.
// existing auth.routes.js has /register and /login. So /api/user/login works if mounted at /api/user.

app.use("/api/user", authRouter)
app.use("/api/admin", adminRouter)
app.use("/api/lecturer", lecturerRouter)

// Keep legacy /api for frontend backward compatibility if needed, 
// OR better yet, I should check if I need to update frontend FIRST.
// The user request says: POST /api/user/login.
// Currently frontend uses /api/login. 
// I will keep /api for now and ALSO add /api/user for the new spec.
app.use("/api", authRouter)



// Error handling middleware (should be last)
app.use(errorHandler)

export { app }
