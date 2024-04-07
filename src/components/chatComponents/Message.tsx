import { Input } from "antd";
import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { useSelector } from "react-redux";
import { currentUserId } from "../../redux/slices/user";

interface participantsData {
  userId: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
}
interface messageData {
  messageId: string;
  userId: string;
  contentMessage: string;
  createdAt: string;
}
interface DataType {
  Participants: participantsData[];
  messages: messageData[];
}

const Message = () => {
  const currentUser = useSelector(currentUserId);

  const dialog: DataType = {
    Participants: [
      {
        userId: "72d677cc-5417-424d-a04f-8b4f03b13e06",
        firstName: "МААААША",
        lastName: "mmm",
        avatar: null,
      },
      {
        userId: "592ee6d6-07e8-4bd9-9ec4-da375d5e0dae",
        firstName: "маша",
        lastName: "mmm",
        avatar: null,
      },
    ],
    messages: [
      {
        messageId: "63b007f4-733e-4819-9a5a-7f187165b896",
        userId: "72d677cc-5417-424d-a04f-8b4f03b13e06",
        contentMessage: "Вау",
        createdAt: "2024-04-06T20:15:14.009Z",
      },
      {
        messageId: "b4011a23-208b-4ee1-bec3-84df66deee67",
        userId: "72d677cc-5417-424d-a04f-8b4f03b13e06",
        contentMessage: "Жаль что не получаю эти данные с бэка",
        createdAt: "2024-04-06T20:09:04.561Z",
      },

      {
        messageId: "b4011a23-208b-4ee1-bec3-84df66deee65",
        userId: "0ac69623-b9e0-42f4-9d35-1fb33b229912",
        contentMessage:
          "аааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааа",
        createdAt: "2024-04-06T20:09:04.561Z",
      },
    ],
  };

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType>(dialog);

  const companion = dialog.Participants.find(
    (e: participantsData) => e.userId !== currentUser
  );

  // dialog.Participants.find((el: participantsData) => {
  //   return el.userId !== currentUser;
  // })?.firstName +
  //   " " +
  //   dialog.Participants.find((el: participantsData) => {
  //     return el.userId !== currentUser;
  //   })?.lastName;

  const loadMoreData = () => {
    // if (loading) {
    //   return;
    // }
    // setLoading(true);
    // fetch(
    //   "http://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo"
    // )
    //   .then((res) => res.json())
    //   .then((body) => {
    //     setData([...data, ...body.results]);
    //     setLoading(false);
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //   });
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  const findParticipantName = (userId: string) => {
    const participant = data.Participants.find((p) => p.userId === userId);
    return participant
      ? `${participant.firstName} ${participant.lastName}`
      : "Неизвестно";
  };

  return (
    <>
      <div className={styles.messages}>
        {data.messages.map((message, i) => {
          const itsMe = message.userId === currentUser;
          const senderName = findParticipantName(message.userId);
          const className = itsMe ? styles.me : styles.user;

          return (
            <div key={i} className={`${styles.message} ${className}`}>
              <span className={styles.user}>{!itsMe && senderName}</span>

              <div className={styles.text}>{message.contentMessage}</div>
            </div>
          );
        })}
      </div>
      <div className={styles.input}>
        <Input
          type="text"
          name="message"
          placeholder="Написать сообщение"
          autoComplete="off"
          required
        />
      </div>
    </>
  );
};

export default Message;

/* <div
id="scrollableDiv"
style={{
  // height: "100vh",
  overflow: "auto",
  // padding: "0 16px",
  // border: "1px solid rgba(140, 140, 140, 0.35)",
}}
>
<InfiniteScroll
  dataLength={data?.messages.length}
  next={loadMoreData}
  hasMore={data?.messages.length < 50}
  loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
  endMessage={<Divider plain>Конец</Divider>}
  scrollableTarget="scrollableDiv"
>
  <Typography.Title level={4}>{dialogName}</Typography.Title>
  <List
    style={{ overflow: "hidden" }}
    dataSource={data.messages}
    renderItem={(item) => (
      <List.Item key={item.messageId}>
        <List.Item.Meta
          // avatar={
          //   <Avatar
          //     size={50}
          //     src={
          //       item.avatar ||
          //       `https://cdn-icons-png.flaticon.com/512/60/60422.png`
          //     }
          //   />
          // }
          title={
            <a
              href="https://ant.design"
              style={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {item.contentMessage}
            </a>
          }
          description={
            <span
              style={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {item.contentMessage}
            </span>
          }
        />
      </List.Item>
    )}
  />
</InfiniteScroll>
</div> */
