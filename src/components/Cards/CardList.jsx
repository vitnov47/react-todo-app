import { Card } from "antd";
import { useState } from "react";
import ActiveCards from "./ActiveCards";
import FinishedCards from "./FinishedCards";
import DeletedCards from "./DeletedCards";
import "../../styles/cardList.css";

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

  const resetStorage = () => {
    localStorage.clear();
  };

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
      className="card-list"
      tabList={tabListNoTitle}
      activeTabKey={activeTabKey}
      tabBarExtraContent={
        <a href="#" onClick={resetStorage}>
          Очистить сохранения
        </a>
      }
      onTabChange={onTabChange}
      tabProps={{
        size: "middle",
      }}
    >
      {tabsContent[activeTabKey]}
    </Card>
  );
}
