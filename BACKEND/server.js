import { app } from "./Index.js";
import { dbconnect } from "./Utils/DbConnect.js";

dbconnect();
const PORT = process.env.PORT || 3000;
app.listen(PORT, (req, res) => {
  console.log(`Server is Running on ${PORT}`);
});
