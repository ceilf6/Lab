import React from "react"

export function Btn() {
    return (
        <button onClick={(e) => console.log("=== 我被电击了", e)}>
            点我
        </button>
    )
}

export class MyBtn extends React.Component {
    render() {
        return (
            <button onClick={this.props.callback}>
                点我
            </button>
        )
    }
}