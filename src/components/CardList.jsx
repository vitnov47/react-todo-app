import { Card, Space, Typography, Flex, Divider } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import { definePriority } from "../utils";
import useTasks from "../context/useTasks";
import "../styles/cardStyle.css";

export default function CardList() {
  const { tasks } = useTasks();
  return (
    <Space direction="vertical" style={{ width: "30%" }} size="middle">
      {tasks.map((task) => {
        const priorityInfo = definePriority(task.priority);
        return (
          <Card
            key={task.id}
            hoverable
            style={{
              border: `${priorityInfo.color} 2px solid`,
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            className="task-card"
          >
            <Flex align="center">
              {priorityInfo.icon}
              <Divider type="vertical" style={{ height: "6rem" }} />
              <Space direction="vertical" style={{ width: "100%" }}>
                <Typography.Title
                  level={4}
                  style={{ textAlign: "center", marginBottom: 0 }}
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
          </Card>
        );
      })}
    </Space>
  );
}
