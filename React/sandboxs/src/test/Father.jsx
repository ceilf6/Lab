import React from 'react'
import Child from './Child'

export default class Father extends React.Component{
    state = {
        num: 10
    }

    // 通过箭头函数拿到 this 上下文
    changeFatherNum = (newNum) => {
        this.setState({num: newNum})
    }

    render(){
        return (
            <div>
                <h1>{this.state.num}</h1>
                <Child changeFatherNum={this.changeFatherNum} fatherNum={this.state.num}></Child>
            </div>
        )
    }   
}