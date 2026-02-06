import React from 'react'

export default class ClassComp extends React.Component {
    constructor(props) {
        super(props); // this.props = props
        console.log("=== props", props)
    }

    render() {
        return (
            <h1>nihao2 {this.props.num}</h1>
        )
    }
}