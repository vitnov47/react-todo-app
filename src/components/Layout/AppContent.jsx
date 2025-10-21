import { Layout } from "antd";
import CardList from "../CardList";

export default function AppContent() {
  const contentStyle = {
    textAlign: "left",
    paddingInline: "3rem",
    paddingBlock: "1rem",
    //backgroundColor: "#3E19B5",
  };

  return (
    <Layout.Content style={contentStyle}>
      <CardList />
    </Layout.Content>
  );
}
