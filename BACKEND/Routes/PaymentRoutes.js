import express from "express";
import {
  paymentHistory,
  paymentHistoryLength,
  paymentDeatils,
  postPayment,
} from "../Controllers/Payment.Conrtollers.js";
import verifyToken from "../Middleware/VerifyToken.js";
const router = express.Router();

router.post("/create-intent", verifyToken, paymentDeatils);
router.post("/", verifyToken, postPayment);
router.get("/:email", paymentHistory);
router.get("/histroy-length/:email", paymentHistoryLength);
export default router;
