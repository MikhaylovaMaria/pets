import React, { useState } from "react";
import { Layout } from "../../components/layout/layout";
import { ThemeItem } from "../../components/FormCustom/custom-select/customSelect";
import CustomTextAria from "../../components/FormCustom/custom-textAria.tsx/customTextAria";
import CustomUpload from "../../components/FormCustom/custom-upload/customUpload";
import { Card, Col, Row, Space, Steps, Typography, message } from "antd";
import { CustomButton } from "../../components/FormCustom/custom-button/customButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { MapComponent } from "../../components/MapComponent/mapLeaflet";
import { UserOutlined } from "@ant-design/icons";

import { CustomRadio } from "../../components/FormCustom/custom-radio/radio-button";
import { RadioChangeEvent } from "antd/lib/radio";
import { fetchAnnouncementCreate } from "../../redux/slices/announcements";

import { useNavigate } from "react-router-dom";

interface announmentsData {
  announcementTypeId?: string;
  announcementTitle: string;
  description: string;
  announcementLocation: [number, number] | [];
  photos?: string[];
}

const AnnouncementNew = () => {
  const { announmentTypes } = useSelector(
    (state: RootState) => state.announments
  );

  const initialStateForm: announmentsData = {
    announcementTypeId: "",
    announcementTitle: "",
    description: "",
    announcementLocation: [],
    photos: [],
  };

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [clickedPosition, setClickedPosition] = useState<[number, number]>([
    0, 0,
  ]);

  const themeItems: ThemeItem[] = announmentTypes.map((announcement) => ({
    id: announcement.announcementTypeId,
    value: announcement.announcementTypeName,
  }));

  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState<announmentsData>(initialStateForm);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const handleChange = (name: string, value: any) => {
    setFormData({ ...formData, [name]: value });
  };

  const onChange = (e: RadioChangeEvent) => {
    setFormData({ ...formData, announcementTypeId: e.target.value });
  };

  const createButton = () => {
    dispatch(fetchAnnouncementCreate(formData));
    setFormData(initialStateForm);
    message.success("Объявление создано");
    // navigate(`${Paths.announcement}`, { replace: true });
  };

  const steps = [
    {
      title: "Детали объявления",
      icon: <UserOutlined />,
      content: (
        <Row>
          <Col span="auto">
            <Typography.Text>Выберите тип объявления</Typography.Text>
            <CustomRadio
              values={themeItems}
              name="type"
              onChange={onChange}
              // initValue={themeItems[0].id}
            />
          </Col>
          <Col span={24}>
            <CustomTextAria
              label={
                <Typography.Text>
                  Введите краткое название объявления
                </Typography.Text>
              }
              name="announcementTitle"
              onChange={(value) => handleChange("announcementTitle", value)}
              minRow={1}
              maxRows={2}
              maxLength={50}
              showCount={true}
            />
          </Col>
          <Col span={24}>
            <Typography.Text>
              Опишите подробно проблему, с которой вы столкнулись
            </Typography.Text>
            <CustomTextAria
              minRow={3}
              maxRows={5}
              maxLength={8000}
              showCount={true}
              name="description"
              onChange={(value) => handleChange("description", value)}
            />
          </Col>
          <Col>
            <Typography.Text>
              Прикрепите до 5 изображений, если это необходимо
            </Typography.Text>
            <CustomUpload
              onFileChange={(files) => handleChange("photos", files)}
            />
          </Col>
        </Row>
      ),
      style: {
        background: "#556B2F",
      },
    },
    {
      title: "Местоположение",
      content: (
        <>
          <Typography.Text>Выберите местоположение на карте </Typography.Text>
          <div
            style={{ width: "100%", height: "50vh" }}
            onClick={() =>
              setFormData({
                ...formData,
                announcementLocation: clickedPosition,
              })
            }
          >
            <MapComponent
              showdetails={true}
              showMarker={true}
              clickedPosition={clickedPosition}
              setClickedPosition={setClickedPosition}
            />
          </div>
        </>
      ),
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <Layout>
      <Row align="middle" justify="center" style={{ paddingTop: "20px" }}>
        <Card
          style={{
            backgroundColor: "#FFFDF5",
            width: "90%",
          }}
        >
          <Steps current={current} items={items} direction="horizontal" />
          <div>{steps[current].content}</div>
          <Row style={{ marginTop: 24 }}>
            {current < steps.length - 1 &&
              formData.announcementTypeId !== "" && (
                <CustomButton type="primary" onClick={() => next()}>
                  Далее
                </CustomButton>
              )}
            <Space>
              {current === steps.length - 1 && (
                <CustomButton type="primary" onClick={() => createButton()}>
                  Создать
                </CustomButton>
              )}
              {current > 0 && (
                <CustomButton onClick={() => prev()}>Назад</CustomButton>
              )}
            </Space>
          </Row>
        </Card>
      </Row>
    </Layout>
  );
};

export default AnnouncementNew;
