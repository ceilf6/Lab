import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useTodoListStore = defineStore('list',
    // 组合式 风格
    () => {
        const list = reactive({
            items: [
                {
                    text: "学习Pinia",
                    isCompleted: false
                },
                {
                    text: "任务2",
                    isCompleted: true
                }
            ]
        })

        function addItem(newItemStr) {
            list.items.push({
                text: newItemStr,
                isCompleted: false
            })
        }

        return { list, addItem }
    }
)