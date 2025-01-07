import express from "express";
const router = express.Router()

import { authenticateUser } from "../middlewares/atuh.js";
import {
    getAllCategories,
    createCategory,
    getSingleCategory,
    updateCategory,
    deleteCategory
} from "../controllers/categoryController.js"

router.route("/").get(getAllCategories).post(authenticateUser, createCategory)
router.route("/:id").get(getSingleCategory).patch(authenticateUser, updateCategory).delete(authenticateUser, deleteCategory)

export default router