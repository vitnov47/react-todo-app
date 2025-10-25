import { Flex, Typography, Divider, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";
import ModalForm from "./ModalForm";

export default function ModalEdit({ onClose, editId }) {
  return (
    <>
      <Flex gap="5px">
        <EditOutlined style={{ fontSize: "2rem", color: "#078ff0" }} />
        <Typography.Title level={2} style={{ marginBottom: 0 }}>
          Что-то изменилось?
        </Typography.Title>
      </Flex>

      <Divider />

      <ModalForm onClose={onClose} type="edit" editId={editId} />
    </>
  );
}
