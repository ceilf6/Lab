import React from 'react'
import type { todoItem } from '../types/todos'

interface ItemProps {
    todo: todoItem,
    children?: React.ReactNode, // React 中 节点类型
    style?: React.CSSProperties // React 中 CSS 类型
}

export default function Item(props: ItemProps) {
    const {todo,children,style} = props

  return (
    <li style={style}>
        {todo.text}
        {children}
    </li>
  )
}
