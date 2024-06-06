import React from "react";
import { Button, Flex, Image, Modal, Space, Typography } from "antd";
import { Announment } from "../../types/types";

type Props = {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  announcement: Announment;
};
const CustomModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  announcement,
}: Props) => {
  return (
    <Modal
      title=<Flex justify="center">
        <Typography.Title level={4}>
          {announcement.announcementTitle}
        </Typography.Title>
      </Flex>
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      centered
      footer={<Button>Откликнуться</Button>}
    >
      <Flex>
        <Space direction="vertical">
          <Typography.Text>{announcement.description}</Typography.Text>
          {announcement.photos &&
            announcement.photos.length > 0 &&
            announcement.photos
              .slice(0, Math.ceil(announcement.photos.length / 2))
              .map((e) => (
                <Space.Compact key={e} size="small" direction="horizontal">
                  <Image src={e} width="50%" />
                  {announcement.photos.length > 1 && (
                    <Image
                      src={
                        announcement.photos[announcement.photos.indexOf(e) + 1]
                      }
                      width="50%"
                    />
                  )}
                </Space.Compact>
              ))}
        </Space>
      </Flex>
    </Modal>
  );
};

export default CustomModal;
