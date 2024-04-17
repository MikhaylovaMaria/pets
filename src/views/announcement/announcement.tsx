import React, { useState } from "react";
import { Layout } from "../../components/layout/layout";
import { Card, Row, Space, Steps, message } from "antd";
import CustomSelect from "../../components/FormCustom/custom-select/customSelect";
import CustomTextAria from "../../components/FormCustom/custom-textAria.tsx/customTextAria";
import { CustomButton } from "../../components/FormCustom/custom-button/customButton";
import { optionsAnnouncement } from "../../utils/helperData";
import CustomUpload from "../../components/FormCustom/custom-upload/customUpload";
import { MapComponent } from "../../components/MapComponent/map";
import { MapComponent1 } from "../../components/MapComponent/index1";

interface FormData {
  type: string;
  description: string;
  place: string;
  photos?: File[];
  date: string;
}

const AnnouncementNew = () => {
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    type: "",
    description: "",
    place: "",
    photos: [],
    date: "",
  });
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const handleChange = (name: string, value: any) => {
    setFormData({ ...formData, [name]: value });
  };

  const steps = [
    {
      title: "First",
      content: (
        <CustomSelect
          label="Выберите тип объявления"
          name="type"
          options={optionsAnnouncement}
          onChange={(value) => handleChange("type", value)}
        />
      ),
      style: {
        background: "#556B2F",
      },
    },
    {
      title: "Second",
      content: (
        <>
          <CustomTextAria
            label={
              formData.type === "Пропало животное"
                ? "Опишите пропавшее животное как можно подробней"
                : formData.type === "Найдено животное"
                ? "Опишите найденное животное как можно подробней"
                : formData.type === "Нужна передержка"
                ? "Опишите животное как можно подробней, а также необходимые условия для передержки"
                : "пишите проблему, с которой вы столкнулись как можно подробней"
            }
            name="description"
            onChange={(value) => handleChange("description", value)}
          />
          <CustomUpload
            onFileChange={(files) => handleChange("photos", files)}
          />
          <div> выбор места</div>
        </>
      ),
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <Layout>
      <MapComponent1/>
    </Layout>
  );
};

export default AnnouncementNew;

/* <Row align="middle" justify="center" style={{ paddingTop: "20px" }}>
<Card
  style={{
    backgroundColor: "#D2B48C",
    width: "50vw",
  }}
>
  <Steps current={current} items={items} />
  <div>{steps[current].content}</div>
  <Row style={{ marginTop: 24 }}>
    {current < steps.length - 1 && formData.type !== "" && (
      <CustomButton type="primary" onClick={() => next()}>
        Далее
      </CustomButton>
    )}
    <Space>
      {current === steps.length - 1 && (
        <CustomButton
          type="primary"
          onClick={() => message.success("Processing complete!")}
        >
          Создать
        </CustomButton>
      )}
      {current > 0 && (
        <CustomButton onClick={() => prev()}>Назад</CustomButton>
      )}
    </Space>
  </Row>
</Card>
</Row> */
