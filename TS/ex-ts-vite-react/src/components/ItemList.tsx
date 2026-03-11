import React from 'react'
import type { todoItem } from '../types/todos'
import Item from './Item'

interface ItemListProps{
    todos: todoItem[],
    children?: React.ReactNode,
    onDel: (id: number) => void,
    onToggle(id:number): void
}

const ItemList: React.FC<ItemListProps> = (props) => {
    const {children, todos, onDel,onToggle} = props

  return (
    <div>
      {children}
      <ul>
        {todos.map(todo => {
            return <Item 
                todo={todo}
                key={todo.id}
                style={todo.done ? {textDecoration: "line-through"} : {}}
            >
                <button onClick={() => onToggle(todo.id)}>{todo.done ? '已完成':'未完成'}</button>
                <button onClick={() => onDel(todo.id)}>删除</button>
            </Item>
        })}
      </ul>
    </div>
  )
}

export default ItemList