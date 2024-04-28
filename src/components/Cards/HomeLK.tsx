import { Button, Card, Flex, Image, Space, Typography } from "antd";
import { cityNameById } from "../../redux/slices/defaultValues";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import "../../utils/dataTyme";
import { EditOutlined } from "@ant-design/icons";
import { User } from "../../types/types";
const { Text } = Typography;

type Props = {
  currentUser: User;
};

export const HomeLK = ({ currentUser }: Props) => {
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

  return !currentUser ? (
    <Card style={{ width: "40vw" }} loading={true} />
  ) : (
    <Card
      title={
        <Typography.Title level={2} style={{ color: "#3B3632", margin: 0 }}>
          <Flex justify="space-between">
            Личные данные
            {currentUser.userId === mainUserId && <EditOutlined />}
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
          <Image
            // style={{ height: "25%", width: "25%", objectFit: "contain" }}
            src={
              currentUser.avatar ||
              "https://cdn-icons-png.flaticon.com/512/60/60422.png"
            }
          />
        </Flex>
        <Flex
          justify="flex-start"
          align="flex-start"
          style={{ marginLeft: "1rem", width: "75%" }}
        >
          <Space direction="vertical">
            <Typography.Title level={4} style={{ color: "#3B3632" }}>
              {currentUser.firstName + " " + currentUser.lastName}
            </Typography.Title>
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
