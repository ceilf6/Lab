import React from 'react'
// import { h1 } from 'framer-motion/client'
// 注意 tab 后可能会自动导入无关数据

export default class NumState extends React.Component {
    state = {
        num: this.props.number
    }
    handleClick = () => {
        console.log(" ")
        console.log("=== StateInEvent start")
        this.setState(
            {
                num: this.state.num - 1
            }
        )
        console.log("=== num", this.state.num)
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