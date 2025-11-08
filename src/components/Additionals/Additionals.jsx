import {
  Space,
  Progress,
  Typography,
  Calendar,
  Badge,
  Button,
  Tooltip,
} from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import useTasks from "../../context/useTasks";
import dayjs from "dayjs";

export default function Additionals() {
  const { tasks } = useTasks();
  const active = tasks.filter((task) => task.status === "active").length;
  const finished = tasks.filter((task) => task.status === "finished").length;
  const percent = (finished / (finished + active)) * 100;

  const getBadge = (priority) => {
    if (priority === "low") return "success";
    else if (priority === "middle") return "warning";
    else return "error";
  };

  const getListData = (value) => {
    return tasks
      .filter(
        (task) =>
          dayjs(task.endDate).isSame(value, "day") && task.status === "active"
      )
      .map((task) => ({ name: task.name, type: getBadge(task.priority) }));
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    if (!listData.length) return null;

    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
        }}
      >
        {listData.map((item) => (
          <Tooltip key={item.name + item.type} title={item.name}>
            <Badge status={item.type} />
          </Tooltip>
        ))}
      </div>
    );
  };

  return (
    <Space
      direction="vertical"
      style={{
        marginLeft: "2rem",
        backdropFilter: "saturate(85%)",
        borderRadius: 10,
        padding: 14,
        width: "60%",
      }}
    >
      <Typography.Text style={{ color: "white" }}>
        Прогресс выполнения
      </Typography.Text>
      <Progress
        style={{ marginBottom: 15 }}
        size={[300, 30]}
        percent={percent}
        strokeColor={{
          "0%": "#108ee9",
          "100%": "#87d068",
        }}
        trailColor="#e4e4e4ff"
        percentPosition={{ align: "center", type: "inner" }}
      />
      <Typography.Text style={{ color: "white" }}>
        Напоминалочка
      </Typography.Text>
      <Calendar
        cellRender={dateCellRender}
        fullscreen={false}
        headerRender={({ value, onChange }) => {
          const currentMonth = value.format("MMMM");
          const currentYear = value.format("YYYY");

          const goToMonth = (direction) => {
            const newValue = value.add(direction, "month");
            onChange(newValue);
          };

          return (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Button
                type="text"
                icon={<LeftOutlined style={{ color: "#000" }} />}
                onClick={() => goToMonth(-1)}
                style={{ color: "white", marginLeft: 20 }}
              />
              <Typography.Title
                level={5}
                style={{
                  color: "#000",
                  margin: 0,
                  textTransform: "capitalize",
                }}
              >
                {currentMonth} {currentYear}
              </Typography.Title>
              <Button
                type="text"
                icon={<RightOutlined style={{ color: "#000" }} />}
                onClick={() => goToMonth(1)}
                style={{ color: "white", marginRight: 20 }}
              />
            </div>
          );
        }}
      />
    </Space>
  );
}
