import { Button, Card, Flex, Space, Typography } from "antd";
import { cityNameById } from "../../redux/slices/defaultValues";
import { useDispatch, useSelector } from "react-redux";
import { format } from "timeago.js";
import "../../utils/dataTyme";
import { CloseOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { User } from "../../types/types";
import { ImageProfile } from "../image/imageProfile";
import {
  UserFriendsParams,
  fetchCreateSubscription,
  fetchDeleteSubscription,
  getUserFriends,
} from "../../redux/slices/user";
import { AppDispatch } from "../../redux/store";
const { Text } = Typography;

type Props = {
  currentUser: User;
};

export const HomeLK = ({ currentUser }: Props) => {
  const dispatch: AppDispatch = useDispatch();

  const mainUserId = localStorage.getItem("userId");

  const cityId = currentUser?.cityId;

  const formatedDate = (date: string) => {
    const formatDate = new Date(date);
    return `${formatDate.getDate()}.${
      formatDate.getMonth() + 1
    }.${formatDate.getFullYear()}`;
  };

  const cityName = useSelector((state) => {
    if (cityId) {
      return cityNameById(state, cityId);
    }
    return "";
  });

  const userFriends = useSelector(getUserFriends);

  const isUserFriend = (userId: string) => {
    return userFriends.some((u) => u.userId === userId);
  };

  const createSubscription = (friendId: string, userFriend: User) => {
    const authorId = mainUserId;

    const { avatar, userId, firstName, lastName } = userFriend;
    const temp = { avatar, userId, firstName, lastName };

    authorId &&
      dispatch(fetchCreateSubscription({ authorId, friendId, user: temp }));
  };

  const deleteSubscription = (friendId: string, userFriend: User) => {
    const authorId = mainUserId;
    const { avatar, userId, firstName, lastName } = userFriend;
    const temp = { avatar, userId, firstName, lastName };
    authorId &&
      dispatch(fetchDeleteSubscription({ authorId, friendId, user: temp }));
  };

  return !currentUser ? (
    <Card style={{ width: "40vw" }} loading={true} />
  ) : (
    <Card
      title={
        <Typography.Title level={4} style={{ color: "#3B3632", margin: 0 }}>
          <Flex justify="space-between">
            {currentUser.firstName + " " + currentUser.lastName}
            {currentUser.userId === mainUserId ? (
              <EditOutlined />
            ) : isUserFriend(currentUser.userId) ? (
              <CloseOutlined
                onClick={() =>
                  deleteSubscription(currentUser.userId, currentUser)
                }
              />
            ) : (
              <PlusOutlined
                onClick={() =>
                  createSubscription(currentUser.userId, currentUser)
                }
              />
            )}
          </Flex>
        </Typography.Title>
      }
      style={{
        backgroundColor: "#FFFDF5",
        width: "100%",
      }}
    >
      <Flex>
        <Flex justify="flex-start" align="flex-start" style={{ width: "20%" }}>
          <ImageProfile url={currentUser.avatar} />
        </Flex>
        <Flex
          justify="flex-start"
          align="flex-start"
          style={{ marginLeft: "1rem", width: "75%" }}
        >
          <Space direction="vertical">
            {/* <Typography.Title level={4} style={{ color: "#3B3632" }}>
              {currentUser.firstName + " " + currentUser.lastName}
            </Typography.Title> */}
            <Typography>
              <Text style={{ color: "#7E746B" }}>Страна: </Text>
              <Text style={{ color: "#3B3632" }}>Россия</Text>
            </Typography>
            <Typography>
              <Text style={{ color: "#7E746B" }}>Город: </Text>
              <Text style={{ color: "#3B3632" }}>{cityName}</Text>
            </Typography>
            <Typography>
              <Text style={{ color: "#7E746B" }}>Дата рождения: </Text>
              <Text style={{ color: "#3B3632" }}>
                {formatedDate(currentUser.birthDate)}
              </Text>
            </Typography>
            <Typography>
              <Text style={{ color: "#7E746B" }}>Почта: </Text>
              <Text style={{ color: "#3B3632" }}>{currentUser.email}</Text>
            </Typography>
            <Typography>
              <Text style={{ color: "#7E746B" }}>Создан: </Text>
              <Text style={{ color: "#3B3632" }}>
                {format(currentUser.createdAt, "ru")}
              </Text>
            </Typography>
          </Space>
        </Flex>
      </Flex>
    </Card>
  );
};
