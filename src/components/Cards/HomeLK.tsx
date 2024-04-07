import { Card, Col, Image, Row, Space, Typography } from "antd";
import { CustomButton } from "../FormCustom/custom-button/customButton";
import { cityNameById } from "../../redux/slices/defaultValues";
import { useSelector } from "react-redux";
import { selectisAuth } from "../../redux/slices/user";
const { Text } = Typography;

export const HomeLK = () => {
  const currentUser = useSelector(selectisAuth);
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
    <Card style={{ width: "30vw" }} loading={true} />
  ) : (
    <Card
      title={
        <Typography.Title level={2} style={{ color: "#3B3632", margin: 0 }}>
          Личные данные
        </Typography.Title>
      }
      style={{
        backgroundColor: "#FFFDF5",
      }}
    >
      <Row style={{ height: "100%" }}>
        <Col flex="25%" style={{ height: "100%" }}>
          <Image
            style={{ height: "50%", width: "100%", objectFit: "contain" }}
            src={
              currentUser.avatar ||
              "https://cdn-icons-png.flaticon.com/512/60/60422.png"
            }
          />
          <Text underline style={{ textAlign: "center" }}>
            Редактировать профиль
          </Text>
        </Col>
        <Col flex="auto" style={{ paddingLeft: "20px", height: "100%" }}>
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
          {/* <Typography>
            <Text style={{ color: "#7E746B" }}>Телефон: </Text>
          </Typography> */}
          <Typography>
            <Text style={{ color: "#7E746B" }}>Почта: </Text>
            <Text style={{ color: "#3B3632" }}>{currentUser.email}</Text>
          </Typography>
          <Typography>
            <Text style={{ color: "#7E746B" }}>Дата регистрации: </Text>
            <Text style={{ color: "#3B3632" }}>
              {formatedDate(currentUser.createdAt)}
            </Text>
          </Typography>
        </Col>
      </Row>
    </Card>
  );
};

//   return !currentUser ? (
//     <Card style={{ width: "90vw", margin: "5px" }} loading={true} />
//   ) : (
//     <Card
//       title={
//         <Typography.Title level={2} style={{ color: "#3B3632", margin: 0 }}>
//           Личные данные
//         </Typography.Title>
//       }
//       style={{
//         backgroundColor: "#FFFDF5",
//       }}
//     >
//       <Row style={{ height: "100%" }}>
//         <Space direction="horizontal">
//           <Col flex="25%">
//             <Space direction="vertical" style={{ height: "100%" }}>
//               <Image
//                 style={{ height: "25%" }}
//                 src={
//                   currentUser.avatar ||
//                   "https://cdn-icons-png.flaticon.com/512/60/60422.png"
//                 }
//               />
//               <Text underline> Редактировать профиль</Text>
//             </Space>
//           </Col>
//           <Col flex="auto" style={{ paddingLeft: "20px", height: "100%" }}>
//             <Typography.Title level={4} style={{ color: "#3B3632" }}>
//               {currentUser.firstName + " " + currentUser.lastName}
//             </Typography.Title>
//             <Typography>
//               <Text style={{ color: "#7E746B" }}>Страна: </Text>
//               <Text style={{ color: "#3B3632" }}>Россия</Text>
//             </Typography>
//             <Typography>
//               <Text style={{ color: "#7E746B" }}>Город: </Text>
//               <Text style={{ color: "#3B3632" }}>{currentUser.cityId}</Text>
//             </Typography>

//             <Typography>
//               <Text style={{ color: "#7E746B" }}>Дата рождения: </Text>
//               <Text style={{ color: "#3B3632" }}>
//                 {formatedDate(currentUser.birthDate)}
//               </Text>
//             </Typography>
//             {/* <Typography>
//               <Text style={{ color: "#7E746B" }}>Телефон: </Text>
//             </Typography> */}
//             <Typography>
//               <Text style={{ color: "#7E746B" }}>Почта: </Text>
//               <Text style={{ color: "#3B3632" }}>{currentUser.email}</Text>
//             </Typography>
//             <Typography>
//               <Text style={{ color: "#7E746B" }}>Дата регистрации: </Text>
//               <Text style={{ color: "#3B3632" }}>
//                 {formatedDate(currentUser.createdAt)}
//               </Text>
//             </Typography>
//           </Col>
//         </Space>
//       </Row>
//     </Card>
//   );
// };
