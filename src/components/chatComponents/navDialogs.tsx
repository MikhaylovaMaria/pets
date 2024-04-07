import { Card, Col, Row, Typography } from "antd";
import { Layout } from "../../components/layout/layout";
import { useEffect, useState } from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import { Avatar, Divider, List, Skeleton } from "antd";
import { CustomInput } from "../FormCustom/custom-input/customInput";
import { SearchOutlined } from "@ant-design/icons";

interface DataType {
  userId: string;
  role: string;
  chatId: string;
  chatName: string;
  lastmessageid: string;
  lastmessagecontent: string;
  lastmessagecreatedat: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
}

const NavDialogs = () => {
  //   const gridStyleDialogs: React.CSSProperties = {
  //     textAlign: "center",
  //     width: "100%",
  //   };

  const dialogs = [
    {
      userId: "72d677cc-5417-424d-a04f-8b4f03b13e06",
      role: "creator",
      chatId: "6ec94c46-2fec-42d7-ba72-c6d33f87a7b0",
      chatName: "test2",
      lastmessageid: "63b007f4-733e-4819-9a5a-7f187165b896",
      lastmessagecontent:
        "Это тестввввввввввввввввввввввввввввввввввввввввввввввв",
      lastmessagecreatedat: "2024-04-06T20:15:14.009Z",
      firstName: "МААААША",
      lastName: "mmm",
      avatar: null,
    },
    {
      userId: "72d677cc-5417-424d-a04f-8b4f03b13e06",
      role: "creator",
      chatId: "6ec94c46-2fec-42d7-ba72-c6d33f87a7b0",
      chatName: "test2",
      lastmessageid: "63b007f4-733e-4819-9a5a-7f187165b896",
      lastmessagecontent: "Это тест",
      lastmessagecreatedat: "2024-04-06T20:15:14.009Z",
      firstName: "МААААША",
      lastName: "mmm",
      avatar: null,
    },
  ];

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>(dialogs);

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

  return (
    <div
      id="scrollableDiv"
      style={{
        // height: "100vh",
        overflow: "auto",
        // padding: "0 16px",
        // border: "1px solid rgba(140, 140, 140, 0.35)",
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 50}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>Конец</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <Typography.Text>
          <CustomInput name="search" prefix={<SearchOutlined />} />
        </Typography.Text>
        <List
          style={{ overflow: "hidden" }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.userId}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    size={50}
                    src={
                      item.avatar ||
                      `https://cdn-icons-png.flaticon.com/512/60/60422.png`
                    }
                  />
                }
                title={
                  <a
                    href="https://ant.design"
                    style={{
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.firstName + " " + item.lastName}
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
                    {item.lastmessagecontent}
                  </span>
                }
              />
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};

export default NavDialogs;
