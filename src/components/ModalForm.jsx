import { Form, Input, Button, Flex, Select, DatePicker } from "antd";
import { useState, useEffect } from "react";
import { EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import SelectNote from "./SelectNote";
import useTasks from "../context/useTasks";

export default function ModalForm({ onClose, type, editId }) {
  const [form] = Form.useForm();
  const [priority, setPriority] = useState("low");
  const [note, setNote] = useState();
  const { tasks, addTask } = useTasks();
  let oldTask = {};

  useEffect(() => {
    if (editId) {
      oldTask = tasks.find((task) => task.id === editId);
      if (oldTask) {
        console.log(oldTask);
        form.setFieldsValue({
          name: oldTask.name,
          priority: oldTask.priority,
          dates: 0,
          // dates: [
          //   moment(oldTask.startDate, "DD-MM-YYYY"),
          //   moment(oldTask.endDate, "DD-MM-YYYY"),
          // ],
          note: oldTask.note,
        });
        setPriority(oldTask.priority);
        setNote(oldTask.note);
      }
    }
  }, [editId]);

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
    if (type === "create") {
      const task = {
        id: crypto.randomUUID(),
        name: values.name,
        priority: priority,
        startDate: values.dates[0].format("DD-MM-YYYY"),
        endDate: values.dates[1].format("DD-MM-YYYY"),
        note: note,
      };
      addTask(task);
    }
    onClose();
  };

  return (
    <Form
      layout={"vertical"}
      form={form}
      onFinish={onFinish}
      initialValues={{ priority: "Низкий" }}
    >
      <Form.Item label="Название задачи" name="name">
        <Input
          prefix={<EditOutlined style={{ marginRight: 7 }} />}
          placeholder="Позвонить родным?"
          allowClear
        />
      </Form.Item>

      <Form.Item label="Приоритет" name="priority">
        <Select
          prefix={<ExclamationCircleOutlined style={{ marginRight: 7 }} />}
          placeholder="Приоритет"
          onChange={setPriority}
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

      <Form.Item label="Сроки выполнения" name="dates">
        <DatePicker.RangePicker
          placeholder={["Старт", "Окончание"]}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item label="Пометка" name="note">
        {oldTask ? (
          <SelectNote setNote={setNote} oldNote={oldTask.note} />
        ) : (
          <SelectNote setNote={setNote} />
        )}
      </Form.Item>

      <Flex justify="flex-end" gap="small">
        <Button onClick={onClose}>Отмена</Button>
        <Button
          onClick={onReset}
          color="primary"
          variant="outlined"
          htmlType="reset"
        >
          Очистить
        </Button>
        {type === "create" ? (
          <Button type="primary" htmlType="submit">
            Добавить
          </Button>
        ) : (
          <Button type="primary" htmlType="submit">
            Изменить
          </Button>
        )}
      </Flex>
    </Form>
  );
}
