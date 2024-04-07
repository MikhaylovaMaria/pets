import React from "react";
import { Form, Select } from "antd";

type ThemeItem = {
  id: number;
  value: string;
};

type Props = {
  label: string;
  options: ThemeItem[];
  onChange: (value: string) => void;
  name: string;
};

const CustomSelect = ({ label, options, onChange, name }: Props) => {
  const handleSelectChange = (value: string) => {
    onChange(value);
  };
  return (
    <Form.Item
      name={name}
      label={label}
      rules={[{ required: true, message: "Обязательное поле" }]}
    >
      <Select onChange={handleSelectChange}>
        {options.map((v) => (
          <Select.Option key={v.id} value={v.value}>
            {v.value}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default CustomSelect;
