import { Form, Input, Button, Flex, Select, DatePicker } from "antd";
import { useState, useEffect } from "react";
import { EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { definePriority } from "../../utils";
import SelectNote from "./SelectNote";
import useTasks from "../../context/useTasks";
import dayjs from "dayjs";

export default function ModalForm({ onClose, type, editId }) {
  const [form] = Form.useForm();
  const [priority, setPriority] = useState("low");
  const [note, setNote] = useState();
  const { tasks, addTask, setTasks } = useTasks();

  useEffect(() => {
    if (editId) {
      const oldTask = tasks.find((task) => task.id === editId);
      if (oldTask) {
        const startDate = dayjs(oldTask.startDate);
        const endDate = dayjs(oldTask.endDate);

        form.setFieldsValue({
          name: oldTask.name,
          priority: oldTask.priority,
          dates: [startDate, endDate],
          note: oldTask.note,
        });

        if (priority != oldTask.priority) {
          setPriority(oldTask.priority);
        }
        if (note != oldTask.note) {
          setNote(oldTask.note);
        }
      }
    }
  }, [editId]);

  const onReset = () => {
    form.resetFields();
    setPriority("low");
  };

  const onFinish = (values) => {
    const newTask = {
      name: values.name,
      priority: priority,
      startDate: values.dates[0].format("YYYY-MM-DD"),
      endDate: values.dates[1].format("YYYY-MM-DD"),
      note: note,
      status: "active",
    };

    if (type === "create") {
      newTask.id = crypto.randomUUID();
      addTask(definePriority(newTask));
    } else if (type === "edit") {
      const updatedTasks = tasks.map((task) => {
        if (task.id === editId) {
          return definePriority({ ...task, ...newTask });
        }
        return definePriority(task);
      });
      setTasks(updatedTasks);
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
      <Form.Item
        label="Название задачи"
        name="name"
        rules={[{ required: true, message: "Не забудьте назвать задачу" }]}
      >
        <Input
          prefix={<EditOutlined style={{ marginRight: 7 }} />}
          placeholder="Позвонить родным?"
          allowClear
        />
      </Form.Item>

      <Form.Item
        label="Приоритет"
        name="priority"
        rules={[{ required: true, message: "Выберите приоритет" }]}
      >
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

      <Form.Item
        label="Сроки выполнения"
        name="dates"
        rules={[{ required: true, message: "Уточните диапазон" }]}
      >
        <DatePicker.RangePicker
          placeholder={["Старт", "Окончание"]}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item label="Пометка" name="note">
        <SelectNote setNote={setNote} oldNote={note} />
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
