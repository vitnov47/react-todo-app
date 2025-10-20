import AppLayout from "./components/Layout/AppLayout";
import { ConfigProvider } from "antd";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          margin: 0,
          padding: 0,
          colorPrimary: "#1890ff",
        },
      }}
    >
      <AppLayout />
    </ConfigProvider>
  );
}

export default App;
