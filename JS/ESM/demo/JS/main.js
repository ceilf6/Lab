/**
 * 应用主入口文件
 * 负责初始化应用和绑定事件
 */
import { getFormElements, handleLogin } from './index.js';

// 初始化应用
function initApp() {
    const { formContainer } = getFormElements();
    
    // 绑定表单提交事件
    formContainer.addEventListener('submit', (e) => {
        e.preventDefault();
        handleLogin();
    });
}

// DOM 加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
