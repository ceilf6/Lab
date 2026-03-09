import React, { useState, useEffect, useRef } from "react"

export default function () {
    const [num, setNum] = useState(0)

    // useEffect(() => {
    //     setInterval(() => {
    //         console.log(num)
    //     }, 1000)
    // }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            console.log(num)
        }, 1000)
        return () => clearInterval(timer)
    }, [num])

    const curNumRef = useRef(num)
    curNumRef.current = num // 更新、同步
    useEffect(() => {
        const timer = setInterval(() => {
            console.log('===cur num ref', curNumRef.current)
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    return (
        <button onClick={() => setNum(num + 1)}>
            {num}
        </button>
    )
}