import React, { useState } from 'react'

import { A, B } from './Comps'
import { withLog, withLogin, allApp } from '../../HOC'

const AWith = allApp(A) // withLogin(withLog(A))
const BWith = allApp(B) // withLogin(withLog(B))

export default () => {
    const [isLogin, setIsLogin] = useState(true)
    // 不要在 render 中用 HOC, 会导致很多无效组件销毁创建

    return (
        <>
            <AWith isLogin={isLogin} name={'taishuaile'} />
            <BWith isLogin={isLogin} name={'taishuaile'} />
            <button onClick={() => setIsLogin(isLogin => !isLogin)}>toggle</button>
        </>
    )
}