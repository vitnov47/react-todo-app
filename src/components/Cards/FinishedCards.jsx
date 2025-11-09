import { Card, Space, Typography, Flex, Divider } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import { defineIcon, Quote } from "../../utils";
import { motion } from "framer-motion";
import useTasks from "../../context/useTasks";
import "../../styles/cardStyle.css";

export default function FinishedCards() {
  const { tasks } = useTasks();
  return tasks.filter((task) => task.status === "finished").length > 0 ? (
    <Space direction="vertical" style={{ width: "100%" }} size="middle">
      {tasks
        .filter((task) => task.status === "finished")
        .map((task) => {
          return (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card key={task.id} className={"finished-card"}>
                <Flex align="center">
                  {defineIcon(task)}
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
              </Card>
            </motion.div>
          );
        })}
    </Space>
  ) : (
    <Quote />
  );
}
