import { Card, Space, Typography, Flex, Divider, Button, Result } from "antd";
import {
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import "../styles/cardStyle.css";

import { definePriority } from "../utils";
import { useState, useEffect } from "react";

export default function TaskCard({
  removeTask,
  task,
  setModalOpen,
  setEditId,
}) {
  const [completedTasks, setCompletedTasks] = useState({});
  const [removalQueue, setRemovalQueue] = useState([]);
  const priorityInfo = definePriority(task.priority);

  useEffect(() => {
    if (removalQueue.length > 0) {
      const taskId = [removalQueue[0]];
      const removeWithDelay = () => {
        setTimeout(() => {
          deleteTask(taskId);
        }, 1000);
      };

      removeWithDelay();
      setRemovalQueue((prev) => prev.slice(1));
    }
  }, [removalQueue]);

  const deleteTask = (removeId, event) => {
    if (event) {
      event.stopPropagation();
    }
    removeTask(removeId);
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
    <Card
      onClick={() => completeTask(task.id)}
      key={task.id}
      hoverable
      style={{
        paddingTop: "10px !important",
        border: `${priorityInfo.color} 2px solid`,
      }}
      className={`task-card ${completedTasks[task.id] ? "completed" : ""}`}
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
                <span style={{ fontWeight: 700 }}>Дата:</span> {task.startDate}{" "}
                - {task.endDate}
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
}
