import app from "./app.mjs";
import dbConnect from "./utils/dbconnect.mjs";
import { PORT } from "./config/index.mjs";

dbConnect();

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
