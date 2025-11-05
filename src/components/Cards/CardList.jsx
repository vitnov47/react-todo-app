import { Space, Modal, Card, Typography, Input } from "antd";
import { useState } from "react";
import useTasks from "../../context/useTasks";
import ModalEdit from "../Modals/ModalEdit";
import ActiveCard from "./ActiveCard";
import FinishedCard from "./FinishedCard";
import DeletedCard from "./DeletedCard";
import { definePriority, Quote } from "../../utils";

export default function CardList() {
  const { tasks, setTasks } = useTasks();
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState();
  const [activeTabKey, setActiveTabKey] = useState("active");
  const [search, setSearch] = useState("");

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

  const onChange = (value) => {
    setSearch(value.currentTarget.value);
  };

  const tabsContent = {
    active:
      tasks.filter((task) => task.status === "active").length > 0 ? (
        <Space direction="vertical" style={{ width: "100%" }} size="middle">
          <Input
            placeholder="Поиск"
            allowClear
            onChange={(value) => onChange(value)}
          />
          {tasks
            .filter((task) => task.status === "active")
            .filter((task) =>
              task.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((task) => {
              return (
                <ActiveCard
                  key={task.id}
                  tasks={tasks}
                  setTasks={setTasks}
                  task={definePriority(task)}
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
      ) : (
        <Space direction="vertical">
          <Typography.Text>Все задания выполнены.</Typography.Text>
          <Typography.Text>Начнем что-то новое?</Typography.Text>
        </Space>
      ),
    finished:
      tasks.filter((task) => task.status === "finished").length > 0 ? (
        <Space direction="vertical" style={{ width: "100%" }} size="middle">
          {tasks
            .filter((task) => task.status === "finished")
            .map((task) => {
              return <FinishedCard key={task.id} task={definePriority(task)} />;
            })}
        </Space>
      ) : (
        <Quote />
      ),
    deleted:
      tasks.filter((task) => task.status === "deleted").length > 0 ? (
        <Space direction="vertical" style={{ width: "100%" }} size="middle">
          {tasks
            .filter((task) => task.status === "deleted")
            .map((task) => {
              return (
                <DeletedCard
                  key={task.id}
                  task={definePriority(task)}
                  tasks={tasks}
                  setTasks={setTasks}
                />
              );
            })}
        </Space>
      ) : (
        <Typography>Не припомню, чтобы вы что-то удаляли.</Typography>
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
