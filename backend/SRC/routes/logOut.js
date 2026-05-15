import express from "express";

import logOut from "../controller/logOut.js"

const router = express.Router();

router.route("/logOut")
.post(logOut.logOut)

export default router