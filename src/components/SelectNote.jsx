import { Select, Divider, Space, Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useRef } from "react";

export default function SelectNote({ setNote }) {
  const [items, setItems] = useState([
    "Учеба",
    "Семья",
    "Работа",
    "Спорт",
    "Дом",
  ]);
  const [name, setName] = useState("");
  const [openSelect, setOpenSelect] = useState(false);
  const inputRef = useRef(null);

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const changeNote = (value) => {
    setNote(value);
    setOpenSelect(false);
  };

  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  return (
    <Select
      onChange={changeNote}
      placeholder="Пометка"
      popupRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: "8px 0" }} />
          <Space style={{ padding: "0 8px 4px" }}>
            <Input
              placeholder="Что-то свое"
              ref={inputRef}
              value={name}
              onChange={onNameChange}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
              Add item
            </Button>
          </Space>
        </>
      )}
      options={items.map((item) => ({ label: item, value: item }))}
    />
  );
}
