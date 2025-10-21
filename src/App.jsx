import AppLayout from "./components/Layout/AppLayout";
import TaskListProvider from "./context/TaskListProvider";

function App() {
  return (
    <TaskListProvider>
      <AppLayout />
    </TaskListProvider>
  );
}

export default App;
