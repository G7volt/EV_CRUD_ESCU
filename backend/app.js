import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

//--ESTUDIANTES
import students from "./SRC/routes/students.js"
import studentsLogin from "./SRC/routes/loginStudents.js"
import studentsRegister from "./SRC/routes/registerStudents.js"
import studentRecoveryPassword from "./SRC/routes/recoveryStudents.js";


//-- Profesores



//--CRUDS Materias, categorias y tareas
import homework from "./SRC/routes/homework.js";
import logOut from "./SRC/routes/logOut.js"
import categories from "./SRC/routes/categories.js";

const app = express();

app.use(cors ({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}))

app.use(cookieParser());

app.use(express.json());

//-----Rutas para Estudiantes
app.use("/api/students", students);
app.use("/api/studentsLogin", studentsLogin);
app.use("/api/studentsRegister", studentsRegister);
app.use("/api/studentRecoveryPassword", studentRecoveryPassword);

//-----Rutas para Profesores



//-----Rutas para los otros cruds
app.use("/api/homework", homework)
app.use("/api/logOut", logOut)
app.use("/api/categories", categories)

export default app;