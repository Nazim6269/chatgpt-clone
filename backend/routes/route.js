import { getAuth, requireAuth } from "@clerk/express";
import ImageKit from "@imagekit/nodejs";
import express from "express";
import { createChat } from "../controller/chat.controller.js";
const router = express.Router();

const client = new ImageKit({
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

// ============ routes are declared here ====================

// home route
router.get("/", (req, res) => {
  res.send({ message: "Hello ChatGpt Clone" });
});

// file upload auth route
router.get("/api/upload", (req, res) => {
  const { token, expire, signature } =
    client.helper.getAuthenticationParameters();

  res.send({
    token,
    expire,
    signature,
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  });
});

// test route
router.post("/api/test", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  console.log(userId);

  res.send({ message: "hello" });
});

// chats route
router.post("/api/chats", requireAuth(), createChat);

export default router;
