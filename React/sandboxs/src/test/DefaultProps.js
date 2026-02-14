import React from 'react'

// === child
function DefaultProps(props) {
    return (
        <div>
            {props.defaultAtt}
            |
            {props.att}
        </div>
    )
}
// 设置默认值
DefaultProps.defaultProps = {
    defaultAtt: 'ceilf6'
}

class DefaultPropsClass extends React.Component {
    static defaultProps = { // 可以写外面也可以写里面
        defaultAtt: 'ceilf7'
    }

    constructor(props) {
        super(props)
        console.log(props) // 在构造函数前初始化阶段就实现了 assign
    }

    render() {
        return (
            <div>
                {this.props.defaultAtt}
                |
                {this.props.att}
            </div>
        )
    }
}
DefaultPropsClass.defaultProps = {
    defaultAtt: 'ceilf6'
}


// === father

export default function DefaultPropsFather() {
    return (
        <>
            <DefaultProps att={'from father'} />
            <DefaultPropsClass att={'from father'} />
        </>
        // 如果传入数据的话会直接进行混合 assign
    )
}