import { getAuth } from "@clerk/express";
import chatModel from "../models/chat.model.js";
import userChatsModel from "../models/userChats.model.js";

//===========create chat controller=================//
export const createChatController = async (req, res) => {
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
        userId: userId,
        chats: [{ _id: savedChat._id, title: text.substring(0, 40) }],
      });
      await newUserChats.save();
    } else {
      //this will update old user chat
      await userChatsModel.updateOne(
        { userId: userId },
        {
          $push: {
            chats: { _id: savedChat._id, title: text.substring(0, 40) },
          },
        }
      );
    }
    res.status(201).json({ chatId: savedChat._id });
  } catch (error) {
    res.status(500).send({ message: "Error in creating chat" });
  }
};

//=======================fetch user chats controller=======================//
export const fetchUserChatsController = async (req, res) => {
  const { userId } = getAuth(req);

  try {
    const userChats = await userChatsModel.find({ userId });

    res.status(201).send(userChats[0].chats);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch user chats" });
  }
};

//=============== fetch chats controller=====================//
export const fetchChatsController = async (req, res) => {
  const { userId } = getAuth(req);

  try {
    const chats = await chatModel.findOne({ _id: req.params.id, userId });

    res.status(201).send(chats);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch chats" });
  }
};

//================ update chat controller ==================//
export const updateChatsController = async (req, res) => {
  const { userId } = getAuth(req);
  const { question, answer, img } = req.body;

  const newChatItems = [
    ...(question
      ? [{ role: "user", parts: [{ text: question }], ...(img && { img }) }]
      : []),
    { role: "model", parts: [{ text: answer }] },
  ];

  try {
    const updatedChat = await chatModel.updateOne(
      {
        _id: req.params.id,
        userId,
      },
      {
        $push: {
          history: {
            $each: newChatItems,
          },
        },
      }
    ); //here i could also use findOneAndUpdate

    res.status(200).send(updatedChat);
  } catch (error) {
    res.status(500).send({ message: "Failed to update chats" });
  }
};
