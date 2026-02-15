import React, { Component } from 'react'
const ctx = React.createContext();
class ChildB extends React.Component {
    static contextType = ctx;
    shouldComponentUpdate(nextProps, nextState) {
        console.log("运行了优化")
        // 判断... => 性能优化不需要update重新渲染
        return false;
    }
    render() {
        console.log("childB render");
        return (
            <h1>
                a:{this.context.a}，b:{this.context.b}
            </h1>
        );
    }
}

export default class NewContext extends Component {
    // datas = [{
    //     a: 100,
    //     b: "ceilf6",
    //     changeA: (newA) => {
    //         this.setState({
    //             a: newA
    //         })
    //     }
    // }]
    // state = this.datas[0]
    state = {
        ctx: {
            a: 100,
            b: "ceilf6",
            changeA: (newA) => {
                this.setState({
                    a: newA
                })
            }
        }
    }

    render() {
        return (
            <ctx.Provider value={this.state.ctx}>
                <div>
                    <ChildB />

                    <button onClick={() => {
                        // setState 被调用时，创建的是一个新对象（即使什么都没有变），
                        // 那么上下文在比较时（通过Object.is比较引用内存地址）会判断二者不一致、
                        // this.setState({}, () => {
                        //     this.datas.push(this.state);
                        //     console.log("=== 对象一致吗", this.datas[0] === this.datas[1])
                        // })
                        // 解决方案：包一层 ctx 后，后面更新 setState({})
                        this.setState({}) // 只影响了 state 但是内部的 ctx 的地址没有变化
                    }}>父组件的按钮，a加1</button>
                </div>
            </ctx.Provider>
        )
    }
}

