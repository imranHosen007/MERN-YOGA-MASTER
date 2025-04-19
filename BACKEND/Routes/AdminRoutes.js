import express from "express";
import {
  getAdminStats,
  getinstructors,
} from "../Controllers/Admin.Controller.js";
import verifyToken from "../Middleware/VerifyToken.js";
import verifyAdmin from "../Middleware/verifyAdmin.js";
const router = express.Router();
router.get("/", verifyToken, verifyAdmin, getAdminStats);
router.get("/instructors", getinstructors);
export default router;
