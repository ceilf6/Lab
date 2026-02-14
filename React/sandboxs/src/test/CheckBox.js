import React, { Component } from 'react'

export default class CheckedBox extends Component {

    state = {
        val: "123",
        loves: ["足球", "篮球", "音乐", "其他"],
        chooseLoves: ["篮球", "音乐"],
    }

    render() {
        const CheckedBox = this.state.loves.map(it => (<label key={it}>
            <input
                type="checkbox"
                checked={this.state.chooseLoves.includes(it)}
                onChange={e => {
                    if (e.target.checked) {
                        this.setState({
                            chooseLoves: [...this.state.chooseLoves, it]
                            // 最好不要改变state原先状态，用 [... , ] 拼凑而不是 push
                        })
                    }
                    else {
                        this.setState({
                            chooseLoves: this.state.chooseLoves.filter(l => l !== it)
                            // 最好不要改变原先状态，用 filter 而不是 slice
                        })
                    }
                }}
            />
            {it}
        </label>))
        return (
            <div>
                {CheckedBox}
            </div>
        )
    }
}

