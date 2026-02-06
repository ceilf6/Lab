import React from 'react'; // 虽然也许可能没有使用，如果删了就会报错React.createElement
import ReactDOM from 'react-dom';

// import './test/test1'
// import './test/toggleImg'

import FuncComp from './test/Comp/func'
import ClassComp from './test/Comp/class';
const el = (<FuncComp str="ceilf6" num={7}></FuncComp>)
console.log(el)
// 组件生成的仍然是React元素，但是 type: ƒ Comp()
// 如果首字母不大写的话就是普通元素
const el2 = (<ClassComp str="ceilf6" num={7}></ClassComp>) // type: class ClassComp
console.log(el2)
const allEl = (
    <>
        {el}
        {el2}
        {<FuncComp useless={false} useful
            obj={{ name: "ceilf6", age: 20, ui: (<div>nihao</div>) }}
        >
        </FuncComp >}
    </>
)
ReactDOM.render(allEl, document.getElementById('root'))