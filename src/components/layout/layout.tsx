import { Layout as AntLayout } from "antd";
import styles from "./index.module.css";
import CustomBreadcrumb from "../header/header";

type Props = {
  children: React.ReactNode;
  headerView?: boolean;
};
export const Layout = ({ children, headerView }: Props) => {
  return (
    <div className={styles.main}>
      {!headerView && <CustomBreadcrumb />}
      <AntLayout.Content style={{ height: "100%", width: "100%" }}>
        {children}
      </AntLayout.Content>
    </div>
  );
};
