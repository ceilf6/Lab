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

/**
 * 生成任务的唯一ID = 时间戳 + 随机数
 */
export function generateID() {
    return Date.now() + Math.random().toString(16).substring(2, 6)
    // 已经不推荐 substr 第二个参数为长度，推荐 substring 第二个参数为结束位置更直观
}

export function filter(todos, visibility = "all") {
    if (visibility === "all") {
        return todos;
    } else if (visibility === "active") {
        return todos.filter((it) => !it.completed);
    } else if (visibility === "completed") {
        return todos.filter((it) => it.completed);
    }
    throw new Error("invalid visibility value");
}
