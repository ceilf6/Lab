import React from 'react';


// import CoverButton from './test/CoverButton';
// import Father from './test/Father';
// import Form from './components/Form';
// import { FileUpload } from './components';
// import Timer from './test/Timer';

// import ListKey from './test/ListKey';

import AppOldLifeCycle from './test/AppOldLifeCylcle'

const el = (
    // 写在 组件中间{ }中的 会自动传入到 props.children
    // <CoverButton>
    //     {{
    //         default: <h1>default</h1>,
    //         extra: <div>extra</div>
    //     }}
    // </CoverButton>

    // <Father />
    // <Form legend={['name','key']}/>

    // <FileUpload
    //     accept=".png,.jpg,.pdf"
    //     multiple
    //     onUpload={(files) => {
    //         console.log(files);
    //     }}
    // />

    // <Timer />
    <AppOldLifeCycle />
)


const App = () => el
export default App