import React from "react";

function A(props, ref) {
    // 作为参数传入
    return (
        <h1 ref={ref}>
            组件A
            <br />
            <span>{props.words}</span>
        </h1>
    );
}

//传递函数组件A，得到一个新组件NewA
const NewA = React.forwardRef(A);

export default class App extends React.Component {
    ARef = React.createRef();

    componentDidMount() {
        console.log(this.ARef);
    }

    render() {
        return (
            <div>
                <NewA ref={this.ARef} words="ceilf6" />
                {/* 传入 */}
            </div>
        );
    }
}
