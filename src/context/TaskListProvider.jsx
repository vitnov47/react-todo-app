import { useState, useEffect } from "react";
import { TaskContext } from "./TaskContext";
import { TaskList } from "./TaskList";
import { definePriority } from "../utils";

export default function TaskListProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  function addTask(task) {
    setTasks([...tasks, task]);
  }

  useEffect(() => {
    TaskList.map((task) => {
      const { priorityName } = definePriority(task.priority);
      task.priorityName = priorityName;
    });
    setTasks(TaskList);
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, setTasks, addTask }}>
      {children}
    </TaskContext.Provider>
  );
}
