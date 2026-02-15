import React, { useState, useRef, useEffect } from 'react'

import { A, B } from './Comps'
import { withLog, withLogin, allApp } from '../../HOC'

const AWith = allApp(A) // withLogin(withLog(A))
const BWith = allApp(B) // withLogin(withLog(B))

// export default () => {
//     const [isLogin, setIsLogin] = useState(true)
//     // 不要在 render 中用 HOC, 会导致很多无效组件销毁创建


//     const myRef = useRef(null)

//     useEffect(() => {
//         console.log(myRef.current)
//     }, []) // 只执行一次 = componentDidMount

//     return (
//         <>
//             <AWith ref={myRef} isLogin={isLogin} name={'taishuaile'} />
//             <BWith isLogin={isLogin} name={'taishuaile'} />
//             <button onClick={() => setIsLogin(isLogin => !isLogin)}>toggle</button>
//         </>
//     )
// }

export default class App extends React.Component {
    state = {
        isLogin: true
    }

    myRef = React.createRef()

    componentDidMount() {
        console.log(this.myRef.current)
    }

    render() {
        return (
            <>
                <AWith
                    ref={this.myRef}
                    isLogin={this.state.isLogin}
                    name="taishuaile"
                />

                <BWith
                    isLogin={this.state.isLogin}
                    name="taishuaile"
                />

                <button
                    onClick={() =>
                        this.setState({ // 别忘记 setState 刷新
                            isLogin: !this.state.isLogin
                        })
                    }
                >
                    toggle
                </button>
            </>
        )
    }
}