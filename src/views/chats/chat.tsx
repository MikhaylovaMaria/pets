import { useEffect, useRef, useState } from "react";
import { Layout } from "../../components/layout/layout";
import "./Chat.css";
import { useSelector } from "react-redux";
import { selectisAuth } from "../../redux/slices/user";
import { userChats } from "../../axios";
import { User } from "../../types/types";
import Conversation from "../../components/chatComponents/conversation";
import ChatBox from "../../components/chatBox/chatBox";
import { io, Socket } from "socket.io-client";

export interface chatData {
  ChatParticipants: [{ userId: string }];
  chatId: string;
  chatName: string;
  chatType: string;
  createdAt: string;
  updatedAt: string;
}

type ChatParticipants = {
  userId: string;
};

// export type socketDataReceive = {
//   chatId: string;
//   contentMessage: string;
//   userId: string;
//   receiverId: string;
// };

// export interface allMassage {
//   chatId: string;
//   contentMessage: string;
//   userId: string;
//   receiverId?: string;
//   createdAt: string;
//   messageId: string;
//   messageStatusId: string | null;
//   updatedAt: string;
// }

const Chats = () => {
  const user: User | null = useSelector(selectisAuth);

  const [chats, setChats] = useState<chatData[] | []>([]);
  const [currentChat, setCurrentChat] = useState<chatData | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<User[] | []>([]);
  const [sendMessage, setSendMessage] = useState<any>(null);
  const [recieveMessage, setRecieveMessage] = useState<any>(null);
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    const getChats = async () => {
      try {
        if (user) {
          const { data } = await userChats(user.userId);
          setChats(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user]);

  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", user?.userId);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  //отправка сообщения на сокет
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current?.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // получение сообщения из сокета
  useEffect(() => {
    socket.current?.on("receive-message", (data: any) => {
      console.log(data);
      setRecieveMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat: chatData) => {
    const chatMembers: ChatParticipants[] | undefined =
      chat.ChatParticipants.filter((member) => member.userId !== user?.userId);
    const online = chatMembers?.some((member) =>
      onlineUsers.find((user) => user.userId === member.userId)
    );
    return online ? true : false;
  };

  return (
    <div style={{ backgroundColor: "#BDBDBD", width: "100%" }}>
      <div className="Chat">
        <div className="Left-side-chat">
          <div className="Chat-container">
            <h2>Диалоги</h2>
            <div className="Chat-list">
              {chats?.map((chat) => (
                <div key={chat.chatId}>
                  <div onClick={() => setCurrentChat(chat)}>
                    <Conversation
                      data={chat}
                      currentUserId={user?.userId}
                      online={checkOnlineStatus(chat)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="Right-side-chat">
          <ChatBox
            chat={currentChat}
            currentUser={user?.userId}
            setSendMessage={setSendMessage}
            recieveMessage={recieveMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Chats;
