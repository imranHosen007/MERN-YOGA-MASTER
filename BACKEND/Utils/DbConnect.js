import mongoose from "mongoose";
export const dbconnect = () => {
  mongoose
    .connect(process.env.MONGO_DB_URI)
    .then(console.log("MongoDb Connection SuccesFull"))
    .catch((err) => console.log(`MongoDb Conncection ${err}`));
};
