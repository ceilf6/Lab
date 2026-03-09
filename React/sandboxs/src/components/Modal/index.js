import React, { useState } from "react"

export default function Modal({ title = "提示", children, triggerText = "打开弹窗" }) {
    const [visible, setVisible] = useState(false)

    return (
        <>
            <button onClick={() => setVisible(true)}>{triggerText}</button>

            {visible && (
                <div
                    onClick={() => setVisible(false)} // 用于支持点击遮罩关闭弹窗
                >
                    <div
                        onClick={e => e.stopPropagation()}
                    >
                        {/* 如果不 e.stopPropagation阻止冒泡 那么会导致点击模态框内部就关闭 */}
                        <button
                            onClick={() => setVisible(false)}
                        >关闭</button>
                        <div>{children ?? "这是模态框内容"}</div>
                    </div>
                </div>
            )}
        </>
    )
}
