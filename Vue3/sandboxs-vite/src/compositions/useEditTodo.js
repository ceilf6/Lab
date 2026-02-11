import { ref, computed } from "vue";

export default function useEditTodo(todoRef) {
    const nowEditing = ref(null)

    let originCache = null // 存储原先值用于取消更改后恢复
    // 由于一次只有一个 nowEditing 所以只需要维护一个即可

    const handleDBLClick = (todo) => {
        nowEditing.value = todo
        originCache = todo.title
    }

    const doneEdit = (todo) => {
        nowEditing.value = null;
        const title = todo.title.trim();
        if (title) {
            todo.title = title;
        } else {
            // 删除
            const index = todoRef.value.indexOf(todo);
            if (index >= 0) {
                todoRef.value.splice(index, 1);
            }
        }
    }

    const cancelEdit = (todo) => {
        nowEditing.value = null
        todo.title = originCache
    }

    // 用于处理页面刷新后 :checked 样式
    const allDoneRef = computed(() => {
        var val = todoRef.value.filter((it) => !it.completed).length === 0;
        return val;
    });

    function setAllChecked(checked) {
        todoRef.value.forEach((todo) => {
            todo.completed = checked;
        });
    }

    return {
        nowEditing,
        handleDBLClick,
        doneEdit,
        cancelEdit,
        allDoneRef,
        setAllChecked,
    }
}