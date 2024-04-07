import { Button, Form } from "antd";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  htmlType?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  type?: "link" | "text" | "default" | "primary" | "dashed" | undefined;
  danger?: boolean;
  loading?: boolean;
  shape?: "default" | "circle" | "round" | undefined;
  icon?: React.ReactNode;
  color?: string;
  backgroundColor?: string;
  size?: "large" | "middle" | "small";
  className?: any;
};

export const CustomButton = ({
  children,
  htmlType = "button",
  type,
  danger,
  loading,
  shape,
  icon,
  onClick,
  color,
  backgroundColor,
  size,
  className,
}: Props) => {
  return (
    <Form.Item>
      <Button
        htmlType={htmlType}
        type={type}
        danger={danger}
        loading={loading}
        shape={shape}
        icon={icon}
        onClick={onClick}
        style={{ color: color, background: backgroundColor }}
        size={size}
        className={className}
      >
        {children}
      </Button>
    </Form.Item>
  );
};
