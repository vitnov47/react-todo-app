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

  const removeTask = (removeId, event) => {
    if (event) {
      event.stopPropagation();
    }
    setTasks(tasks.filter((task) => task.id != removeId));
  };

  const editTask = (editId, event) => {
    event.stopPropagation();
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
            key={task.id}
            hoverable
            style={{
              paddingTop: "10px !important",
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
                      <span style={{ color: priorityInfo.color }}>
                        {priorityInfo.priorityName}
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
                  onClick={(e) => removeTask(task.id, e)}
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
  );
}
