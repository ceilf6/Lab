#!/bin/bash
# Word MCP Server 启动脚本（简化版）

cd "$(dirname "$0")"

# 检查虚拟环境
if [ ! -d ".venv" ]; then
    echo "创建虚拟环境..."
    python3 -m venv .venv
fi

# 激活虚拟环境
source .venv/bin/activate

# 检查依赖
if ! python -c "import mcp" 2>/dev/null; then
    echo "安装依赖..."
    pip install -e .
fi

# 运行服务器
echo "启动 Word MCP Server..."
python main_simple.py

