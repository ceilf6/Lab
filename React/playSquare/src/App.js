import { useState } from 'react';
// 需要将展示的内容设置为响应式可变的

// 需要判断游戏状态，那么就需要对多个Square进行管理，就需要一个父组件对各个子组件的状态统一管理，那么就是棋盘组件
// 要从多个子组件收集数据，或让两个子组件相互通信，请改为在其父组件中声明共享 state。父组件可以通过 props 将该 state 传回给子组件。这使子组件彼此同步并与其父组件保持同步。
// 所以得在棋盘组件里面设置一个响应式数组，然后通过props将数组传给每个子组件
// useState 是通过追踪调用 set 函数来触发更新

function Square({value, onClick}) {
  // const [value,setValue] = useState(initValue);
  /* 向上了
  function handleClick() {
    if(value === '') setValue('X');
  }
  */

  return (
    <button className="square" onClick={onClick}>{value}</button>
  )
}

//export default function Board() { // 向外暴露 默认主函数
function Board({squares,setCache}) {
  // const [squares,setSquares] = useState(Array(9).fill(null));
  const [xIsNext,setXIsNext] = useState(true); // 追踪当前操作者

  function handleClick(i) {
    const nextSquares = squares.slice(); // 需要创建副本，如果直接修改原数组，会导致数组的标志-引用指针不变，而React在memo这个API里面是用Object.is浅比较导致无法触发更新
      // 而且不直接在原来基础上覆盖进行变化，能方便后面对之前的状态进行回溯
    if (nextSquares[i]) return; // 如果该位置已经有值，则不进行操作
    if (xIsNext) nextSquares[i] = 'X';
    else nextSquares[i] = 'O';
    setXIsNext(!xIsNext); // 置反
    setCache(prev => [...prev, nextSquares]);
  }

  // const winner = calculateWinner(squares); // 随着state更新会多次调用
  if (calculateWinner(squares)){ // 注意上面形参的大小写
    const winner = xIsNext ? 'O' : 'X';
    alert(`Winner: ${winner}`);
  }

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onClick={() => {
          handleClick(0)
          //console.log(calculateWinner(squares))
        }}/> {/* 得套一层箭头函数用回调，因为如果不套的话就直接调用了，相当于传入了handleClick(0)的返回值undefined*/}
        <Square value={squares[1]} onClick={() => handleClick(1)}/>
        <Square value={squares[2]} onClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onClick={() => handleClick(3)}/>
        <Square value={squares[4]} onClick={() => handleClick(4)}/>
        <Square value={squares[5]} onClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onClick={() => handleClick(6)}/>
        <Square value={squares[7]} onClick={() => handleClick(7)}/>
        <Square value={squares[8]} onClick={() => handleClick(8)}/>
      </div>
    </>
  )
}

function CacheSpace({cache,handleCache}){

  const items = cache.map((item,index)=>
    <>
      <li key = {index}>
        {item.join('')}
        <button onClick={() => handleCache(index)}> {/*注意还是传的回调*/}
          回溯
        </button>
      </li>
    </>
  )

  return (
    <ol>
      {items}
    </ol>
  )
}

// 如果想要回溯的话就需要cache状态，但是在 Board 里面设置的话就会导致更新，所以还需要套一层
export default function Game() {
  const [cache,setCache] = useState([Array(9).fill("")]);
  const now = cache[cache.length - 1]

  function handleCache(index){ // 在上面调用的时候是直接传 index 的，不需要套一层 {}
    setCache(prev => prev.slice(0, index + 1));
  }
  
  console.log(cache);
  
  return (
    <div className="game">
      <div className="game-board"> {/* 那么就当目前棋盘变了的时候就会响应，需要作为参数传入，所以得提升*/}
        <Board squares={now} setCache={setCache} />
      </div>
      <div className="game-info">
         <CacheSpace cache={cache} handleCache={handleCache}/>
         {/*<button onClick={handleCache}>回溯</button>*/}
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const over = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ]

  for (let i of over) {
    if (squares[i[0]] && squares[i[0]] === squares[i[1]] && squares[i[1]] === squares[i[2]]) {
      return true;
    }
  }
  return false;
}
