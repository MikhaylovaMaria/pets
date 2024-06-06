import { Radio, Form } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import "./customRadio.css";

type ThemeItem = {
  id: number | string;
  value: string;
};
type Props = {
  values: ThemeItem[];
  onChange?: (e: RadioChangeEvent) => void;
  initValue?: number | string;
  name: string;
};

export const CustomRadio = ({ values, onChange, initValue, name }: Props) => {
  return (
    <Form.Item name={name}>
      <Radio.Group
        onChange={onChange}
        value={initValue}
        size="large"
        defaultValue={initValue}
      >
        {values.map((el) => (
          <Radio key={el.id} value={el.id}>
            {el.value}
          </Radio>
        ))}
      </Radio.Group>
    </Form.Item>
  );
};
