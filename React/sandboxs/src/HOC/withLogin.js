// 用于登录控制的HOC

import React from "react";

export default function withLogin(Comp, modifier) {
    return function LoginWrapper(props) {
        if (props.isLogin) {
            return (
                <>
                    <h1>{modifier}</h1>
                    {/* 还能额外修饰等等、玩法很多 */}
                    <Comp {...props} />
                </>
            )
        }
        return null;
    }
}