import React from 'react'
// import { h1 } from 'framer-motion/client'
// 注意 tab 后可能会自动导入无关数据

export default class NumState extends React.Component {
    state = {
        num: this.props.number
    }
    handleClick = () => {
        console.log(" ")
        console.log("=== StateNotInEvent start")
        this.setState(
            {
                num: this.state.num - 1
            }
            , // setState的第二个参数：状态完成之后的回调函数
            () => {
                console.log("=== num 状态完成之后的回调函数", this.state.num)
            })
    }
    render() {
        console.log("=== render")
        console.log("=== num", this.state.num)
        return (
            <>
                <h1>{this.state.num}</h1>
                <button onClick={this.handleClick}>-</button>
            </>
        )
    }
}