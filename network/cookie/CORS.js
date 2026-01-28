// CORS 附带身份凭证的请求中需要显式声明附带 cookie

// 1. xhr
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

// 2. fetch api
fetch(url, {
    credentials: 'include',
});