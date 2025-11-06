import { useState, useEffect } from "react";
import { TaskContext } from "./TaskContext";
import { TaskList } from "./TaskList";
import { definePriority } from "../utils";

export default function TaskListProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  function addTask(task) {
    setTasks([...tasks, task]);
  }

  function removeTask(removeId) {
    setTasks(tasks.filter((task) => task.id != removeId));
  }

  useEffect(() => {
    setTasks(
      TaskList.map((task) => {
        return { ...definePriority(task) };
      })
    );
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, setTasks, addTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
}
