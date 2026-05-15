import express from "express";

import studentRecoveryPassword from "../controller/studentRecoveryPassword.js";

const router = express.Router();

router.route("/requestCode").post(studentRecoveryPassword.requestCode)

router.route("/verifyCode").post(studentRecoveryPassword.verifyCode);

router.route("/newPassword").post(studentRecoveryPassword.newPassword)

export default router