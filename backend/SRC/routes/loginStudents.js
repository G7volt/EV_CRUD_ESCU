import express from "express";
import studentsLogin from "../controller/studentsLoginController.js"

const router = express.Router();

router.route("/")
.post(studentsLogin.login);

export default router