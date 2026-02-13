import { reactive, readonly } from "vue"

export default function useDebounce(obj, duration) {
    const valueOrigin = reactive(obj) // 可改，那么内部肯定是可变的响应数据
    const value = readonly(valueOrigin) // 对外暴露只读
    // const setValue = (newValue) => {
    //     const tuple = Object.entries(newValue) // entries 拿到的是元组 [ [], [], ... ]
    //     tuple.forEach(([key, val]) => {
    //         valueOrigin[key] = val
    //     })
    // }
    let timer = null
    const setValue = (newValue) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            const tuple = Object.entries(newValue) // entries 拿到的是元组 [ [], [], ... ]
            tuple.forEach(([key, val]) => {
                valueOrigin[key] = val
            })
        }, duration)
    }

    return {
        value, // 这里是一个只读对象，响应式数据，默认值为参数值
        setValue // 这里是一个函数，传入一个新的对象，需要把新对象中的属性混合到原始对象中，混合操作需要在duration的时间中防抖
    }
}