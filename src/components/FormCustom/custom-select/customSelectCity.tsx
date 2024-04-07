import React, { useEffect } from "react";
import { Form, Select } from "antd";
import type { SelectProps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { citiesAll, fetchCities } from "../../../redux/slices/defaultValues";

// const handleChange = (value: string) => {
//   console.log(`selected ${value}`);
// };

const CustomSelectCity: React.FC = () => {
  const dispatch = useDispatch<any>();
  const cities = useSelector(citiesAll);
  useEffect(() => {
    dispatch(fetchCities());
  }, []);
  const options: SelectProps["options"] = cities
    ? cities.map((city) => ({
        label: city.cityName,
        value: city.cityId,
      }))
    : [];

  return (
    <Form.Item name="cityId">
      <Select
        showSearch
        placeholder="Город"
        style={{ width: "100%" }}
        options={options}
        filterOption={(input: string, option: any) =>
          option?.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      />
    </Form.Item>
  );
};

export default CustomSelectCity;
