import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Modal, Space, Upload, message } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";

interface CustomUploadProps {
  onFileChange: (files: File[]) => void;
}

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const CustomUpload: React.FC<CustomUploadProps> = ({ onFileChange }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    const files = newFileList
      .filter((file) => !!file.originFileObj)
      .map((file) => file.originFileObj as File);
    onFileChange(files);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8, width: "10%" }}>Upload</div>
    </button>
  );
  return (
    <>
      <Form.Item>
        <Upload
          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          beforeUpload={(file, fileList) => {
            if (fileList.length + fileList.length > 5) {
              message.error("Вы можете загрузить максимум 5 фотографий");
              return false;
            }
            return true;
          }}
        >
          {fileList.length >= 5 ? null : uploadButton}
        </Upload>
      </Form.Item>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "90%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default CustomUpload;
