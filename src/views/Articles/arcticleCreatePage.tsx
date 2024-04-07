import { Card, Col, Form, Input, Row, Typography, type FormProps } from "antd";
import styles from "./index.module.css";
import { CustomButton } from "../../components/FormCustom/custom-button/customButton";
import { Layout } from "../../components/layout/layout";
import CustomUpload from "../../components/FormCustom/custom-upload/customUpload";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Paths } from "../../path";
import { selectisAuth } from "../../redux/slices/user";

interface FormData {
  title: string;
  description: string;
  photos?: File[] | string[];
}

const ArticlePageCreate = () => {
  const dispatch = useDispatch<any>();
  const isAuth = useSelector(selectisAuth);

  const handleChange = (name: string, value: any) => {
    setFormData({ ...formData, [name]: value });
  };
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    photos: [],
  });
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFinish: FormProps<FormData>["onFinish"] = async () => {
    const data = await dispatch(formData);
    console.log(data);
  };

  const onFinishFailed: FormProps<FormData>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (!window.localStorage.getItem("token") && isAuth) {
    return <Navigate to={Paths.home} />;
  }

  return (
    <Layout>
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Card className={styles.customCard}>
          <Row className={styles.titleRow}>
            <Col span={24}>
              <Typography.Title level={3}>Заголовок статьи</Typography.Title>
            </Col>
            <Col flex="auto">
              <Input.TextArea
                name="title"
                showCount={true}
                maxLength={200}
                placeholder="Введите заголовок статьи"
                className={styles.textAreaTitle}
                autoSize={{ minRows: 1.5, maxRows: 3.5 }}
                onChange={onChange}
              />
            </Col>
          </Row>
          <Row>
            <Typography.Title level={3}>Содержание статьи</Typography.Title>
            <Col span={24}>
              <Input.TextArea
                name="description"
                showCount={true}
                className={styles.textAreaDescription}
                placeholder="Введите текст статьи"
                maxLength={8000}
                autoSize={{ minRows: 5.5 }}
                onChange={onChange}
              />
            </Col>
            <Col span={24} style={{ marginTop: "2%" }}>
              <Row className={styles.attachmentRow}>
                <Col span={22} className={styles.attachmentText}>
                  <Typography.Text>Прикрепите до 5 изображений</Typography.Text>
                </Col>
                <Col span={2} className={styles.attachmentButton}>
                  <CustomButton
                    backgroundColor="#556B2F"
                    type="primary"
                    htmlType="submit"
                  >
                    Cоздать
                  </CustomButton>
                </Col>
              </Row>
              <Col span={24}>
                <CustomUpload
                  onFileChange={(files) => handleChange("photos", files)}
                />
              </Col>
            </Col>
          </Row>
        </Card>
      </Form>
    </Layout>
  );
};

export default ArticlePageCreate;
