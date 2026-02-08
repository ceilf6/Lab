import React from 'react'
// import { h1 } from 'framer-motion/client'
// 注意 tab 后可能会自动导入无关数据

export default class NumState extends React.Component {
    state = {
        num: this.props.number
    }
    constructor(props) {
        super(props)
        // 状态初始化
        // this.state = {
        //     num: this.props.number
        // }
        this.timer = setInterval(() => {
            if (!this.state.num) clearInterval(this.timer)
            this.setState({ num: this.state.num - 1 }) // 通知 React 状态变化
            // Object.assign()
        }, 1000)

        // 避免在 contructor 初始化阶段使用 setState
    }
    render() {
        return (
            <h1>{this.state.num}</h1>
        )
    }
}