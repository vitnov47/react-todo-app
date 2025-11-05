import {
  Card,
  Space,
  Typography,
  Flex,
  Divider,
  Button,
  Result,
  Modal,
  Input,
} from "antd";
import {
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import "../../styles/cardStyle.css";
import ModalEdit from "../Modals/ModalEdit";
import useTasks from "../../context/useTasks";
import { definePriority } from "../../utils";
import { useState } from "react";

export default function ActiveCards() {
  const { tasks, setTasks } = useTasks();
  const [completedTasks, setCompletedTasks] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState();
  const [search, setSearch] = useState("");

  const onChange = (value) => {
    setSearch(value.currentTarget.value);
  };

  const deleteTask = (deleteId, event) => {
    if (event) {
      event.stopPropagation();
    }
    setTasks(
      tasks.map((task) => {
        if (task.id === deleteId) {
          return { ...task, status: "deleted" };
        }
        return task;
      })
    );
  };

  const editTask = (editId, event) => {
    event.stopPropagation();
    setEditId(editId);
    setModalOpen(true);
  };

  const completeTask = (completeId) => {
    setCompletedTasks((prev) => ({ ...prev, [completeId]: true }));
    setTimeout(() => {
      setTasks(
        tasks.map((task) => {
          if (task.id === completeId) {
            return { ...task, status: "finished" };
          }
          return task;
        })
      );
    }, 1000);
  };

  return tasks.filter((task) => task.status === "active").length > 0 ? (
    <Space direction="vertical" style={{ width: "100%" }} size="middle">
      <Input
        size="large"
        placeholder="Поиск"
        allowClear
        onChange={(value) => onChange(value)}
      />
      {tasks
        .filter(
          (task) =>
            task.status === "active" &&
            task.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((preTask) => {
          const task = definePriority(preTask);
          return (
            <Card
              onClick={() => completeTask(task.id)}
              key={task.id}
              hoverable
              style={{
                border: `${task.color} 2px solid`,
              }}
              className={`task-card ${
                completedTasks[task.id] ? "completed" : ""
              }`}
            >
              {completedTasks[task.id] ? (
                <Result
                  status="success"
                  title="Выполнено"
                  subTitle="Продолжайте в том же духе"
                />
              ) : (
                <>
                  <Flex align="center">
                    {task.icon}
                    <Divider type="vertical" style={{ height: "6rem" }} />
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <Typography.Title
                        level={3}
                        style={{
                          textAlign: "center",
                          marginBottom: 10,
                        }}
                      >
                        {task.name}
                      </Typography.Title>
                      <Typography.Text>
                        <span style={{ fontWeight: 700 }}>Приоритет:</span>{" "}
                        <span style={{ color: task.color }}>
                          {task.priorityName}
                        </span>
                      </Typography.Text>
                      <Typography.Text>
                        <span style={{ fontWeight: 700 }}>Дата:</span>{" "}
                        {task.startDate} - {task.endDate}
                      </Typography.Text>
                      {task.note && (
                        <Typography.Text>
                          <span style={{ fontWeight: 900 }}>
                            <CommentOutlined
                              style={{
                                width: "1rem",
                                height: "1rem",
                              }}
                            />
                            :
                          </span>{" "}
                          <span style={{ marginLeft: 1 }}>{task.note}</span>
                        </Typography.Text>
                      )}
                    </Space>
                  </Flex>
                  <div className="completed-text">Выполнено?</div>
                  <Button
                    color="danger"
                    variant="outlined"
                    onClick={(e) => deleteTask(task.id, e)}
                    className="completed-button"
                  >
                    <DeleteOutlined style={{ fontSize: 16 }} />
                  </Button>
                  <Button
                    color="purple"
                    variant="outlined"
                    onClick={(e) => editTask(task.id, e)}
                    className="completed-button"
                  >
                    <EditOutlined style={{ fontSize: 16 }} />
                  </Button>
                </>
              )}
            </Card>
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
  );
}
