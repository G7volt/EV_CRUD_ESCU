import e from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

//--ESTUDIANTES
import students from "./SRC/routes/students.js"
import studentsLogin from "./SRC/router/loginStudents.js"
import studentsRegister from "./SRC/controller/studentsRegisterController.js"
import studentRecoveryPassword from "./SRC/controller/studentRecoveryPassword.js";

//-- Profesores



//--CRUDS Materias, categorias y tareas

const app = express();

app.use(cors ({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}))

app.use(cookieParser());

app.use(express.json());

app.use("/api/students", students);
app.use("/api/studentsLogin", studentsLogin);
app.use("/api/studentsRegister", studentsRegister)
app.use("/api/studentRecoveryPassword", studentRecoveryPassword)
