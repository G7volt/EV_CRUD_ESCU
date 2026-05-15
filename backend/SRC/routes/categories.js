import express, { Router } from "express"; 

import categoriesController from "../controller/category.js";

const router = express.Router();

router.route("/")
.get(categoriesController.getCategory)
.post(categoriesController.insertCategory)

router.route("/:id")
.put(categoriesController.updateCategory)
.delete(categoriesController.deleteCategory)

export default router;