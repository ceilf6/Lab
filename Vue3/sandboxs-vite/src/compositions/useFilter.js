import { ref, onMounted, onUnmounted } from "vue";

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

    return {
        filterRef
    }
}