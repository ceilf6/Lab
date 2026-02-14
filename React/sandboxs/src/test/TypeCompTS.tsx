import React from "react"

interface TypeCompTSProps{
    att: number // 必填的话不写 ? 即可
    name?: string
}

export default function TypeCompTS(props:TypeCompTSProps){
    const {att,name,...rest} = props

    return (
        <>
            <h1>{ att }</h1>
            <h1>{ name || 'ceilf6'}</h1>
        </>
    )
}