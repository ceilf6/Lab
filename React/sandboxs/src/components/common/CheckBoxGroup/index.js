import React, { Component } from 'react'
import types from "../../../utils/commonTypes"
import PropTypes from "prop-types"
import { withDataGroup } from '../../../HOC'

// 细化粒度：从一个框出发
// 将重复渲染的事情交给HOC
class CheckBox extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired, // 当前框的name
        onChange: PropTypes.func, // 处理事件函数
        info: types.singleData.isRequired, // 显示信息
        chooseDatas: types.chooseDatas.isRequired // 当前选中数据
    }

    handleChange = e => {
        let newArr;
        if (e.target.checked) {
            newArr = [...this.props.chooseDatas, e.target.value];
        }
        else {
            newArr = this.props.chooseDatas.filter(it => it !== e.target.value);
        }
        this.props.onChange && this.props.onChange(newArr);
    }

    render() {
        return (<label>
            <input
                type="checkbox"
                name={this.props.name}
                value={this.props.info.value}
                checked={this.props.chooseDatas.includes(this.props.info.value)}
                onChange={this.handleChange}
            />
            {this.props.info.text}
        </label>);
    }
}

// 利用高阶组件导出多个
export default withDataGroup(CheckBox);
