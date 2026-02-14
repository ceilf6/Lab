import React, { Component } from 'react'

export default class Test extends Component {

    state = {
        n: this.props.n // 父组件数据来源设置初始值
    }

    // 希望父组件来源数据变化时子组件同步再次初始化
    componentWillReceiveProps(nextProps) {
        this.setState({ // 数据来源不再单一
            n: nextProps.n
        })
    }
    // 于是新版删掉了 CWRP ，改为 static getDerivedStateFromProps

    /*
    一个数据只能由一个主人
    - 要么和父组件的统一，由父组件下放上报事件方法 onChange
    - 要么子组件自己管理
    */

    render() {
        return (
            <div>
                <h1>数字：{this.state.n}</h1>
                <p>
                    <button onClick={() => {
                        console.log("=== 自身状态变更")
                        this.setState({
                            n: this.state.n + 1 // 自身数据变动
                        })
                    }}>n加1</button>
                </p>
            </div>
        )
    }
}

