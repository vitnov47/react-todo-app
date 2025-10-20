import {
  Form,
  Input,
  Button,
  Flex,
  Typography,
  Divider,
  Select,
  DatePicker,
} from "antd";
import {
  FileAddOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import SelectNote from "./SelectNote";

export default function FormTask({ onClose }) {
  const [form] = Form.useForm();

  return (
    <>
      <Flex gap="5px">
        <FileAddOutlined style={{ fontSize: "2rem", color: "#078ff0" }} />
        <Typography.Title level={2} style={{ marginBottom: 0 }}>
          Новая задача
        </Typography.Title>
      </Flex>

      <Divider />

      <Form layout={"vertical"} form={form}>
        <Form.Item label="Название задачи">
          <Input
            prefix={<EditOutlined />}
            placeholder="Название задачи"
            defaultValue="Помочь маме"
            allowClear
          />
        </Form.Item>

        <Form.Item label="Приоритет">
          <Select
            prefix={<ExclamationCircleOutlined />}
            defaultValue="Низкий"
            options={[
              {
                value: "low",
                label: "Низкий",
              },
              { value: "middle", label: "Средний" },
              { value: "high", label: "Высокий" },
              {
                value: "unbelievable",
                label: "Ну капец какой",
              },
            ]}
          />
        </Form.Item>

        <Form.Item label="Сроки выполнения">
          <DatePicker.RangePicker
            placeholder={["Старт", "Окончание"]}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item label="Пометка">
          <SelectNote />
        </Form.Item>

        <Flex justify="flex-end" gap="small">
          <Button onClick={onClose}>Отмена</Button>
          <Button type="primary">Добавить</Button>
        </Flex>
      </Form>
    </>
  );
}
