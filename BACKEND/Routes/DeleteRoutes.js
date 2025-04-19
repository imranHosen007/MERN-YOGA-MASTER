import exprees from "express";
import {
  createDeleteClasses,
  getDeleteClasses,
} from "../Controllers/Delete.Controllers.js";
import verifyAdmin from "../Middleware/verifyAdmin.js";
import verifyToken from "../Middleware/VerifyToken.js";

const router = exprees.Router();

router.post(`/:id`, verifyToken, verifyAdmin, createDeleteClasses);
router.get("/", getDeleteClasses);

export default router;
