import delay from "../utils/delay";

export async function login(loginId, loginPwd) {
    await delay(1000);
    if (loginId === "ceilf6" && loginPwd === "666666") {
        const user = {
            loginId,
            name: "ceilf6",
        };
        localStorage.setItem("user", JSON.stringify(user)); // 模拟 cookie 实现登陆态缓存
        return user;
    }
    return null;
}

export async function loginOut() {
    await delay(1000);
    localStorage.removeItem("user"); // 注销：直接删除缓存即可
}

export async function whoAmI() { // 通过缓存恢复登陆态
    await delay(1000);
    const user = localStorage.getItem("user");  // 模拟 jwt、令牌
    if (user) {
        return JSON.parse(user);
    }
    return null;
}

