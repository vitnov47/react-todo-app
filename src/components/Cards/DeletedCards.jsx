import { Card, Space, Typography, Flex, Divider } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { defineIcon } from "../../utils";
import useTasks from "../../context/useTasks";
import "../../styles/cardStyle.css";

export default function DeletedCards() {
  const { tasks, setTasks } = useTasks();

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

  return tasks.filter((task) => task.status === "deleted").length > 0 ? (
    <Space direction="vertical" style={{ width: "100%" }} size="middle">
      <AnimatePresence>
        {tasks
          .filter((task) => task.status === "deleted")
          .map((task) => {
            return (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  key={task.id}
                  onClick={() => returnTask(task.id)}
                  className={"deleted-card"}
                  hoverable
                >
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
                  <div className="return-text">Вернуть?</div>
                </Card>
              </motion.div>
            );
          })}
      </AnimatePresence>
    </Space>
  ) : (
    <Typography>Не припомню, чтобы вы что-то удаляли.</Typography>
  );
}
