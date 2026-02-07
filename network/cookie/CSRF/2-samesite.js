// 防御力强
// 但是可能误伤跨站资源、例如图片，所以也可以开启宽松 Lax 只扼杀 post ，放过 get

app.post("/login", (req, res) => {
    const token = "session_id_abc123";

    res.cookie("session_id", token, {
        httpOnly: true,     // JS 无法读取，防 XSS 偷 cookie
        secure: true,       // 只能 HTTPS
        sameSite: "strict", // 跨站请求不携带 cookie
    });

    res.json({ message: "登录成功" });
});