import express from "express"
import cors from "cors"
import session from "express-session";
import passport from "passport";
import "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middlewares/error.middleware.js"

const app = express()

app.use(cors({
    origin: "*",
    credentials: false
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
// Debug Google Credentials
const clientId = process.env.GOOGLE_CLIENT_ID;
console.log(`GOOGLE_CLIENT_ID Loaded: '${clientId}' (Length: ${clientId ? clientId.length : 0})`);
if (clientId && clientId.trim() !== clientId) {
    console.error("WARNING: GOOGLE_CLIENT_ID has leading/trailing whitespace!");
}

app.use(express.static("public"))
app.use('/uploads', express.static('uploads'))

// Session configuration
app.use(
    session({
        secret: process.env.SESSION_SECRET || "default_secret",
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Default Root Route for status check
app.get('/', (req, res) => {
    res.send({ message: "Prolync Backend Server is Running on Port 5000" });
});

// routes import
import healthRouter from './routes/health.routes.js'
import authRouter from './routes/auth.routes.js' // This effectively serves as user routes
import adminRouter from './routes/admin.routes.js'
import lecturerRouter from './routes/lecturer.routes.js'
import blogRouter from './routes/blog.routes.js'
import paymentRouter from './routes/payment.routes.js'

// routes declaration
app.use("/auth", authRoutes); // Google Auth Routes
app.use("/api/v1/health", healthRouter)
app.use("/api/user", authRouter)
app.use("/api/admin", adminRouter)
app.use("/api/lecturer", lecturerRouter)
app.use("/api/blogs", blogRouter)
app.use("/api/payment", paymentRouter)

// Keep legacy /api for frontend backward compatibility if needed, 
// OR better yet, I should check if I need to update frontend FIRST.
// The user request says: POST /api/user/login.
// Currently frontend uses /api/login. 
// I will keep /api for now and ALSO add /api/user for the new spec.
app.use("/api", authRouter)



// Error handling middleware (should be last)
app.use(errorHandler)

export { app }
