import { Card } from "antd";
import { useState } from "react";
import ActiveCards from "./ActiveCards";
import FinishedCards from "./FinishedCards";
import DeletedCards from "./DeletedCards";

export default function CardList() {
  const [activeTabKey, setActiveTabKey] = useState("active");

  const tabListNoTitle = [
    {
      key: "active",
      label: "Активные",
    },
    {
      key: "finished",
      label: "Выполненные",
    },
    {
      key: "deleted",
      label: "Удаленные",
    },
  ];

  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  const tabsContent = {
    active: <ActiveCards />,
    finished: <FinishedCards />,
    deleted: <DeletedCards />,
  };

  return (
    <Card
      style={{ width: "35%" }}
      tabList={tabListNoTitle}
      activeTabKey={activeTabKey}
      tabBarExtraContent={<a href="#">More</a>}
      onTabChange={onTabChange}
      tabProps={{
        size: "middle",
      }}
    >
      {tabsContent[activeTabKey]}
    </Card>
  );
}
