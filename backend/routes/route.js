import { getAuth, requireAuth } from "@clerk/express";
import ImageKit from "@imagekit/nodejs";
import express from "express";
import {
  createChatController,
  fetchChatsController,
  fetchUserChatsController,
} from "../controller/chat.controller.js";
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

//fetching usr chats route
router.get("/api/userChats", requireAuth(), fetchUserChatsController);

//fetching chats route
router.get("/api/chats/:id", requireAuth(), fetchChatsController);

// chats route
router.post("/api/chats", requireAuth(), createChatController);

export default router;
