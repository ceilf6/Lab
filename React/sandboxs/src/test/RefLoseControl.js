import React, { useState, useRef } from 'react'

export default () => {
    const [isShow, setShow] = useState(true);
    const ref = useRef(null);

    return (
        <div>
            <button onClick={() => setShow(!isShow)}>React操作DOM</button>
            <button onClick={() => ref.current.remove()}>开发者DOM</button>
            {isShow && <p ref={ref}>ceilf6</p>}
        </div>
    );
}