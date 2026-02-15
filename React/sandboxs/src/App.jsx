import React from 'react'
// import {CheckBoxGroupText,SelectText ,RadioBoxGroupText} from './components'
// import Comp from './test/RefTestFunc'
// import ForwardRefTest from './test/ForwardRefTest copy'
// import AppHOC from './test/HOC/App'
import ForceReRender from './test/Context/ForceReRender'

const el = (
    <>
        {/* <CheckBoxGroupText />
        <SelectText />
        <RadioBoxGroupText /> */}
        <ForceReRender />
    </>
)


const App = () => el
export default App