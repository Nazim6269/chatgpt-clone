const expess = require("express");
const cors = require("cors");
const ImageKit = require("@imagekit/nodejs");

const app = expess();
const middlewareArray = [
  cors(),
  expess.json(),
  expess.urlencoded({ extended: true }),
];
const client = new ImageKit({
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

app.use(middlewareArray);

//home route api
app.get("/", (req, res) => {
  res.send({ message: "Hello ChatGpt Clone" });
});

//api for image kit
app.get("/api/upload", (req, res) => {
  const { token, expire, signature } =
    client.helper.getAuthenticationParameters();
  res.send({
    token,
    expire,
    signature,
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  });
});

//api for chats history
app.post("/api/chats", (req, res) => {
  const { text } = req.body;
  console.log(text);
});

module.exports = app;
