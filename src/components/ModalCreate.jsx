import { Flex, Typography, Divider } from "antd";
import { FileAddOutlined } from "@ant-design/icons";

import ModalForm from "./ModalForm";

export default function ModalCreate({ onClose }) {
  return (
    <>
      <Flex gap="5px">
        <FileAddOutlined style={{ fontSize: "2rem", color: "#078ff0" }} />
        <Typography.Title level={2} style={{ marginBottom: 0 }}>
          Новое дельце
        </Typography.Title>
      </Flex>

      <Divider />

      <ModalForm onClose={onClose} type="create" />
    </>
  );
}
