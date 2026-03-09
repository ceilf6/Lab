import React from "react";

export default class This extends React.Component {
    childFunc = () => {
        console.log("===childFunc", this)
    }

    fatherFunc() {
        console.log("===fatherFunc", this)
        console.log("===this.childFunc", this.childFunc)
    }

    render() {
        return (
            <button onClick={this.fatherFunc}>
                Click
            </button>
        )
    }
}