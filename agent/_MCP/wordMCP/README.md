# Word Document MCP Server

一个简单的 MCP 服务器，用于 Word 文档操作。

## 功能特性

### 🔧 Tools (工具)

1. **create_document** - 创建新文档
2. **read_document** - 读取文档内容
3. **update_document** - 更新文档
4. **delete_document** - 删除文档
5. **list_documents** - 列出所有文档
6. **add_table** - 添加表格
7. **insert_image** - 插入图片
8. **format_text** - 格式化文本
9. **search_replace** - 搜索替换

### 📦 Resources

- **file://documents** - 文档列表

### 💬 Prompts

- **help_prompt** - 使用帮助

## 快速开始

### 1. 安装依赖

```bash
# 创建虚拟环境
python3 -m venv .venv

# 激活虚拟环境
source .venv/bin/activate  # macOS/Linux

# 安装
pip install -e .
```

### 2. 运行

```bash
# 使用启动脚本
./run_simple.sh

# 或手动运行
source .venv/bin/activate
python main.py
```

## 使用示例

### 创建文档
```python
create_document(
    filename="report.docx",
    title="年度报告",
    content="这是报告内容"
)
```

### 添加表格
```python
add_table(
    filename="report.docx",
    table_data=[["姓名", "年龄"], ["张三", "25"]],
    title="人员表"
)
```

### 格式化文本
```python
format_text(
    filename="report.docx",
    paragraph_index=0,
    bold=True,
    font_size=14
)
```

## 连接 MCP 客户端

在 openMCP 中配置：
- **命令**: `mcp`
- **参数**: `run main_simple.py`
- **工作目录**: 项目路径

## 项目结构

```
wordMCP/
├── main_simple.py   # MCP 服务器
├── pyproject.toml   # 项目配置
├── README.md        # 本文档
├── run_simple.sh    # 启动脚本
└── word/            # 文档目录（自动创建）
```

## 依赖

- `mcp[cli]>=1.24.0`
- `python-docx>=1.1.0`

## 许可证

MIT

