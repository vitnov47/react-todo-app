import { Space, Modal, Card } from "antd";
import useTasks from "../context/useTasks";
import { useState } from "react";
import ModalEdit from "./ModalEdit";
import TaskCard from "./TaskCard";

export default function CardList() {
  const { tasks, removeTask } = useTasks();
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
        {tasks.map((task) => {
          return (
            <TaskCard
              key={task.id}
              tasks={tasks}
              removeTask={removeTask}
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
    finished: <p>Finished Tasks</p>,
    deleted: <p>Deleted Tasks</p>,
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
