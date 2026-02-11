import { ref } from "vue";

export default function useCount(defaultCnt = 0) {
    // let countRef = 0;
    let countRef = ref(defaultCnt);
    console.log(countRef); // ref 将变量封装到了对象中，设置了访问器进行依赖收集
    const handleIncrease = () => {
        console.log("handle click");
        // countRef++; // 没有 ref 的 countRef 增加时没有 re-render 、即变量不是响应式的
        countRef.value++; // 在 setup 中，还没有代理、变量是一个对象
    };
    const handleDecrease = () => {
        console.log("handle click");
        // countRef++; // 没有 ref 的 countRef 增加时没有 re-render 、即变量不是响应式的
        countRef.value--; // 在 setup 中，还没有代理、变量是一个对象
    };

    return {
        countRef,
        handleIncrease,
        handleDecrease
    }
}