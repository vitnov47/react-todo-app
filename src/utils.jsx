import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiceOne,
  faDiceTwo,
  faDiceThree,
  faDiceFour,
} from "@fortawesome/free-solid-svg-icons";

export function definePriority(task) {
  let icon = 0;
  let color = "#0300FF";
  let priorityName = "Ошибочка вышла..";
  switch (task.priority) {
    case "low":
      icon = (
        <FontAwesomeIcon
          icon={faDiceOne}
          style={{ width: "4rem", height: "4rem" }}
        />
      );
      color = "#58F55A";
      priorityName = "Низкий";
      break;
    case "middle":
      icon = (
        <FontAwesomeIcon
          icon={faDiceTwo}
          style={{ width: "4rem", height: "4rem" }}
        />
      );
      color = "#E6E62E";
      priorityName = "Средний";
      break;
    case "high":
      icon = (
        <FontAwesomeIcon
          icon={faDiceThree}
          style={{ width: "4rem", height: "4rem" }}
        />
      );
      color = "#F2AE00";
      priorityName = "Высокий";
      break;
    case "unbelievable":
      icon = (
        <FontAwesomeIcon
          icon={faDiceFour}
          style={{ width: "4rem", height: "4rem" }}
        />
      );
      color = "#F72D1E";
      priorityName = "Ну капец какой";
      break;
  }
  return { ...task, icon, color, priorityName };
}
