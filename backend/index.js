import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: [
    "http://localhost:5173", // Local frontend
    "https://jobdashboard-5.onrender.com", // Deployed frontend
  ],
  credentials: true,
};

app.use(cors(corsOptions));

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

const PORT = process.env.PORT || 3000;

// Start Server Only If Database Connection is Successful
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server is running at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error);
    process.exit(1); // Exit process on DB failure
  });
