import React from 'react'

export default ({ changeFatherNum, fatherNum }) => (
    // 通过箭头函数实现是调用而不是立即执行
    <button onClick={() => changeFatherNum(fatherNum - 1)}>change father num</button>
)