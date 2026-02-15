import React from 'react'
// import {CheckBoxGroupText,SelectText ,RadioBoxGroupText} from './components'
// import Comp from './test/RefTestFunc'
// import ForwardRefTest from './test/ForwardRefTest copy'
import AppHOC from './test/HOC/App'

const el = (
    <>
        {/* <CheckBoxGroupText />
        <SelectText />
        <RadioBoxGroupText /> */}
        <AppHOC />
    </>
)


const App = () => el
export default App