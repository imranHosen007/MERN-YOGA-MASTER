import User from "../Models/User.Model.js";

const verifyInstructor = async (req, res, next) => {
  const email = req.decoded.email;

  const qurry = { email: email };
  const user = await User.findOne(qurry);

  const isAdmin = user?.role == "admin" || user.role === "instructor";

  if (!isAdmin) {
    return res.status(403).send({ message: "Forbidden Acces" });
  }
  next();
};
export default verifyInstructor;
