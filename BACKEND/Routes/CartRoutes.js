import express from "express";
import {
  addToCart,
  deleteCartItem,
  getAllCart,
  getCartEmail,
  getCartId,
} from "../Controllers/Cart.Controllers.js";
import verifyToken from "../Middleware/VerifyToken.js";
const router = express.Router();

router.post("/", addToCart);
router.get("/", getAllCart);
router.get("/item/:id", verifyToken, getCartId);
router.get("/:email", verifyToken, getCartEmail);

router.delete("/:id", verifyToken, deleteCartItem);
export default router;
