// 直接不用cookie，用 H5 的 localStorage ，但是兼容性可能较差、并且攻击者可以 
// XSS: alert(localStorage.getItem("access_token"));
// 

// login.js
async function login(username, password) {
    const res = await fetch("https://api.example.com/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    // token 存 localStorage
    localStorage.setItem("access_token", data.token);

    console.log("登录成功，token 已保存");
}


// request.js
function authFetch(url, options = {}) {
    const token = localStorage.getItem("access_token");

    return fetch(url, {
        ...options,
        headers: {
            ...(options.headers || {}),
            Authorization: `Bearer ${token}`
        }
    });
}

authFetch("https://api.example.com/profile")
    .then(res => res.json())
    .then(data => console.log("用户信息:", data));