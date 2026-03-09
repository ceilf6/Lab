import React, { useEffect,useState,useRef} from 'react'

export default function(props){
    const [time,setTime] = useState(props.time)

    // 1
    const timerRef = useRef(null)
    useEffect(() => {
        timerRef.current = setInterval(() => {
            setTime(pre => pre-1)
        },1000)
        // 提前卸载
        return () => clearInterval(timerRef.current)
    },[])
    useEffect(() => {
        if(time<=0){
            // 倒计时结束卸载
            clearInterval(timerRef.current)
        }
    },[time])

    // 2
    useEffect(() => {
        if (time <= 0) return
        const id = setTimeout(() => setTime(time-1), 1000)
        return () => clearTimeout(id)  // 清理
    }, [time])

    return (
        <div>
            {time}
        </div>
    )
}