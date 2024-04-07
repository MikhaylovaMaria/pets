import { CustomInput } from "../../components/FormCustom/custom-input/customInput";
import { Layout } from "../../components/layout/layout";
import {
  Card,
  Form,
  Row,
  Space,
  Typography,
  type FormProps,
  Col,
  DatePicker,
} from "antd";
import { PasswordInput } from "../../components/FormCustom/password-input/passwordInput";
import { CustomButton } from "../../components/FormCustom/custom-button/customButton";
import { Link } from "react-router-dom";
import { Paths } from "../../path";
import { CustomRadio } from "../../components/FormCustom/custom-radio/radio-button";
import type { RadioChangeEvent } from "antd";
import { useState } from "react";
import CustomSelectCity from "../../components/FormCustom/custom-select/customSelectCity";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchRegister } from "../../redux/slices/user";

type FieldType = {
  firstName: string;
  lastName: string;
  birthDate: string;
  sex: string;
  avatar: string;
  email: string;
  cityId: string;
  password: string;
};

export const Register = () => {
  const dispatch = useDispatch<any>();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const data = await dispatch(
      fetchRegister({ ...values, birthDate: values.birthDate.toString() })
    );
    if (!data.payload) {
      alert("Не удалось зарегистрироваться");
    } else if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const options = [
    {
      id: "female",
      value: "женщина",
    },
    { id: "male", value: "мужчина" },
  ];
  const [value, setValue] = useState(options[0].id);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };
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
            width: "80%",
            backgroundColor: "#FFFDF5",
            marginTop: "10%", // пофиксить стили для отображения
            // textAlign: "center", ПРИМЕНЯЕТСЯ КО ВСЕЙ КАРТОЧКЕ, А НУЖНО ТОЛЬКО К TITLE
          }}
        >
          <p style={{ textAlign: "start" }}>Личные данные</p>
          <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{ margin: 0 }}
          >
            <Row gutter={[8, 16]}>
              <Col xs={24} sm={12}>
                <CustomInput name="firstName" placeholder="Имя" />
              </Col>
              <Col xs={24} sm={12}>
                <CustomInput
                  type="surname"
                  name="lastName"
                  placeholder="Фамилия"
                />
              </Col>
            </Row>

            <Row gutter={[8, 16]}>
              <Col xs={24} sm={12}>
                <CustomSelectCity />
              </Col>
              <Col xs={24} sm={6}>
                <Form.Item name="birthDate">
                  <DatePicker placeholder="Дата рождения" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={6}>
                <CustomRadio
                  name="sex"
                  values={options}
                  onChange={onChange}
                  initValue={value}
                />
              </Col>
            </Row>

            <CustomInput type="email" name="email" placeholder="Email" />
            <Row gutter={[8, 16]}>
              <Col xs={24} sm={12}>
                <PasswordInput name="password" placeholder="Пароль" />
              </Col>
              <Col xs={24} sm={12}>
                <PasswordInput
                  name="confirmPassword"
                  placeholder="Повторите пароль"
                />
              </Col>
            </Row>
            <div style={{ textAlign: "start" }}>
              <CustomButton
                type="primary"
                htmlType="submit"
                backgroundColor="#556B2F"
              >
                Зарегистрироваться
              </CustomButton>
            </div>
          </Form>
          <div style={{ textAlign: "start" }}>
            <Space direction="vertical">
              <Typography.Text>
                Есть аккаунт? <Link to={Paths.login}>Войти</Link>
              </Typography.Text>
            </Space>
          </div>
        </Card>
      </Row>
    </Layout>
  );
};
