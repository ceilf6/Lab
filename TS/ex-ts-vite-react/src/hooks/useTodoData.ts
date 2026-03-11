import { useState } from "react";
import type { Filter, todoItem } from "../types/todos";
// 别忘记 type // “todoItem”是一种类型，必须在启用 "verbatimModuleSyntax" 时使用仅类型导入进行导入。

export function useTodoData() {
    const [todos, setTodos] = useState<todoItem[]>([
        { id: 1, text: 'learn TS', done: true }
    ])
    const [lastTodoID, setLastTodoID] = useState<number>(1) // 用数组长度作为id，那么在删除后新增就有重复，这GPT一天到晚就想带歪我
    // 工业选项 uuid

    const [filter, setFilter] = useState<Filter>('全部')

    // useEffect(() => {
    //     // const res = fetch()
    //     setTodos(res)
    // }, [])

    const addTodo = (text: string) => {
        const newID = lastTodoID + 1

        setLastTodoID(() => {
            // 如果 包裹了，那么就有了副作用（React会通过执行两次判断是否有副作用
            // setTodos(todos => [
            //     ...todos,
            //     { id, text, done: false }
            // ])
            return newID
        })
        setTodos([...todos, { id: newID, text, done: false }])
    }

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(item => item.id !== id))
    }

    const toggleTodo = (id: number) => {
        setTodos(todos.map(todo =>
            todo.id === id
                ? { ...todo, done: !todo.done }
                : todo
        ))
    }

    const filterTodos = () => {
        switch (filter) {
            case "已完成":
                return todos.filter(todo => todo.done)
            case "未完成":
                return todos.filter(todo => !todo.done)
            case "全部":
                return todos
        }
    }

    return {
        todos,
        // setTodos,
        addTodo,
        deleteTodo,
        toggleTodo,
        filterTodos,
        filter,
        setFilter
    }
}