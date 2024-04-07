import { Form, Input } from "antd";

type Props = {
  name: string;
  placeholder?: string;
  type?: string;
  prefix?: React.ReactNode;
};

export const CustomInput = ({
  name,
  placeholder,
  type = "text",
  prefix,
}: Props) => {
  return (
    <Form.Item
      name={name}
      shouldUpdate={true}
      rules={[{ required: true, message: "Обязательное поле" }]}
    >
      <Input
        prefix={prefix}
        placeholder={placeholder}
        type={type}
        size="large"
        style={{ backgroundColor: "#ffffff" }}
      />
    </Form.Item>
  );
};
