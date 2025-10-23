import { Card, Space, Typography, Flex, Divider, Button, Result } from "antd";
import {
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { definePriority } from "../utils";
import useTasks from "../context/useTasks";
import "../styles/cardStyle.css";

export default function CardList() {
  const { tasks, setTasks } = useTasks();

  const removeTask = (removeId) => {
    setTasks(tasks.filter((task) => task.id != removeId));
  };

  // const completeTask = (completeId) => {
  //   removeTask(completeId);
  //   return (
  //     <Result
  //       status="success"
  //       title="Successfully Purchased Cloud Server ECS!"
  //       subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
  //       extra={[
  //         <Button type="primary" key="console">
  //           Go Console
  //         </Button>,
  //         <Button key="buy">Buy Again</Button>,
  //       ]}
  //     />
  //   );
  // };

  // const editTask = (editId) => {
  //   tasks.map((task) => {
  //     if (task.id === editId){
  //     }
  //     return task
  //   })
  // };

  return (
    <Space direction="vertical" style={{ width: "30%" }} size="middle">
      {tasks.map((task) => {
        const priorityInfo = definePriority(task.priority);
        return (
          <Card
            //onClick={() => completeTask(task.id)}
            actions={[
              <Button
                color="purple"
                variant="outlined"
                onClick={() => editTask(task.id)}
                style={{ width: "80%  " }}
              >
                <EditOutlined />
              </Button>,
              <Button
                color="danger"
                variant="outlined"
                onClick={() => removeTask(task.id)}
                style={{
                  width: "80%",
                }}
              >
                <DeleteOutlined />
              </Button>,
            ]}
            key={task.id}
            hoverable
            style={{
              border: `${priorityInfo.color} 2px solid`,
            }}
            className="task-card"
          >
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
            <div className="completed-text">Выполнено</div>
          </Card>
        );
      })}
    </Space>
  );
}
