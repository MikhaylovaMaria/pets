import React from "react";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";

const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
  current,
  pageSize
) => {
  console.log(current, pageSize);
};

const onChange: PaginationProps["onChange"] = (pageNumber) => {
  console.log("Page: ", pageNumber);
};

const PaginationFoot: React.FC = () => (
  <Pagination
    showSizeChanger={false}
    onShowSizeChange={onShowSizeChange}
    defaultCurrent={1}
    total={13}
    onChange={onChange}
  />
);

export default PaginationFoot;
