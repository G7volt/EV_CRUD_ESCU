import express, { Router } from "express"; 

import homeworkController from "../controller/homeworkController";

const router = express.Router();

router.route("/")
.get(homeworkController.getHomework)
.post(homeworkController.insertHomework)

router.route("/:id")
.put(homeworkController.updateHomework)
.delete(homeworkController.deleteHomework)

export default router;