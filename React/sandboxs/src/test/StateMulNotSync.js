import React from 'react'
// import { h1 } from 'framer-motion/client'
// 注意 tab 后可能会自动导入无关数据

export default class NumState extends React.Component {
    state = {
        num: this.props.number
    }
    constructor(props) {
        super(props)
        setInterval(() => {
            this.setState(prev => {
                // setState 第一个参数也可以是一个函数
                // 参数prev表示当前的状态
                // 该函数的返回结果，会混合（覆盖）掉之前的状态
                // 该函数是异步执行
                return {
                    num: prev.num - 1
                }
            })
            this.setState(prev => {
                return {
                    num: prev.num - 1
                }
            })
            this.setState(prev => {
                return {
                    num: prev.num - 1
                }
            })
        }, 2000);
    }
    handleClick = () => {
        console.log(" ")
        console.log("=== StateMulCallBack start")
        this.setState(prev => {
            // setState 第一个参数也可以是一个函数
            // 参数prev表示当前的状态
            // 该函数的返回结果，会混合（覆盖）掉之前的状态
            // 该函数是异步执行
            return {
                num: prev.num - 1
            }
        })
        this.setState(prev => {
            return {
                num: prev.num - 1
            }
        })
        this.setState(prev => {
            return {
                num: prev.num - 1
            }
        })
        // , // setState的第二个参数：状态完成之后的回调函数
        // () => {
        //     this.setState(
        //         {
        //             num: this.state.num - 1
        //         }, this.setState(
        //             {
        //                 num: this.state.num - 1
        //             }))
        // })

        // 多个并行的 setState 都是在 同一个之前状态 基础进行的操作，所以会被覆盖，
        // 正确应该是像上面一样在状态完成之后再进行操作
        // this.setState(
        //     {
        //         num: this.state.num - 1
        //     })

        // this.setState(
        //     {
        //         num: this.state.num - 1
        //     })
    }
    render() {
        // 并且 React会对异步的setState进行优化，将多次setState进行合并
        // 所以一次点击虽然事件中有三次 setState ，但是只会有一次 render
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