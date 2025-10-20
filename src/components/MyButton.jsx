import { useState } from "react";

export default function MyButton() {
  const [count, setCount] = useState(0);
  return (
    <button
      style={{ width: 100, height: 30, margin: 10 }}
      onClick={() => setCount(count + 1)}
    >
      {count}
    </button>
  );
}
