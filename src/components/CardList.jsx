import {
  Card,
  Space,
  Typography,
  Flex,
  Divider,
  Button,
  Result,
  Modal,
} from "antd";
import {
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { definePriority } from "../utils";
import useTasks from "../context/useTasks";
import "../styles/cardStyle.css";
import { useState, useEffect } from "react";
import ModalEdit from "./ModalEdit";

export default function CardList() {
  const { tasks, setTasks } = useTasks();
  const [completedTasks, setCompletedTasks] = useState({});
  const [removalQueue, setRemovalQueue] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState();

  useEffect(() => {
    if (removalQueue.length > 0) {
      const taskId = [removalQueue[0]];

      const removeWithDelay = () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            removeTask(taskId);
            resolve();
          }, 1000);
        });
      };

      removeWithDelay().then(() => setRemovalQueue((prev) => prev.slice(1)));
    }
  }, [removalQueue]);

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  const removeTask = (removeId) => {
    setTasks(tasks.filter((task) => task.id != removeId));
  };

  const editTask = (editId) => {
    setEditId(editId);
    setModalOpen(true);
  };

  const completeTask = (completeId) => {
    setCompletedTasks((prev) => ({ ...prev, [completeId]: true }));
    setRemovalQueue((prev) => [...prev, completeId]);
  };

  return (
    <Space direction="vertical" style={{ width: "30%" }} size="middle">
      {tasks.map((task) => {
        const priorityInfo = definePriority(task.priority);
        return (
          <Card
            onClick={() => completeTask(task.id)}
            actions={
              completedTasks[task.id]
                ? []
                : [
                    <Button
                      color="purple"
                      variant="outlined"
                      onClick={(e) => {
                        stopPropagation(e);
                        editTask(task.id);
                      }}
                      style={{ width: "80%  " }}
                    >
                      <EditOutlined />
                    </Button>,
                    <Button
                      color="danger"
                      variant="outlined"
                      onClick={(e) => {
                        stopPropagation(e);
                        removeTask(task.id);
                      }}
                      style={{
                        width: "80%",
                      }}
                    >
                      <DeleteOutlined />
                    </Button>,
                  ]
            }
            key={task.id}
            hoverable
            style={{
              border: `${priorityInfo.color} 2px solid`,
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
                  {priorityInfo.icon}
                  <Divider type="vertical" style={{ height: "6rem" }} />
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Typography.Title
                      level={4}
                      style={{
                        textAlign: "center",
                        marginBottom: 0,
                      }}
                    >
                      {task.name}
                    </Typography.Title>
                    <Typography.Text>
                      <span style={{ fontWeight: 700 }}>Приоритет:</span>{" "}
                      <span style={{ color: priorityInfo.color }}>
                        {priorityInfo.priorityName}
                      </span>
                    </Typography.Text>
                    <Typography.Text>
                      <span style={{ fontWeight: 700 }}>Дата:</span>{" "}
                      {task.startDate} - {task.endDate}
                    </Typography.Text>
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
                  </Space>
                </Flex>

                <div className="completed-text">Выполнено?</div>
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
  );
}
