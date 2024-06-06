import React from "react";
import { Form, Input } from "antd";

type Props = {
  label?: string | React.ReactNode;
  name: string;
  onChange: (value: string) => void;
  maxLength?: number;
  minRow?: number;
  maxRows?: number;
  showCount?: boolean;
};

const CustomTextAria = ({
  label,
  name,
  onChange,
  maxLength,
  minRow,
  maxRows,
  showCount = false,
}: Props) => {
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value); // Вызываем переданную функцию обратного вызова
  };
  return (
    <Form.Item
      name={name}
      label={label}
      rules={[{ required: true, message: "Обязательное поле" }]}
    >
      <Input.TextArea
        onChange={handleTextAreaChange}
        autoSize={{ minRows: minRow, maxRows: maxRows }}
        showCount={showCount}
        maxLength={maxLength}
      />
    </Form.Item>
  );
};

export default CustomTextAria;
