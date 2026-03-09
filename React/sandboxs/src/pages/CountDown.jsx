import React, { useEffect,useState,useRef} from 'react'

export default function(props){
    const { time: initialTime, interval = 1000 } = props
    const [time,setTime] = useState(initialTime)

    // 1
    const timerRef = useRef(null)
    useEffect(() => {
        timerRef.current = setInterval(() => {
            setTime(pre => pre-interval/1000)
        }, interval)
        // 提前卸载
        return () => clearInterval(timerRef.current)
    },[interval])
    useEffect(() => {
        const nextTime = time-interval/1000
        if(nextTime<=0){
            // 倒计时结束卸载
            clearInterval(timerRef.current)
        }
    },[time])

    // 2
    useEffect(() => {
        const nextTime = time-interval/1000
        if (nextTime <= 0) return // 先判断，确保不会显示负的
        const id = setTimeout(() => setTime(Math.max(0,nextTime)), interval) 
        // 或者通过 max 确保显示到 0 为止
        return () => clearTimeout(id)  // 清理
    }, [time,interval])

    return (
        <div>
            {time}
        </div>
    )
}