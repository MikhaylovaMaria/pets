import React from "react";
import { Form, Input } from "antd";

type Props = {
  label: string;
  name: string;
  onChange: (value: string) => void;
};

const CustomTextAria = ({ label, name, onChange }: Props) => {
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value); // Вызываем переданную функцию обратного вызова
  };
  return (
    <Form.Item
      name={name}
      label={label}
      rules={[{ required: true, message: "Обязательное поле" }]}
    >
      <Input.TextArea onChange={handleTextAreaChange} />
    </Form.Item>
  );
};

export default CustomTextAria;
