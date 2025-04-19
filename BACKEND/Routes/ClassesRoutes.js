import express from "express";
import {
  createClasses,
  getAllApprovedClasses,
  getClassesInstructor,
  manageAllClasses,
  singleClasses,
  updateAllInformation,
  updateStatus,
} from "../Controllers/Classes.Controllers.js";
import verifyToken from "../Middleware/VerifyToken.js";
import verifyInstructor from "../Middleware/verifyInstructor .js";
import verifyAdmin from "../Middleware/verifyAdmin.js";

const router = express.Router();
router.post("/", verifyToken, verifyInstructor, createClasses);

router.get("/:id", singleClasses);
router.get("/approved/classes", getAllApprovedClasses);
router.get(
  "/instructor/:email",
  verifyToken,
  verifyInstructor,
  getClassesInstructor
);
router.get("/", manageAllClasses);
router.put("/change-status/:id", verifyToken, verifyAdmin, updateStatus);
router.put("/update/:id", verifyToken, verifyInstructor, updateAllInformation);

export default router;
