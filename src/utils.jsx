import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiceOne,
  faDiceTwo,
  faDiceThree,
  faDiceFour,
} from "@fortawesome/free-solid-svg-icons";

export function defineIcon(priority) {
  switch (priority) {
    case "low":
      return (
        <FontAwesomeIcon
          icon={faDiceOne}
          style={{ width: "3rem", height: "3rem" }}
        />
      );
    case "middle":
      return (
        <FontAwesomeIcon
          icon={faDiceTwo}
          style={{ width: "3rem", height: "3rem" }}
        />
      );
    case "high":
      return (
        <FontAwesomeIcon
          icon={faDiceThree}
          style={{ width: "3rem", height: "3rem" }}
        />
      );
    case "unbelievable":
      return (
        <FontAwesomeIcon
          icon={faDiceFour}
          style={{ width: "3rem", height: "3rem" }}
        />
      );
    default:
      return 0;
  }
}

// export function defineColor(priority){

// }

// КАКОГО КАРТОЧКИ В КОНТЕНТЕ ЛЕЖАТ НЕ ВНУТРИ LAYOUT???
