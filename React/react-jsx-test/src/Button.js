function Button() { // 开头必须大写
    function handleClick() {
        console.log('You clicked me!');
    }

    return (
        <button onClick={handleClick}> {/* 不要括号！只需传入事件而不是调用*/}
            Click me
        </button>
    )
}

export default Button;