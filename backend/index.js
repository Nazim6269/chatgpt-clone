import app from "./app.js";
import { connectMongo } from "./utils/connectMongo.js";

const port = 3000;

app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  await connectMongo();
});
