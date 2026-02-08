import React, { useState } from "react";

export default function ListKey() {
  // 错误示范：使用 index 作为 key
  const [badList, setBadList] = useState([
    { name: "项目 A" },
    { name: "项目 B" },
    { name: "项目 C" },
  ]);
  const [badCounter, setBadCounter] = useState(4);

  // 正确做法：使用唯一 id 作为 key
  const [goodList, setGoodList] = useState([
    { id: 1, name: "项目 A" },
    { id: 2, name: "项目 B" },
    { id: 3, name: "项目 C" },
  ]);
  const [goodCounter, setGoodCounter] = useState(4);

  // 错误示范的方法
  const removeBadItem = (index) => {
    setBadList((prev) => prev.filter((_, i) => i !== index));
  };

  const addBadItem = () => {
    setBadList((prev) => [
      ...prev,
      { name: `项目 ${String.fromCharCode(64 + badCounter)}` },
    ]);
    setBadCounter((prev) => prev + 1);
  };

  // 正确做法的方法
  const removeGoodItem = (id) => {
    setGoodList((prev) => prev.filter((item) => item.id !== id));
  };

  const addGoodItem = () => {
    setGoodList((prev) => [
      ...prev,
      {
        id: goodCounter,
        name: `项目 ${String.fromCharCode(64 + goodCounter)}`,
      },
    ]);
    setGoodCounter((prev) => prev + 1);
  };

  return (
    <div>
      <h2>错误示范：使用 index 作为 key</h2>
      <div>
        <ul>
          {badList.map((item, index) => (
            <li key={index}>
              <span>{item.name}</span>
              <input type="text" placeholder={`输入${item.name}的值`} />
              <button onClick={() => removeBadItem(index)}>删除</button>
            </li>
          ))}
        </ul>
        <button onClick={addBadItem}>添加项</button>
      </div>

      <h2>正确做法：使用唯一 id 作为 key</h2>
      <div>
        <ul>
          {goodList.map((item) => (
            <li key={item.id}>
              <span>{item.name}</span>
              <input type="text" placeholder={`输入${item.name}的值`} />
              <button onClick={() => removeGoodItem(item.id)}>删除</button>
            </li>
          ))}
        </ul>
        <button onClick={addGoodItem}>添加项</button>
      </div>
    </div>
  );
}