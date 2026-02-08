import React from 'react';

function Input(props) {
    console.log(`=== ${props.legend} render`)

    function handleChange(e) {
        // 在子组件中将用户数据的值，传递给父组件
        // 让父组件来进行修改，那么就需要调用父组件传入的更新函数（事件）
        props.transform(e.target.value);
    }

    return (
        <fieldset>
            <legend>{props.legend}</legend>
            {/* 受控组价 */}
            <input  value={props.value}
            type="text" onChange={handleChange} />
        </fieldset>
    );
}

export default Input;
