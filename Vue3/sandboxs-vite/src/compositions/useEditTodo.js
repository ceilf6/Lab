import { ref, computed } from "vue";

export default function useEditTodo(TodoRef) {
    const nowEditing = ref(null)

    let originCache = null // 存储原先值用于取消更改后恢复
    // 由于一次只有一个 nowEditing 所以只需要维护一个即可

    const handleDBLClick = (todo) => {
        nowEditing.value = todo
        originCache = todo.title
    }

    const doneEdit = () => {
        nowEditing.value = null
    }

    const cancelEdit = (todo) => {
        nowEditing.value = null
        todo.title = originCache
    }

    // 用于处理页面刷新后 :checked 样式
    const allDoneRef = computed(() => {
        var val = TodoRef.value.filter((it) => !it.completed).length === 0;
        return val;
    });

    function setAllChecked(checked) {
        TodoRef.value.forEach((todo) => {
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