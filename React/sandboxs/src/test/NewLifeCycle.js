import React, { Component } from 'react'

// 删除了 componentWillMount, componentWillReceiveProps, componentWillUpdate
// 新增 getDerivedStateFromProps, getSnapshotBeforeUpdate

export default class NewLifeCycle extends Component {
    state = {
        n: this.props.n
    }

    static getDerivedStateFromProps(props, state) {
        console.log("getDerivedStateFromProps");
        // return null; // 不改变当前状态
        return { // 返回对象时用新的对象替换掉之前的状态
            n: props.n
        }
        // 然后会发现子组件自身属性完全变成了父组件状态的映像，
        // 因为每次更新组件都会调用 GDSFP 这个生命周期钩子、变成父组件状态
    }

    getSnapshotBeforeUpdate = (prevProps, prevState) => {
        console.log("getSnapshotBeforeUpdate");
        return 132;
    }

    componentDidUpdate(prevProps, prevState, snap) {
        console.log("componentDidUpdate", snap);
    }


    render() {
        return (
            <div>
                <h1>{this.state.n}</h1>
                <p>
                    <button onClick={() => {
                        console.log("=== 自身状态变更")
                        this.setState({
                            n: this.state.n + 1
                        })
                    }}>+1</button>
                </p>
            </div>
        )
    }
}

