// 如果子组件需要公用某些变量，那么就需要找到最近公共祖先组件，然后将这个变量在这个父组件中进行管理
// 然后父组件通过 props 也就是 { } 将公用变量传给需要使用其的子组件

import { useState } from 'react';

export default function SameState( init=0 ) {
    const [cnt,setCnt] = useState(init);

    function handle() {
        setCnt(cnt+1);
    }

    return (
        <>
            <h1> {cnt} </h1>
            <MyButton cnt={cnt} handleFunction={handle} />
            <MyButton cnt={cnt} handleFunction={handle} />
            <MyButton cnt={cnt} handleFunction={handle} />
        </>
    )
}

function MyButton ({ cnt, handleFunction }){
    return (
        <button onClick={handleFunction}> {cnt} </button>
    )
}