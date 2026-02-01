import "../../../../env.js";

const BASE_URL = window._ENV.BASE_URL;
const url = BASE_URL + 'api/user/login';

export function login(username, password) {

    return fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ loginId: username, loginPwd: password }),
    })
        .then((resp) => resp.json())
        .then((resp) => resp.data);
}