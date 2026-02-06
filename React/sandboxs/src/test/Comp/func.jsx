// imr
import React from 'react'

export default function FuncComp(props) {
    console.log("=== props",props)
    /**
     * 危险！！否则排查很麻烦
     */
    // if(props?.obj?.name) props.obj.name = "250"
    // props.obj = {name: "250"}
    // error: readonly
    return (
        <>
            <h1>nihao {props.str} {props.num}</h1>
            <h1>objName: {props?.obj?.name}</h1>
            <h1>objUI: {props?.obj?.ui}</h1>
        </>
    )
}