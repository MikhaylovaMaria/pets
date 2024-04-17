import React, { useEffect, useRef, useState } from "react";
import "./chatBox.css";
import { User } from "../../types/types";
import { chatData } from "../../views/chats/chat";
import { addMessage, getMessages, getUser } from "../../axios";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import { LeftCircleOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import "../../utils/dataTyme";

// Почему то сообщения неверно показывает в чатах!!

type Props = {
  chat: chatData | null;
  currentUser: string | undefined;
  setSendMessage: any;
  recieveMessage: any;
};

export interface messageData {
  chatId: string;
  contentMessage: string;
  createdAt: string;
  messageId: string;
  messageStatusId: string | null;
  updatedAt: string;
  userId: string;
}

export interface messageSend {
  chatId: string;
  contentMessage: string;
  userId: string;
}

const ChatBox = ({
  chat,
  currentUser,
  setSendMessage,
  recieveMessage,
}: Props) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [messages, setMessages] = useState<messageData[] | []>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  const handleChange = (newMessage: string) => {
    setNewMessage(newMessage);
  };

  // Получение названия диалога
  useEffect(() => {
    const companion: any = chat?.ChatParticipants.find(
      (user) => user.userId !== currentUser
    )?.userId;
    const getUserData = async () => {
      try {
        const { data } = await getUser(companion);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  // Получение сообщений
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (chat !== null) {
          const { data } = await getMessages(chat.chatId);
          setMessages(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);

  //скрол
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //Отправка сообщений

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (chat && currentUser) {
      const message: messageSend = {
        chatId: chat.chatId,
        contentMessage: newMessage,
        userId: currentUser,
      };
      const receiverId = chat?.ChatParticipants.find(
        (user) => user.userId !== currentUser
      )?.userId;
      setSendMessage({ ...message, receiverId });
      try {
        const { data } = await addMessage(message);
        setMessages([...messages, data]);
        setNewMessage("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (recieveMessage !== null && recieveMessage.chatId === chat?.chatId) {
      //не заходит в if
      setMessages([...messages, recieveMessage]);
    }
  }, [recieveMessage]);

  const scroll = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            <div className="chat-header">
              <div className="follower" style={{ justifyContent: "center" }}>
                <div>
                  <img
                    src={
                      userData?.avatar ||
                      "https://cdn-icons-png.flaticon.com/512/60/60422.png"
                    }
                    alt="Profile"
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="name">
                    <Typography.Title level={2}>
                      {userData?.firstName} {userData?.lastName}
                    </Typography.Title>
                  </div>
                </div>
              </div>
              <hr style={{ width: "100%", border: "0.1px solid #BDBDBD" }} />
            </div>

            <div className="chat-body">
              {messages?.map((message: messageData) => (
                <>
                  <div
                    key={message.messageId}
                    ref={scroll}
                    className={
                      message.userId === currentUser ? "message own" : "message"
                    }
                  >
                    <span style={{ wordWrap: "break-word" }}>
                      {message.contentMessage}
                    </span>
                    <span> {format(message.createdAt, "ru")}</span>
                  </div>
                </>
              ))}
            </div>

            <div className="chat-sender">
              <InputEmoji
                value={newMessage}
                onChange={handleChange}
                shouldReturn={false}
                shouldConvertEmojiToImage={false}
                keepOpened={false}
                language="ru"
              />
              <div className="send-button button" onClick={handleSend}>
                <LeftCircleOutlined style={{ fontSize: "1.5rem" }} />
              </div>
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">Выберите чат...</span>
        )}
      </div>
    </>
  );
};

export default ChatBox;
