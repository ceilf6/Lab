/**
 * 获取表单相关的 DOM 元素
 * 注意：必须在 DOM 加载完成后调用
 * @returns {Object} 包含表单元素的对象
 */
export function getFormElements() {
    return {
        txtUserName: document.querySelector('#userName'),
        txtUserPassword: document.querySelector('#userPassword'),
        formContainer: document.querySelector('#formContainer'),
        btnSubmit: document.querySelector('#btnSubmit')
    };
}
