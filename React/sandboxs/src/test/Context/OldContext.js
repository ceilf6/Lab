import React, { Component } from "react";
import PropTypes from "prop-types";

// const types = {
//   top: PropTypes.number,
//   son: PropTypes.string.isRequired,
//   onChangeTop: PropTypes.func,
// };

export default class OldContext extends Component {
  /**
   * 约束上下文中数据的类型
   */
  static childContextTypes = {
    top: PropTypes.number,
    onChangeTop: PropTypes.func,
  };

  state = {
    top: 123,
  };

  /**
   * 得到上下文中的数据
   */
  getChildContext() {
    console.log("获取新的上下文");
    return {
      top: this.state.top,
      onChangeTop: (newTop) => { // 下放权力
        this.setState({
          top: newTop,
        });
      },
    };
  }

  render() {
    return (
      <div>
        <Son />
        <button
          onClick={() => {
            this.setState({
              top: this.state.top + 1,
            });
          }}
        >
          top加1
        </button>
      </div>
    );
  }
}

class Son extends Component {
  static contextTypes = {
    top: PropTypes.number,
    onChangeTop: PropTypes.func,
  };

  static childContextTypes = {
    son: PropTypes.string,
    top: PropTypes.number,
    onChangeTop: PropTypes.func,
  };


  state = {
    son: "ceilf6",
  }

  getChildContext() {
    // 返回的对象，即为上下文中的数据
    return {
      son: this.state.son, // 上下文中的数据不可以直接变化，最终都是通过状态改变
      top: this.context.top,
      onChangeTop: this.context.onChangeTop
      // 旧 context 不会自动“穿透”，必须手动透传
    };
  }

  render() {
    return (
      <div>
        <h1>Son</h1>
        <h2>
          son:{this.context.son} {this.context.top}
        </h2>
        <Grandson />
      </div>
    );
  }
}

class Grandson extends React.Component {
  /**
   * 声明需要使用哪些上下文中的数据
   */
  static contextTypes = {
    top: PropTypes.number,
    son: PropTypes.string,
    onChangeTop: PropTypes.func,
  };

  // 构造函数中，通过第二个参数，获取上下文数据
  constructor(props, context) {
    super(props, context) // 参数的上下文交给父类处理
    console.log("=== context", context)
  }

  // 从组件的context属性中获取
  componentDidMount = () => {
    console.log("=== context", this.context)
  }

  render() {
    return (
      <p>
        Grandson，来自于上下文的数据：top: {this.context.top}, son:{this.context.son}
        ，c: {this.context.c}
        <button
          onClick={() => {
            this.context.onChangeTop(this.context.top + 2);
          }}
        >
          子组件的按钮，a+2
        </button>
        {/* 若子组件改变上下文数据，需要上面人下放权力：处理函数 */}
      </p>
    );
  }
}
