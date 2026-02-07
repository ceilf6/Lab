// 在用户操作时后端返回 CSRF cookie 这是一次性的，仅能用于当前操作

async function initCsrf() {
    const res = await fetch("/csrf", { credentials: "include" });
    const data = await res.json();
    sessionStorage.setItem("csrfToken", data.csrfToken);
}

async function transfer() {
    const csrfToken = sessionStorage.getItem("csrfToken");

    const res = await fetch("/transfer", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({ to: "bob", amount: 100 }),
    });

    console.log(await res.json());
}