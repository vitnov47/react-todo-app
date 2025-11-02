import { Space, Modal, Card } from "antd";
import useTasks from "../context/useTasks";
import { useState } from "react";
import ModalEdit from "./ModalEdit";
import ActiveCard from "./ActiveCard";
import FinishedCard from "./FinishedCard";
import DeletedCard from "./DeletedCard";

export default function CardList() {
  const { tasks, setTasks } = useTasks();
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState();
  const [activeTabKey, setActiveTabKey] = useState("active");

  const tabListNoTitle = [
    {
      key: "active",
      label: "Активные",
    },
    {
      key: "finished",
      label: "Выполненные",
    },
    {
      key: "deleted",
      label: "Удаленные",
    },
  ];

  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  const tabsContent = {
    active: (
      <Space direction="vertical" style={{ width: "100%" }} size="middle">
        {tasks
          .filter((task) => task.status === "active")
          .map((task) => {
            return (
              <ActiveCard
                key={task.id}
                tasks={tasks}
                setTasks={setTasks}
                task={task}
                setModalOpen={setModalOpen}
                setEditId={setEditId}
              />
            );
          })}
        <Modal
          closable={{ "aria-label": "Custom Close Button" }}
          open={modalOpen}
          onCancel={() => setModalOpen(false)}
          footer={null}
        >
          <ModalEdit onClose={() => setModalOpen(false)} editId={editId} />
        </Modal>
      </Space>
    ),
    finished: (
      <Space direction="vertical" style={{ width: "100%" }} size="middle">
        {tasks
          .filter((task) => task.status === "finished")
          .map((task) => {
            return <FinishedCard key={task.id} task={task} />;
          })}
      </Space>
    ),
    deleted: (
      <Space direction="vertical" style={{ width: "100%" }} size="middle">
        {tasks
          .filter((task) => task.status === "deleted")
          .map((task) => {
            return (
              <DeletedCard
                key={task.id}
                task={task}
                tasks={tasks}
                setTasks={setTasks}
              />
            );
          })}
      </Space>
    ),
  };

  return (
    <Card
      style={{ width: "30%" }}
      tabList={tabListNoTitle}
      activeTabKey={activeTabKey}
      tabBarExtraContent={<a href="#">More</a>}
      onTabChange={onTabChange}
      tabProps={{
        size: "middle",
      }}
    >
      {tabsContent[activeTabKey]}
    </Card>
  );
}
