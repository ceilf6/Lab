# FastMCP Demo Server

这是一个基于 FastMCP 的 MCP (Model Context Protocol) 服务器演示项目。

## 功能特性

本演示服务器展示了 FastMCP 的主要功能：

### 🔧 Tools (工具)

1. **greet** - 多语言问候工具
   - 支持英语、中文、西班牙语、法语
   - 参数：`name` (必需), `language` (可选，默认 "en")

2. **calculate** - 数学计算工具
   - 安全地计算数学表达式
   - 参数：`expression` (数学表达式字符串)

3. **get_weather** - 天气查询工具（模拟数据）
   - 获取城市的天气信息
   - 参数：`city` (城市名), `unit` (温度单位，默认 "celsius")

### 📦 Resources (资源)

1. **file://config** - 服务器配置信息
2. **file://server_info** - 服务器信息和统计

### 💬 Prompts (提示模板)

1. **greeting_template** - 问候语模板生成器
   - 参数：`name`, `occasion` (meeting/birthday/farewell)

2. **calculation_help** - 计算器使用帮助

## 安装

### 方法 1: 使用虚拟环境（推荐）

```bash
# 创建虚拟环境
python3 -m venv venv

# 激活虚拟环境
source venv/bin/activate  # macOS/Linux
# 或
venv\Scripts\activate     # Windows

# 安装依赖
python -m pip install --upgrade pip
python -m pip install -e .
```

### 方法 2: 使用 uv（如果已安装）

```bash
uv sync
```

### 方法 3: 使用 pip（需要系统支持）

```bash
pip install -e .
```

## 运行

### 使用虚拟环境运行

```bash
# 激活虚拟环境
source venv/bin/activate  # macOS/Linux

# 运行服务器
python main.py
```

### 使用 uv 运行

```bash
uv run python main.py
```

## 使用示例

### 作为 MCP 服务器运行

服务器使用 stdio 传输，可以通过 MCP 客户端连接使用。

### 连接 openMCP

如果使用 openMCP 客户端，需要确保：

1. **虚拟环境路径正确**：openMCP 会使用 `.venv` 目录（如果存在）
   ```bash
   # 确保在 .venv 中安装了依赖
   source .venv/bin/activate
   python -m pip install -e .
   ```

2. **配置 openMCP**：
   - 命令：`/Users/a86198/Desktop/Lab/agent/a_MCP/starter/.venv/bin/mcp`
   - 参数：`run main.py`
   - 工作目录：`/Users/a86198/Desktop/Lab/agent/a_MCP/starter`

   或者使用相对路径：
   - 命令：`mcp`
   - 参数：`run main.py`
   - 工作目录：项目根目录（需要确保 `.venv/bin` 在 PATH 中）

### 测试工具

你可以通过 MCP 客户端调用以下工具：

```python
# 问候工具
greet(name="Alice", language="zh")

# 计算工具
calculate(expression="2 + 2 * 3")

# 天气工具
get_weather(city="beijing", unit="celsius")
```

## 项目结构

```
starter/
├── main.py          # FastMCP 服务器主文件
├── pyproject.toml   # 项目配置和依赖
├── README.md        # 项目说明
├── uv.lock          # 依赖锁定文件（如果使用 uv）
└── venv/            # 虚拟环境目录（创建后生成）
```

## 依赖

- `mcp[cli]>=1.24.0` - MCP 协议支持（包含 FastMCP）
  - 注意：本项目使用 MCP SDK 内置的 FastMCP (`mcp.server.fastmcp`)，而不是独立的 fastmcp 包
  - 这样可以确保与 MCP CLI 工具（如 `mcp run`）完全兼容

## 许可证

MIT

