import AppLayout from "./components/Layout/AppLayout";
import TaskListProvider from "./TaskListProvider";

function App() {
  return (
    <TaskListProvider>
      <AppLayout />
    </TaskListProvider>
  );
}

export default App;
