import React from "react"
import types from "../utils/commonTypes"
// 根据数据进行遍历、重复渲染 => 一组表单组件

export default function withDataGroup(Comp) {
    return class DataGroupWrapper extends React.Component {
        static defaultProps = {
            data: []
        }

        static propTypes = {
            datas: types.groupDatas
        }

        render() {
            const Comps = this.props.datas.map(it =>
                <Comp key={it.value} {...this.props} info={it} />)
            return (
                <>
                    {Comps}
                </>
            )
        }
    }
}