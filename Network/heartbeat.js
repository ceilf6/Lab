class HeartbeatWebSocket {
    constructor(url) {
        this.url = url
        this.ws = null

        this.heartbeatInterval = 5000   // 每5秒发一次心跳
        this.timeoutLimit = 15000       // 15秒没响应则断线

        this.heartbeatTimer = null
        this.timeoutTimer = null

        this.connect()
    }

    connect() {
        console.log("正在连接")

        this.ws = new WebSocket(this.url)

        // 连接成功
        this.ws.onopen = () => {
            console.log("已连接")
            this.startHeartbeat()
        }

        // 收到消息
        this.ws.onmessage = (event) => {
            if (event.data === "pong") {
                console.log("收到心跳")
                this.resetTimeout()
            } else {
                console.log("收到业务消息", event.data)
            }
        }

        // 连接关闭
        this.ws.onclose = () => {
            console.log("连接关闭，准备重连...")
            this.reconnect()
        }

        // 出错
        this.ws.onerror = (err) => {
            console.log("错误：", err)
            this.ws.close()
        }
    }

    startHeartbeat() {
        // 定时发送 ping
        this.heartbeatTimer = setInterval(() => {
            if (this.ws.readyState === WebSocket.OPEN) {
                console.log("发送心跳")
                this.ws.send("ping")

                // 启动超时检测
                this.resetTimeout()
            }
        }, this.heartbeatInterval)
    }

    resetTimeout() {
        // 清除旧超时计时器
        if (this.timeoutTimer) {
            clearTimeout(this.timeoutTimer)
        }

        // 超时未收到 pong
        this.timeoutTimer = setTimeout(() => {
            console.log("心跳超时，连接断开！")
            this.ws.close()
        }, this.timeoutLimit)
    }

    reconnect() {
        // 清除心跳
        clearInterval(this.heartbeatTimer)
        clearTimeout(this.timeoutTimer)

        // 延迟重连
        setTimeout(() => {
            this.connect()
        }, 3000)
    }
}