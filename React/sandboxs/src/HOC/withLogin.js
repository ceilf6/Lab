// 用于登录控制的HOC

import React from "react";

export default function withLogin(Comp, modifier) {
    function LoginWrapper(props) {
        if (props.isLogin) {
            const { forwardRef, ...rest } = props
            return (
                <>
                    <h1>{modifier}</h1>
                    {/* 还能额外修饰等等、玩法很多 */}
                    <Comp {...rest} ref={forwardRef} />
                </>
            )
        }
        return null;
    }

    return React.forwardRef((props, ref) => {
        return <LoginWrapper {...props} forwardRef={ref} />
    })
}