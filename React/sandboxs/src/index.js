import React from 'react'; // 虽然也许可能没有使用，如果删了就会报错React.createElement
import ReactDOM from 'react-dom';

// import './test/test1'
// import './test/toggleImg'

// import FuncComp from './test/Comp/func'
// import ClassComp from './test/Comp/class';
// const el = (<FuncComp str="ceilf6" num={7}></FuncComp>)
// console.log(el)
// // 组件生成的仍然是React元素，但是 type: ƒ Comp()
// // 如果首字母不大写的话就是普通元素
// const el2 = (<ClassComp str="ceilf6" num={7}></ClassComp>) // type: class ClassComp
// console.log(el2)
// const allEl = (
//     <>
//         {el}
//         {el2}
//         {<FuncComp useless={false} useful
//             obj={{ name: "ceilf6", age: 20, ui: (<div>nihao</div>) }}
//         >
//         </FuncComp >}
//     </>
// )

import StateInEvent from './test/StateInEvent';

// import { Btn, MyBtn } from './test/Event';

// const callback = () => console.log("我被电击了")
// const el = (
//     <div>
//         {Btn()}
//         <MyBtn callback={callback} onClick={() => console.log("自定义组件的onClick")} />
//     </div>
// )

import StateNotInEvent from './test/StateNotInEvent'
import StateMulCallBack from './test/StateMulCallBack'
import StateMulNotSync from './test/StateMulNotSync'
const el = (
    <>
        <h1>StateInEvent</h1>
        <StateInEvent number={5} />
        <h1>StateNotInEvent</h1>
        <StateNotInEvent number={5} />
        <h1>StateMulCallBack</h1>
        <StateMulCallBack number={5} />
        <h1>StateMulNotSync</h1>
        <StateMulNotSync number={5} />
    </>
)

ReactDOM.render(el, document.getElementById('root'))