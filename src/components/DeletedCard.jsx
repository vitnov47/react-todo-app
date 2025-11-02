import { Card, Space, Typography, Flex, Divider } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import "../styles/cardStyle.css";
import { definePriority } from "../utils";

export default function DeletedCard({ task, tasks, setTasks }) {
  const priorityInfo = definePriority(task.priority);

  const returnTask = (returnId) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === returnId) {
          return { ...task, status: "active" };
        }
        return task;
      })
    );
  };

  return (
    <Card
      key={task.id}
      onClick={() => returnTask(task.id)}
      className={"deleted-card"}
      hoverable
    >
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
            <span>{priorityInfo.priorityName}</span>
          </Typography.Text>
          <Typography.Text>
            <span style={{ fontWeight: 700 }}>Дата:</span> {task.startDate} -{" "}
            {task.endDate}
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
      <div className="return-text">Вернуть?</div>
    </Card>
  );
}
