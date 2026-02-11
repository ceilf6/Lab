import { ref } from "vue";
import { generateID } from "../utils/todoStorage";

export default function useNewTodo(todoRef) {
    const newTodoRef = ref("") // 到时候 v-model 绑定到输入框上，获取新任务内容

    const addTodo = () => {
        const val = newTodoRef.value && newTodoRef.value.trim()
        if (!val) return
        const newTodoObj = {
            title: val,
            completed: false,
            id: generateID()
        }
        todoRef.value.push(newTodoObj) // 注意 setup 中是对象得手动解一层
        newTodoRef.value = ""; // 清空输入框
    }

    return {
        newTodoRef,
        addTodo
    }
}