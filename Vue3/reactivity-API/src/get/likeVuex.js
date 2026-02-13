import { reactive, readonly } from "vue"

// 对外暴露的 readOnlyUser 只读，其内部是一个可以在函数内部管理的响应数据
// readOnlyUser -> originUser
// 类似于 vuex 不允许外部直接更改数据，得调用暴露的API上报
export default function useUser() {
    const userOrigin = reactive({})
    const user = readonly(userOrigin)
    const setUserName = (name) => {
        userOrigin.name = name
    }
    const setUserAge = (age) => {
        userOrigin.age = age
    }
    return {
        user, // 这是一个只读的用户对象，响应式数据，默认为一个空对象
        setUserName, // 这是一个函数，传入用户姓名，用于修改用户的名称
        setUserAge, // 这是一个函数，传入用户年龄，用户修改用户的年龄
    }
}