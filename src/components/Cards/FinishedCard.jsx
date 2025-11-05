import { Card, Space, Typography, Flex, Divider } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import "../../styles/cardStyle.css";

export default function FinishedCard({ task }) {
  return (
    <Card key={task.id} className={"finished-card"}>
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
            <span>{task.priorityName}</span>
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
    </Card>
  );
}
