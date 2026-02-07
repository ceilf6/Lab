# 长短期双Token

**短期**令牌 Access Token 放在前端例如 **localStorage** 中

**长期**令牌 Refresh Token 放在 **HttpOnly Cookie 中供服务器端**使用（防XSS），且开启 Secure

1. 登录
    1. 前端发送 POST 请求
    2. 服务器验证成功后返回 长期令牌 - 浏览器自动放到 Cookie 中；
    
    ```jsx
    Set-Cookie: refresh_token=xxx; HttpOnly; Secure; SameSite=Lax; Max-Age=7d
    ```
    
    并在 响应体 中返回 短期令牌 - 前端保存到内存（JS变量）或者 localStorage 中
    
    ```jsx
    {
      "access_token": "xxx",
      "expire_in": 900
    }
    ```
    
2. 调用业务 API 时，请求手动携带 Access Token
    
    ```jsx
    GET /api/userinfo
    Authorization: Bearer ACCESS_TOKEN
    ```
    
    1. 没有过期的话直接服务器验证然后返回
    2. 如果服务器返回 **401** 表示短期令牌 Access Token 过期了，那么前端立即调用 POST /api/refresh_token **携带上 长期令牌 refresh_token 去请求**，服务器端验证长期令牌成功后会在响应体中返回新的 短期令牌 ，前端更新 Access Token
    3. 如果返回 **403** 表示长期令牌也过期了，那么就需要重新登录