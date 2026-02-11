import { ref, onMounted, onUnmounted, computed } from "vue";
import { filter } from '../utils/todoStorage'

const filterEnum = ["all", "active", "completed"]

export default function useFilter(todoRef) {
    const filterRef = ref("all")

    // 筛选方式响应 与 hash 连接
    const onHashChange = () => {
        // trim 左边不需要的 #/
        const hash = location.hash.replace(/#\/?/, "");
        if (filterEnum.includes(hash)) {
            filterRef.value = hash
        } else {
            filterRef.value = "all"
            location.hash = "" // "" 虽然是无效会第二次走到这分支，但是 "" => "" 不会触发 hashchange
        }
    }

    onMounted(() => {
        window.addEventListener("hashchange", onHashChange)
    })

    onUnmounted(() => {
        window.removeEventListener("hashchange", onHashChange)
    })

    const filteredTodoRef = computed({
        get() {
            return filter(todoRef.value, filterRef.value) // 别忘记 .value
        }
    })

    const remainingRef = computed(() => {
        return filter(todoRef.value, "active").length;
    });

    const completedRef = computed(() => {
        return filter(todoRef.value, "completed").length;
    });

    return {
        filterRef,
        filteredTodoRef,
        remainingRef,
        completedRef,
    }
}