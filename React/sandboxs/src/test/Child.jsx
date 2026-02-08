import React from 'react'

export default (props) => (
    // 通过箭头函数实现是调用而不是立即执行
    <button onClick={() => props.changeFatherNum(props.fatherNum - 1)}>change father num</button>
)