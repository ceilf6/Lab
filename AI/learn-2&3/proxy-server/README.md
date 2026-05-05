# Proxy Server

Node.js HTTP/HTTPS 代理服务器，支持 WebSocket，带完整请求/响应日志记录功能。

## 功能特性

- HTTP/HTTPS 请求转发
- WebSocket 协议支持
- 完整的请求/响应日志记录
- 日志文件自动管理（最多保留20个文件）
- 可配置的目标地址和日志目录

## 环境变量

| 变量名 | 必需 | 默认值 | 说明 |
|--------|------|--------|------|
| `TARGET_URL` | 是 | - | 目标服务器地址 |
| `PORT` | 否 | 3000 | 代理服务器监听端口 |
| `LOG_DIR` | 否 | ./logs | 日志文件存储目录 |
| `LOG_LEVEL` | 否 | info | 日志级别 (error/warn/info/debug) |

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

```bash
cp .env.example .env
# 编辑 .env 文件，设置 TARGET_URL
```

### 3. 启动服务

```bash
npm start
```

或使用 nodemon 开发模式：

```bash
npm run dev
```

### 4. 直接启动（带环境变量）

```bash
TARGET_URL=http://localhost:8080 npm start
```

## 日志说明

日志文件保存在 `LOG_DIR` 目录下，文件命名格式：

```
request-YYYY-MM-DD-HHmmss-UUID.log
```

每个请求响应保存为一个独立的日志文件，包含：
- 请求方法、URL、Headers、Body
- 响应状态码、Headers、Body
- 请求耗时

**自动清理**：当日志文件超过20个时，会自动删除最旧的文件。

## 示例

```bash
# 启动代理到 httpbin.org
TARGET_URL=https://httpbin.org PORT=3000 npm start

# 测试代理
curl http://localhost:3000/get
```

## License

MIT
