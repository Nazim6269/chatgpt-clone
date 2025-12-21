import { getAuth } from "@clerk/express";
import chatModel from "../models/chat.model.js";
import userChatsModel from "../models/userChats.model.js";

//===========create chat controller=================//
export const createChat = async (req, res) => {
  const { text } = req.body;
  const { userId } = getAuth(req);
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

      res.status(201).json({ chatId: savedChat._id });
    }
  } catch (error) {
    res.status(500).send({ message: "Error in creating chat" });
  }
};
