import { useContext } from "react";
import { TaskContext } from "./TaskContext";

export default function useTasks() {
  return useContext(TaskContext);
}
