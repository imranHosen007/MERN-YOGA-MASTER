import express from "express";
import {
  createUser,
  getAllUser,
  getInstructors,
  getUserByEmail,
  getUserById,
  updateUser,
  updateUserRole,
  userDelete,
} from "../Controllers/User.Controllers.js";
import verifyToken from "../Middleware/VerifyToken.js";
import verifyAdmin from "../Middleware/verifyAdmin.js";

const router = express.Router();
router.post("/", createUser);
router.get("/", getAllUser);
router.get("/instructors", getInstructors);
router.get("/:id", getUserById);
router.get("/email/:email", verifyToken, getUserByEmail);
router.delete("/:id", verifyToken, verifyAdmin, userDelete);
router.put("/update-user/:id", verifyToken, verifyAdmin, updateUser);
router.put("/update-role/:id", verifyToken, verifyAdmin, updateUserRole);
export default router;
