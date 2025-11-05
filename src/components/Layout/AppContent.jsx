import { Layout } from "antd";
import CardList from "../Cards/CardList";

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
      <CardList />
    </Layout.Content>
  );
}
