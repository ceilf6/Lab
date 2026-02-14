import React from 'react';


// import CoverButton from './test/CoverButton';
// import Father from './test/Father';
// import Form from './components/Form';
// import { FileUpload } from './components';
// import Timer from './test/Timer';

// import ListKey from './test/ListKey';

// import AppLifeCylcle from './test/AppLifeCylcle'

// import CheckedBox from './test/CheckedBox';

// import FormTest from './test/FormTest';

// import DefaultPropsFather from './test/DefaultProps';

// import PropTypesComp from './test/PropTypes'
// import TypeCompTS from './test/TypeCompTS.tsx';

import HOCApp from './test/HOC/App'

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
    // <>
    //     <PropTypesComp />
    //     <TypeCompTS att={666}/>
    // </>
    // TS 的话 App 也得是用 TS 才能报错

    <HOCApp />
)


const App = () => el
export default App