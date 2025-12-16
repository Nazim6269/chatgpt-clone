const expess = require("express");
const cors = require("cors");
const ImageKit = require("@imagekit/nodejs");

const app = expess();
const middlewareArray = [cors()];
const client = new ImageKit({
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

app.use(middlewareArray);

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

module.exports = app;
