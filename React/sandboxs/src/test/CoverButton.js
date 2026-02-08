import React from 'react'

function CoverButton(props) {
    return (
        <div>
            <button>{props.children.default}</button>
            <h1>{props.children.extra}</h1>
        </div>
    )
}

export default CoverButton