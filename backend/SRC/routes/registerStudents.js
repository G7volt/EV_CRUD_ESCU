import express from "express";
import registerStudent from "../controller/studentsRegisterController.js";

const router = express.Router();

router.route("/")
.post(registerStudent.register);

router.route("/verifyCodeEmail")
.post(registerStudent.verifyCode);

export default router