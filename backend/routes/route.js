const router = require("express").Router();
const ImageKit = require("@imagekit/nodejs");
const { default: chatModel } = require("../models/chat.model");
const { default: userChatsModel } = require("../models/userChats.model");
const client = new ImageKit({
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

//============routes are declared here====================
//home route api
router.get("/", (req, res) => {
  res.send({ message: "Hello ChatGpt Clone" });
});

//this is file uploading route==
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

//this is chats route
router.post("/api/chats", async (req, res) => {
  const { userId, text } = req.body;

  try {
    //this will create new chat and saved to mongodb
    const newChat = new chatModel({
      userId: userId,
      history: [{ role: "user", parts: [{ text }] }],
    });
    const savedChat = await newChat.save();

    //this will create new user chats
    const userChats = await userChatsModel.find({ userId: userId });

    if (!userChats.length) {
      const newUserChats = new userChatsModel({
        userId: savedChat._id,
        chats: [{ _id: savedChat._id, title: text.substring(0, 40) }],
      });
      await newUserChats.save();
    } else {
      //this will update old user chat
      await userChatsModel.updateOne(
        { userId: userId },
        { $push: { _id: savedChat._id, title: text.substring(0, 40) } }
      );

      res.status(201).send(newChat._id);
    }
  } catch (error) {
    res.status(500).send({ message: "Error in creating chat" });
  }
});

module.exports = { router };
