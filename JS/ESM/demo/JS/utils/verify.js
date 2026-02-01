import { login as loginApi } from '../api';
import { getFormElements } from './query';

let isLoginning = false;

/**
 * 处理用户登录逻辑
 * 包含表单验证、API 调用和状态管理
 */
export async function handleLogin() {
    if (isLoginning) {
        return;
    }
    
    const { txtUserName, txtUserPassword, btnSubmit } = getFormElements();
    
    isLoginning = true;
    btnSubmit.value = '登录中...';
    
    const userName = txtUserName.value.trim();
    const password = txtUserPassword.value;
    
    // 表单验证
    if (!userName) {
        alert('请填写账号');
        isLoginning = false;
        btnSubmit.value = '登录';
        return;
    }
    if (!password) {
        alert('请填写密码');
        isLoginning = false;
        btnSubmit.value = '登录';
        return;
    }
    
    try {
        const user = await loginApi(userName, password);
        if (user) {
            alert('登录成功，' + user.nickname);
        } else {
            alert('登录失败，账号密码错误');
            txtUserName.value = '';
            txtUserPassword.value = '';
            txtUserName.focus();
        }
    } catch (error) {
        console.error('登录请求失败:', error);
        alert('登录请求失败，请检查网络连接');
    } finally {
        isLoginning = false;
        btnSubmit.value = '登录';
    }
}

