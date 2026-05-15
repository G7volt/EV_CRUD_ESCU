import e from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app use(cors ({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}))
