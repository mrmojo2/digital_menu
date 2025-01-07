import express from "express";
const router = express.Router()

import { authenticateUser, authorizePermissions } from "../middlewares/atuh.js";
import {getAllMenuItems,createMenuItem,getSingleMenuItem,updateMenuItem,deleteMenuItem,getItemsByCategory} from "../controllers/menuController.js"

router.route("/").get(getAllMenuItems).post(authenticateUser,createMenuItem)
router.route("/:id").get(getSingleMenuItem).patch(authenticateUser,updateMenuItem).delete(authenticateUser,deleteMenuItem)
router.route("/category/:categoryId").get(getItemsByCategory)

export default router