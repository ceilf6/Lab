const TODOS_KEY = "todos"

/**
 * 获取所有todos
 */
export function fetchTodos() {
    const res = localStorage.getItem(TODOS_KEY)
    if (res) {
        return JSON.parse(res)
    } else {
        return []
    }
}

/**
 * 保存todos
 * @param {*} newTodos 待保存的Todos
 */
export function saveTodos(newTodos) {
    localStorage.setItem(TODOS_KEY, JSON.stringify(newTodos))
}