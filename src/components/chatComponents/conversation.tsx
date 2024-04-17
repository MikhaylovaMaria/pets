import React, { useEffect, useState } from "react";
import { User } from "../../types/types";
import { getUser } from "../../axios";
import { Typography } from "antd";

type Props = {
  currentUserId: string | undefined;
  data: any;
  online: boolean;
};

type chatParticipants = {
  userId: string;
};

const Conversation = ({ data, currentUserId, online }: Props) => {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const companion: string = data.ChatParticipants.find(
      (user: chatParticipants) => user.userId !== currentUserId
    )?.userId;
    const getUserData = async () => {
      try {
        const { data } = await getUser(companion);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  return (
    <>
      <div className="follower conversation">
        <div>
          {online && <div className="online-dot"></div>}
          <img
            src={
              userData?.avatar ||
              "https://cdn-icons-png.flaticon.com/512/60/60422.png"
            }
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="name" style={{ fontSize: "0.8rem" }}>
            <Typography.Title level={4}>
              {userData?.firstName} {userData?.lastName}
            </Typography.Title>
            <Typography.Title level={5}>
              {online ? "Online" : "Offline"}
            </Typography.Title>
          </div>
        </div>
      </div>
      <hr style={{ width: "100%", border: "0.2px solid #BDBDBD" }} />
    </>
  );
};

export default Conversation;
