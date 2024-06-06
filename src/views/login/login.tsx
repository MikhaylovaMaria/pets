import { CustomInput } from "../../components/FormCustom/custom-input/customInput";
import { Layout } from "../../components/layout/layout";
import { Card, Form, Row, Space, Typography, type FormProps } from "antd";
import { PasswordInput } from "../../components/FormCustom/password-input/passwordInput";
import { CustomButton } from "../../components/FormCustom/custom-button/customButton";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  currentUserId,
  fetchUserData,
  selectisAuth,
} from "../../redux/slices/user";
import { Navigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store";

type FieldType = {
  paramsLogin: {
    email: string;
    password: string;
  };
};

export const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const isAuth = useSelector(currentUserId);
  // userId

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const data = await dispatch(fetchUserData(values));
    if (!data.payload) {
      alert("Не удалось авторизоваться");
    } else if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
      window.localStorage.setItem("userId", data.payload.userId);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  if (isAuth) {
    return <Navigate to={`${isAuth}`} />;
  }

  return (
    <Layout headerView={true}>
      <Row align="middle" justify="center">
        <Card
          title={
            <Typography.Title level={3} style={{ textAlign: "center" }}>
              Личный кабинет
            </Typography.Title>
          }
          style={{
            width: "90%",
            backgroundColor: "#FFFDF5",
            marginTop: "20px",
          }}
        >
          <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Пароль" />
            <CustomButton
              type="primary"
              htmlType="submit"
              backgroundColor="#556B2F"
            >
              Войти
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Нет аккаунта?
              <NavLink to="\register">Зарегистрироваться</NavLink>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
