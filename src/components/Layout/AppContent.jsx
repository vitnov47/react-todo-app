import { Layout, Flex } from "antd";
import CardList from "../Cards/CardList";
import Additionals from "../Additionals/Additionals";

export default function AppContent() {
  const contentStyle = {
    textAlign: "left",
    paddingInline: "3rem",
    paddingBlock: "1rem",
    backgroundColor: "#5b2febff",
    minHeight: "92vh",
  };

  return (
    <Layout.Content style={contentStyle}>
      <Flex align="flex-start">
        <CardList />
        <Additionals />
      </Flex>
    </Layout.Content>
  );
}
