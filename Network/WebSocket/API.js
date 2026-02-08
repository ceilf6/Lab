const ws = new WebSocket("地址"); // 创建websocket连接，浏览器自动握手

// 事件：握手完成后触发
ws.onopen = function () {
    console.log('连接到了服务器');
};
// 事件：收到服务器消息后触发
ws.onmessage = function (e) {
    console.log(e.data); // e.data：服务器发送的消息
};
// 事件：连接关闭后触发
ws.onclose = function () {
    console.log('连接关闭了');
};

// 发送消息到服务器
ws.send(消息);
// 连接状态：0-正在连接中  1-已连接  2-正在关闭中  3-已关闭
ws.readyState