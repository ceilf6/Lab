import React, { useReducer, useRef } from "react";

/**
 * reducer, 类似于 redux 的集中处理思想 => 可预测状态容器
 * @param {*} state 状态
 * @param {*} action 数据变化的描述对象
 */
function counter(state, action) {
    switch (action.type) {
        case 'INCREMENT':
            return { count: state.count + action.payload }
        case "DECREMENT":
            return { count: state.count - action.payload };
        default:
            return state;
    }
}

export default () => {
    const initialState = {
        count: 0
    }
    const [state, dispatch] = useReducer(counter, initialState)
    const selRef = useRef()

    // 通过 dispatch 上报
    const increment = () => {
        // 拿到操作值
        const num = selRef.current.value * 1
        dispatch({
            type: 'INCREMENT',
            payload: num
        })
    }

    const decrement = () => {
        // 拿到操作值
        const num = selRef.current.value * 1
        dispatch({ type: "DECREMENT", payload: num });
    };

    const incrementIfOdd = () => {
        // 拿到操作值
        const num = selRef.current.value * 1
        if (state.count % 2 !== 0) {
            dispatch({ type: "INCREMENT", payload: num });
        }
    };

    const incrementAsync = () => {
        // 拿到操作值
        const num = selRef.current.value * 1
        setTimeout(() => {
            dispatch({ type: "INCREMENT", payload: num });
        }, 1000);
    };

    return (
        <div>
            <p>click {state.count} times</p>
            <select ref={selRef}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
            <button onClick={incrementIfOdd}>increment if odd</button>
            <button onClick={incrementAsync}>increment async</button>
        </div>
    );
}
