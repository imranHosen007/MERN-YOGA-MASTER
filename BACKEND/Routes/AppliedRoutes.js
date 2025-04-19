import express from "express";
import {
  appliedForInstructors,
  getAppliedInstructors,
} from "../Controllers/Applied.Controller.js";
const router = express.Router();

router.get("/:email", getAppliedInstructors);
router.post("/", appliedForInstructors);
export default router;
