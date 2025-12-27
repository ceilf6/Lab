import React, { useState } from 'react';

export default function MyApp(){
    return (
        <div>
            <h1>独立计数器1和2</h1>
            <MyButton />
            <MyButton />
        </div>
    );
}

function MyButton(){
    const [cnt,changecnt] = useState(230);

    function Click(){
        changecnt(cnt + 1);
    }

    return(
        <button onClick={Click}>
            总共点了 {cnt} 次
        </button>
    )
}