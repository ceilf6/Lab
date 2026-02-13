import { ref, unref, isRef, toRef, reactive, toRefs } from "vue";

const refObj = ref(1)

// 解构 unref === isRef(val) ? val.value : val
const unrefObj = unref(refObj)
const Obj2 = isRef(refObj) ? refObj.value : refObj

console.log(unrefObj === Obj2) // true


const state = reactive({
    foo: 1,
    bar: 2
})

const fooRef = toRef(state, 'foo'); // fooRef: {value: ...}

fooRef.value++
console.log(state.foo) // 2

state.foo++
console.log(fooRef.value) // 3

setup = () => {
    const state1 = reactive({ a: 1, b: 2 });
    const state2 = reactive({ c: 3, d: 4 });
    return {
        ...toRefs(state1), // reactivity
        ...toRefs(state2) // reactivity
    }
}

// 最好所有 composition func 都返回的是 ref Obj
function usePos() {
    const pos = reactive({ x: 0, y: 0 });
    return toRefs(pos); //  {x: refObj, y: refObj}
}
function useBooks() {
    const books = ref([]);
    return {
        books // books is refObj
    }
}
function useLoginUser() {
    const user = readonly({
        isLogin: false,
        loginId: null
    });
    return toRefs(user); // { isLogin: refObj, loginId: refObj }  all ref is readonly
}

setup = () => {
    // 在setup函数中，尽量保证解构、展开出来的所有响应式数据均是ref
    return {
        ...usePos(),
        ...useBooks(),
        ...useLoginUser()
    }
}