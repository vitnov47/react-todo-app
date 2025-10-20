import { Card, Space, Typography, Flex, Divider } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import useTasks from "../../useTasks";
import { defineIcon } from "../../utils";

export default function AppContent() {
  const { tasks } = useTasks();

  // КАКОГО КАРТОЧКИ В КОНТЕНТЕ ЛЕЖАТ НЕ ВНУТРИ LAYOUT???
  // ДА И УКРАСИТЬ БЫ ИХ НЕ ПОМЕШАЛО - ОБВОДКА, ЦВЕТ ПРИОРИТЕТА
  // ТАКЖЕ РАЗОБРАТЬСЯ С ОТСТУПАМИ И РАЗМЕРАМИ КАРТОЧЕК - УСТРАИВАЕТ ЛИ МЕНЯ ЭТО?

  return (
    <Space direction="vertical">
      {tasks.map((task) => {
        return (
          <Card key={task.name} hoverable>
            <Flex align="center">
              {defineIcon(task.priority)}
              <Divider type="vertical" style={{ height: "3.5rem" }} />
              <Space direction="vertical">
                <Typography.Title level={5}>{task.name}</Typography.Title>
                <Typography.Text>Приоритет: {task.priority}</Typography.Text>
                <Typography.Text>
                  Дата: {task.startDate} - {task.endDate}
                </Typography.Text>
                <Typography.Text>
                  <CommentOutlined style={{ marginRight: 10 }} />
                  {task.note}
                </Typography.Text>
              </Space>
            </Flex>
          </Card>
        );
      })}
    </Space>
  );
}
