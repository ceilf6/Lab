import React from 'react'

// 上下文一般需要单独文件模块管理，方便随时导入
const ctx = React.createContext() // {
//     name: 'ceilf6',
//     num: 100
// })

console.log(ctx)

// NewContext -> Provider -> ...
// 由上下文对象的 Provider 属性组件提供
export default class NewContext extends React.Component {
    state = {
        name: 'ceilf6',
        top: 100,
        son: 'ceilf7', // 单向数据流，son动不了，只能上提 // 或者自己维护一个另外的ctx2
        onChangeTop: (newTop) => this.setState({ top: newTop })
    }
    render() {
        // const Provider = ctx.Provider
        return (
            <ctx.Provider value={this.state}>
                {/* {{ name: 'ceilf7' }}> */}
                <Son></Son>
            </ctx.Provider>
        )
    }
}

function Son() {
    const value = React.useContext(ctx)

    return (
        <div>
            <h1>Son</h1>
            <h2>
                son:{value.son} top:{value.top}
            </h2>
            <Grandson />
        </div>
    )
}

// function Son() {
//     return (
//         <ctx.Consumer>
//             {value => (
//                 <div>
//                     <h1>Son</h1>
//                     <h2>
//                         son:{value.son} top:{value.top}
//                     </h2>
//                     <Grandson />
//                 </div>
//             )}
//         </ctx.Consumer>
//     )
// }

class Grandson extends React.Component {
    static contextType = ctx

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
