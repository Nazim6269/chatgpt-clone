import { ImageKit } from "@imagekit/nodejs/client.js";
import { imagekitPrivateKey } from "../secret.js";

const client = new ImageKit({
  privateKey: imagekitPrivateKey,
});

export const imageUploadController = (req, res) => {
  const { token, expire, signature } =
    client.helper.getAuthenticationParameters();

  res.send({
    token,
    expire,
    signature,
    publicKey: imagekitPublicKey,
  });
};
