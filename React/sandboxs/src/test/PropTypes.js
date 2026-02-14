// TS 直接用 interface 编译期强制规定即可
// 老项目 JS 的话得用 prop-type 库 ，那么只能在运行时报错

import React from 'react'
import PropTypes from "prop-types"

// === child
function PropTypesFunc(props) {
    return (
        <div>
            {props.att}
        </div>
    )
}
PropTypesFunc.propTypes = {
    att: PropTypes.number
}

class PropTypesClass extends React.Component {
    static propTypes = { // 可以写外面也可以写里面
        att: PropTypes.number.isRequired // 链式调用添加一个 isRequired 函数进行检查
    }

    render() {
        return (
            <div>
                {this.props.att}
            </div>
        )
    }
}
PropTypesClass.propTypes = {
    att: PropTypes.string
}


// === father

export default function PropTypesComp() {
    return (
        <>
            <PropTypesFunc att={'from father'} />
            <PropTypesClass att={'from father'} />
        </>
    )
}