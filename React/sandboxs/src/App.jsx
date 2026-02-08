import React from 'react';


// import CoverButton from './test/CoverButton';
import Father from './test/Father';

const el = (
    // 写在 组件中间{ }中的 会自动传入到 props.children
    // <CoverButton>
    //     {{
    //         default: <h1>default</h1>,
    //         extra: <div>extra</div>
    //     }}
    // </CoverButton>

    <Father />
)


const App = () => el
export default App