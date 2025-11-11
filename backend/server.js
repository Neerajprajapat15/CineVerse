import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"; 
import movieRoutes from "./routes/movieRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import cookieParser from "cookie-parser";
import path from "path"
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser()); 
app.use(cors({
  origin: "http://localhost:5173",   // your React app URL
  credentials: true                  // allow cookies
}));


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/users", userRoutes);

// for production

if(process.env.NODE_ENV==="production"){
    const __filename = fileURLToPath(import.meta.url); 
    const __dirname = path.dirname(__filename);
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*all", (req, res) =>{ 
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}



// Connect to MySQL
(async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL Connected");
  } catch (err) {
    console.error("DB Error:", err);  // show full error object  -->err.message to show actual message
  }
})();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
