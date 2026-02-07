import React from "react"

export function Btn() {
    return (
        <button onClick={(e) => console.log("=== 我被电击了", e)}>
            点我
        </button>
    )
}

export class MyBtn extends React.Component {
    // 1.1
    // constructor(props) {
    //     super(props)
    //     this.handleClick = this.handleClick.bind(this)
    // }

    handleClick() {
        // console.log(this) // undefined
        this.props.callback()
        this.props.onClick()
    }

    // 2.1 用箭头函数那么事件处理函数不在原型上，而是在对象上
    handleClick2 = () => {
        this.props.callback()
        this.props.onClick()
    }

    render() {
        return (
            // 1.2
            // <button onClick={this.handleClick.bind(this)}>

            // <button onClick={this.handleClick2}>

            // 2.2
            <button onClick={() => this.handleClick()}>
                点我
                {/* <h1 onClick={this.props.onClick}>点我</h1> */}
            </button >
        )
    }
}