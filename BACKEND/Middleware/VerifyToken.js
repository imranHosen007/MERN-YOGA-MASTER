import jwt from "jsonwebtoken";
const verifyToken = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).send({ error: true, message: "Unauthorize access" });
  }
  const token = authorization?.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRENT_TOKEN, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .send({ error: true, message: "forbidden user or token has expired" });
    }

    req.decoded = decoded;
    next();
  });

  // jwt.verify(token);
};

export default verifyToken;
