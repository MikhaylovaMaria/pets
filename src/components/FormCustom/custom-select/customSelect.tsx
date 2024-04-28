import React, { ReactNode } from "react";
import { Form, Select } from "antd";

export type ThemeItem = {
  id: string | number;
  value: string;
};

type Props = {
  label?: string | ReactNode;
  options: ThemeItem[];
  onChange: (value: string) => void;
  name: string;
  defaultValue?: ThemeItem;
};

const CustomSelect = ({
  label,
  options,
  onChange,
  name,
  defaultValue,
}: Props) => {
  const handleSelectChange = (value: string) => {
    onChange(value);
  };
  return (
    <Form.Item
      name={name}
      label={label}
      rules={[{ required: true, message: "Обязательное поле" }]}
    >
      <Select
        onChange={handleSelectChange}
        style={{ width: "max-content" }}
        defaultValue={defaultValue?.value}
      >
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
