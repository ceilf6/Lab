import React, { Component } from 'react'

export default class Comp extends Component {
    constructor(props) {
        super(props);
        this.txt = React.createRef();
    }

    handleClick = () => {
        const cur = this.txt.current
        console.log("=== this", this)
        console.log("=== this.txt", this.txt)
        console.log("=== this.txt.current", cur)
        cur.focus();
    }

    render() {
        return (
            <div>
                <input ref={this.txt} type="text" />
                <button onClick={this.handleClick}>聚焦</button>
            </div>
        )
    }
}

