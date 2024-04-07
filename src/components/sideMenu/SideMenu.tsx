import { Card, Col, Row, Space } from "antd";
import React, { useState } from "react";
import { CustomRadio } from "../FormCustom/custom-radio/radio-button";
import type { RadioChangeEvent } from "antd";
import { CustomButton } from "../FormCustom/custom-button/customButton";
import CustomModal from "../modal/modal";
import { Paths } from "../../path";
import { Link } from "react-router-dom";

const SideMenu: React.FC = () => {
  const theme = [
    { id: 0, value: "Нужна помощь" },
    { id: 1, value: "Потерялись" },
    { id: 2, value: "Найдены" },
    { id: 3, value: "Нужна передержка" },
  ];
  const [value, setValue] = useState(theme[0].id);
  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Card
      bordered={false}
      style={{
        backgroundColor: "#D2B48C",
        height: "10vh",
        width: "100vw",
        borderRadius: "0",
        position: "relative",
      }}
    >
      <Row style={{padding:"0"}}>
        <Space>
          <CustomRadio name="меню"values={theme} onChange={onChange} initValue={value} />
          <CustomButton type="primary">
            <Link to={Paths.announcement}> Создать</Link>
          </CustomButton>
          <CustomModal
            isModalOpen={isModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
          />
        </Space>
      </Row>
    </Card>
  );
};

export default SideMenu;
