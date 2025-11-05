import { Layout, Typography, Button, Modal, Flex, Divider } from "antd";
import {
  UnorderedListOutlined,
  PlusOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import "../../styles/headerButton.css";
import ModalForm from "../Modals/ModalForm";

export default function AppHeader() {
  const [modalOpen, setModalOpen] = useState(false);

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingInline: "3rem",
    height: "8vh",
  };

  return (
    <Layout.Header style={headerStyle}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <UnorderedListOutlined style={{ color: "white" }} />
        <Typography.Title level={4} style={{ color: "white", margin: 10 }}>
          Мой список дел
        </Typography.Title>
      </div>

      <Button
        onClick={() => setModalOpen(true)}
        type="primary"
        shape="round"
        icon={<PlusOutlined />}
        size={"middle"}
        className="header-button"
        style={{ transition: "transform 0.2s ease, box-shadow 0.2s ease" }}
      >
        Добавить задачу
      </Button>

      <Modal
        closable={{ "aria-label": "Custom Close Button" }}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        <Flex gap="5px">
          <FileAddOutlined style={{ fontSize: "2rem", color: "#078ff0" }} />
          <Typography.Title level={2} style={{ marginBottom: 0 }}>
            Новое дельце
          </Typography.Title>
        </Flex>

        <Divider />

        <ModalForm onClose={() => setModalOpen(false)} type="create" />
      </Modal>
    </Layout.Header>
  );
}
