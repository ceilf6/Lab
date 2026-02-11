import { ref, watchEffect } from "vue";
import * as todoStorage from "../utils/todoStorage";

export default function useTodoList() {
    const todoRef = ref(todoStorage.fetchTodos());
    // 监控副作用
    // 在 watch 中读取的会自动收集依赖
    // 当依赖变化时会自动运行该副作用函数
    watchEffect(() => {
        todoStorage.saveTodos(todoRef.value);
    });

    return {
        todoRef
    }
}