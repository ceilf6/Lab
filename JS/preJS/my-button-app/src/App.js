import React, { useState } from 'react';
import './App.css';

/*
export default function MyApp(){
    return (
        <div>
            <h1>独立计数器1和2</h1>
            <MyButton />
            <MyButton />
        </div>
    );
}

function MyButton(){
    const [cnt,changecnt] = useState(230);
  // 获取 状态 , 用于更新其的函数     // 状态初始值

    function Click(){
        changecnt( cnt+1 ); // 注意不能直接修改状态，而是得创建新的状态值
    }

    return(
        <button onClick={Click}>
            总共点了 {cnt} 次
        </button>
    )
}
*/

export default function MyApp(){
  const [cnt,changeCnt] = useState(230);
  // 提前

  function Click(){
    changeCnt(cnt+1);
  }

  return (
    <div>
      <h1>共同计数器</h1>
      <MyButton />
      <MyButton />
    </div>
  )

  function MyButton(){
    return (
      <button onClick={Click}>
        总共点了 {cnt} 次
      </button>
    )
  }
}