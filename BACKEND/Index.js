import express from "express";
import { config } from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
export const app = express();

// -----Confiq-DotEnv-----
config({
  path: "./.env",
});

const corsOptions = {
  origin: [`http://localhost:5173`, "https://eshop-eight-ochre.vercel.app"],

  optionSuccessStatus: 200,
};
// -------Using MiddleWare-------

app.use(express.json());
app.use(cors(corsOptions));

// ------Jwt----------

app.post("/jwt", async (req, res) => {
  const user = req.body;

  const token = jwt.sign(user, process.env.JWT_SECRENT_TOKEN, {
    expiresIn: "1hr",
  });
  res.send({ token });
});
// ------Import-Routing-------
import UserRoutes from "./Routes/UserRoutes.js";
import ClassesRoutes from "./Routes/ClassesRoutes.js";
import CartRoutes from "./Routes/CartRoutes.js";
import PaymentRoutes from "./Routes/PaymentRoutes.js";
import EnrolledRoutes from "./Routes/EnrolledRoutes.js";
import AppliedRoutes from "./Routes/AppliedRoutes.js";
import AdminRoutes from "./Routes/AdminRoutes.js";
import DeleteRoutes from "./Routes/DeleteRoutes.js";

app.use("/user", UserRoutes);
app.use("/classes", ClassesRoutes);
app.use("/cart", CartRoutes);
app.use("/payment", PaymentRoutes);
app.use("/enrolled", EnrolledRoutes);
app.use("/applied", AppliedRoutes);
app.use("/admin-stats", AdminRoutes);
app.use("/delete-classes", DeleteRoutes);

app.get("/", (req, res) => {
  res.send("Nice");
});
