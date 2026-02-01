import "../../../../env.js";

const BASE_URL = window._ENV.BASE_URL;
const url = BASE_URL + 'api/user/login';

/**
 * 用户登录 API
 * @param {string} username - 用户名
 * @param {string} password - 密码
 * @returns {Promise<Object|null>} 返回用户信息对象，登录失败返回 null
 * @throws {Error} 网络请求失败时抛出错误
 */
export function login(username, password) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ loginId: username, loginPwd: password }),
    })
        .then((resp) => {
            if (!resp.ok) {
                throw new Error(`HTTP error! status: ${resp.status}`);
            }
            return resp.json();
        })
        .then((resp) => resp.data)
        .catch((error) => {
            console.error('登录 API 请求失败:', error);
            throw error;
        });
}