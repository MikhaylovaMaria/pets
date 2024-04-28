import { Button, Flex, Space, Typography } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import Search from "antd/es/input/Search";
import "./map.css";

import { announcementType } from "../../types/types";

interface SideMenuMapProps {
  onSearch: SearchProps["onSearch"];
  setSideMenu: (isOpen: boolean) => void;
  announmentTypes: announcementType[];
  currentTypeAnnoun: number;
  setCurrentTypeAnnoun: (id: number) => void;
}

const SideMenuMap: React.FC<SideMenuMapProps> = ({
  onSearch,
  setSideMenu,
  announmentTypes,
  currentTypeAnnoun,
  setCurrentTypeAnnoun,
}) => {
  return (
    <div className="SideBar">
      <Flex justify="center">
        <Search
          onSearch={onSearch}
          placeholder="Город"
          style={{
            marginTop: "20px",
            width: "90%",
          }}
        />
      </Flex>
      <Flex justify="center" align="flex-start">
        <Space direction="vertical">
          <div>
            <Space
              direction="vertical"
              style={{ padding: "0", marginTop: "10px" }}
            >
              <Typography.Text style={{ padding: "0", color: "#72675E" }}>
                Тип объявления
                <hr
                  style={{
                    width: "100%",
                    border: "0.1px solid #A79C93",
                  }}
                />
              </Typography.Text>

              <Space direction="vertical">
                {announmentTypes.length > 0 &&
                  announmentTypes.map((i) => (
                    <Button
                      onClick={() => setCurrentTypeAnnoun(i.announcementTypeId)}
                      className={
                        i.announcementTypeId === currentTypeAnnoun
                          ? "activeButton"
                          : "button"
                      }
                      key={i.announcementTypeId}
                    >
                      {i.announcementTypeName}
                    </Button>
                  ))}

                <hr
                  style={{
                    width: "100%",
                    border: "0.1px solid #A79C93",
                  }}
                />
              </Space>
            </Space>
          </div>
          <div>
            <Space direction="vertical" style={{ marginTop: "2%" }}>
              <Space direction="vertical">
                {/* <Button
                  style={{
                    color: "#72675E",
                    backgroundColor: "#FFBD6F",
                    border: "none",
                  }}
                >
                  <Typography.Text> Показать объявления</Typography.Text>
                </Button> */}
                <Button
                  onClick={() => setSideMenu(false)}
                  style={{ color: "#72675E", border: "1px solid #72675E" }}
                >
                  Закрыть
                </Button>
              </Space>
            </Space>
          </div>
        </Space>
      </Flex>
    </div>
  );
};

export default SideMenuMap;
