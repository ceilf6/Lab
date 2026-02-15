import React from 'react'

class A extends React.Component {
    render() {
        return <h1 ref={this.props.ref1}>
            组件A
            <span>{this.props.words}</span>
        </h1>
    }
}

const NewA = React.forwardRef((props, ref) => {
    return <A {...props} ref1={ref} />
})

export default class App extends React.Component {

    ARef = React.createRef()

    componentDidMount() {
        console.log(this.ARef);
    }

    render() {
        return (
            <div>
                <NewA ref={this.ARef} words="ceilf6" />
            </div>
        )
    }
}

