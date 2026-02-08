import React from 'react';

function isValidRegex(regex, value) {
    if (!(regex instanceof RegExp)) {
        return true;
    }

    regex.lastIndex = 0;
    return regex.test(value);
}

function limitInputByState(value, state) {
    if (!state) {
        return value;
    }

    let nextValue = value;
    const { replace, toUpperCase, toLowerCase, maxLength, allowRegex, denyRegex } = state;

    if (replace && replace.from instanceof RegExp) {
        nextValue = nextValue.replace(replace.from, replace.to || '');
    }

    if (toUpperCase) {
        nextValue = nextValue.toUpperCase();
    }

    if (toLowerCase) {
        nextValue = nextValue.toLowerCase();
    }

    if (typeof maxLength === 'number') {
        nextValue = nextValue.slice(0, maxLength);
    }

    if (!isValidRegex(allowRegex, nextValue)) {
        return null;
    }

    if (denyRegex instanceof RegExp && isValidRegex(denyRegex, nextValue)) {
        return null;
    }

    return nextValue;
}

function Input(props) {
    console.log(`=== ${props.legend} render`)

    function handleChange(e) {
        // 在子组件中将用户数据的值，传递给父组件
        // 让父组件来进行修改，那么就需要调用父组件传入的更新函数（事件）
        const nextValue = limitInputByState(e.target.value, props.state);

        if (nextValue === null) {
            return;
        }

        props.transform(nextValue);
    }

    return (
        <fieldset>
            <legend>{props.legend}</legend>
            {/* 受控组价 */}
            <input
                value={props.value}
                type="text"
                maxLength={props.state && typeof props.state.maxLength === 'number' ? props.state.maxLength : undefined}
                onChange={handleChange}
            />
        </fieldset>
    );
}

export default Input;
