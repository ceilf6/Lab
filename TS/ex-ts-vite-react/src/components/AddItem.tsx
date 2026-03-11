import React, { useState } from 'react'

interface AddItemProps {
    onAdd: (text: string) => void,
    children?: string
}

export default function AddItem(props: AddItemProps) {
    const [text,setText] = useState<string>('')
    const {onAdd, children} = props

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault() // 阻止默认事件，否则表单提交后会导致刷新
            if(text)
                onAdd(text)
            setText('')
        }

  return (
    <form 
        onSubmit={handleSubmit}
        // onSubmit={(e) => {
        //     e.preventDefault() // 阻止默认事件，否则表单提交后会导致刷新
        //     if(text)
        //         onAdd(text)
        //     setText('')
        // }}
    >
        <input type="text" 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setText(e.target.value)
            }}
            value={text} // 受控组件
        />
        <button 
            type='submit'
            // onClick={() => {
            //     onAdd(text)
            //     setText('')
            // }}
        >
            {children}
        </button>
    </form>
  )
}
