const app = require("./app");
const { connectMongo } = require("./utils/connectMongo");

const port = 3000;

app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  await connectMongo();
});
