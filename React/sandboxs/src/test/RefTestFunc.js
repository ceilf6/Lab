import React, { Component } from 'react'

export default class Comp extends Component {

    state = {
        show: true
    }

    handleClick = () => {
        // this.txt.focus();
        this.setState({
            show: !this.state.show
        });
    }

    componentDidMount() {
        console.log("didMount", this.txt);
    }

    // 写在外面的话函数就不变就不会两次
    getRef = el => {
        console.log("函数被调用了", el);
        this.txt = el;
    }

    render() {
        return (
            <div>
                {
                    this.state.show && <input
                        ref={el => {
                            console.log("函数被调用了", el);
                            this.txt = el;
                        }} type='text' /> // this.getRef} type="text" />
                }
                <button onClick={this.handleClick}>显示/隐藏</button>
            </div>
            /*
            如果不是通过 外部的getRef 那么每次 render 都会重新创建一个新函数
            函数会调用两次
            如果ref的值发生了变动（旧的函数被新的函数替代），分别调用旧的函数以及新的函数
            第一次 null ，即旧的函数被调用
            第二次是目标
            */
        )
    }
}
