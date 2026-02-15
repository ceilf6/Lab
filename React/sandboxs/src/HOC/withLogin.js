// 用于登录控制的HOC

import React from "react";

export default function withLogin(Comp, modifier) {
    const Wrapped = React.forwardRef((props, ref) => {
        if (!props.isLogin) return null

        return (
            <>
                <h1>{modifier}</h1>
                <Comp {...props} ref={ref} />
            </>
        )
    })

    Wrapped.displayName = `withLogin(${Comp.displayName || Comp.name})`
    return Wrapped
}