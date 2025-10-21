import { Layout, Typography, Button, Modal } from "antd";
import { UnorderedListOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import FormTask from "../FormTask";

export default function AppHeader() {
  const [modalOpen, setModalOpen] = useState(false);

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingInline: "3rem",
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
      >
        Добавить задачу
      </Button>

      <Modal
        closable={{ "aria-label": "Custom Close Button" }}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        <FormTask
          onClose={() => {
            setModalOpen(false);
          }}
        />
      </Modal>
    </Layout.Header>
  );
}
