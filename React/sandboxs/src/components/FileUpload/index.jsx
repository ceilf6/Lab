import React from 'react';

class FileUpload extends React.Component {
    constructor(props) {
        super(props);
        // 创建 ref，命名采用 xxxRef
        this.uploadRef = React.createRef();
    }

    clickHandle = () => {
        // 通过 this.uploadRef.current 获取 input DOM 节点
        const files = this.uploadRef.current ? this.uploadRef.current.files : null;

        if (!files || !files.length) {
            console.log('请先选择文件');
            return;
        }

        console.log(files);

        if (typeof this.props.onPick === 'function') {
            this.props.onPick(files);
        }
    };

    render() {
        const { accept, multiple = false, buttonText = '获取用户输入的内容' } = this.props;

        return (
            <div>
                <input type="file" ref={this.uploadRef} accept={accept} multiple={multiple} />
                <button type="button" onClick={this.clickHandle}>{buttonText}</button>
            </div>
        );
    }
}

export default FileUpload;
