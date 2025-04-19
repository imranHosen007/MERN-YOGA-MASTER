import express from "express";
import {
  enrolledClsses,
  getEnrolled,
  popularEnrolled,
  popularInstructors,
} from "../Controllers/Enrolled.Controllers.js";

import verifyToken from "../Middleware/VerifyToken.js";
const router = express.Router();
router.get("/", popularEnrolled);
router.get("/main/:email", verifyToken, getEnrolled);
router.get("/:email", enrolledClsses);
router.get("/popular-instructors/teacher", popularInstructors);
export default router;
