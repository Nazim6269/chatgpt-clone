import { requireAuth } from "@clerk/express";
import express from "express";
import {
  createChatController,
  fetchChatsController,
  fetchUserChatsController,
  updateChatsController,
} from "../controller/chat.controller.js";
import { imageUploadController } from "../controller/image.controller.js";
const router = express.Router();

// ============ routes are declared here ====================//

// home route
router.get("/", (req, res) => {
  res.send({ message: "Hello ChatGpt Clone" });
});

// file upload auth route
router.get("/api/upload", imageUploadController);

//fetching usr chats route
router.get("/api/userChats", requireAuth(), fetchUserChatsController);

//fetching chats route
router.get("/api/chats/:id", requireAuth(), fetchChatsController);

//updating chats with cradentials
router.put("/api/chats/:id", requireAuth(), updateChatsController);

// chats route
router.post("/api/chats", requireAuth(), createChatController);

export default router;
