import { useState, useEffect } from "react";
import { TaskContext } from "./TaskContext";
import { TaskList } from "./TaskList";
import { definePriority } from "../utils";

export default function TaskListProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) return JSON.parse(saved);
    return TaskList.map((task) => definePriority(task));
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(task) {
    setTasks([...tasks, task]);
  }

  function removeTask(removeId) {
    setTasks(tasks.filter((task) => task.id != removeId));
  }

  return (
    <TaskContext.Provider value={{ tasks, setTasks, addTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
}
