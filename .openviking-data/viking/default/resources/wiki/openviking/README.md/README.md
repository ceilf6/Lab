# OpenViking 渐进式探索接入

本文档把 OpenViking 作为本仓库的旁路上下文层使用：探索知识库时先走 OpenViking 的 L0/L1/L2 分层上下文，代码级调用关系、影响分析和提交前检查仍走 GitNexus。

## 目标

- 让 LLM 先通过目录级摘要理解 `Wiki` 的知识地图，再按需下钻到具体笔记、demo 或源码。
- 避免把 Chromium、Node、V8、LangChain 这类大型源码镜像直接放进默认检索噪声池。
- 为 Codex、Claude、OpenClaw 等客户端提供一致的 MCP 接入口。

## 本地试点

### 模型 API 要求

OpenViking 至少需要 embedding 模型 API 来做向量化和语义检索。VLM 用于图片、截图、视频帧、PDF 中的视觉内容等多模态解析；如果只摄入 Markdown、HTML、代码和纯文本，可以先不启用 VLM，但默认 manifest 中的 `.effect-pictures/` 建议等 VLM 配好后再摄入。Rerank 是增强项，第一阶段可以先不配。

1. 安装 OpenViking。

```bash
pip install openviking --upgrade --force-reinstall
```

如果使用官方独立 CLI，也可以安装 `ov`。本仓库脚本会按顺序寻找 `OPENVIKING_BIN`、`openviking`、`ov`。

2. 准备私有配置。

```bash
mkdir -p .openviking-local .openviking-data
cp docs/openviking/ov.conf.example.json .openviking-local/ov.conf
cp docs/openviking/ovcli.conf.example.json .openviking-local/ovcli.conf
```

把 `.openviking-local/ov.conf` 中的 embedding/VLM 配置替换为自己的模型服务。不要提交 `.openviking-local/` 或 `.openviking-data/`。

也可以用环境变量生成本地配置：

```bash
OPENVIKING_EMBEDDING_API_BASE="http://your-embedding-host/v1" \
OPENVIKING_EMBEDDING_API_KEY="..." \
OPENVIKING_EMBEDDING_MODEL="your-embedding-model" \
OPENVIKING_EMBEDDING_DIMENSION="1024" \
OPENVIKING_VLM_API_BASE="http://your-openai-compatible-host/v1" \
OPENVIKING_VLM_API_KEY="..." \
OPENVIKING_VLM_MODEL="gpt-5.4-mini" \
scripts/openviking-write-local-config.sh
```

如果模型网关没有 `/v1/embeddings` 可用模型，OpenViking 的语义检索不能初始化；不要把 chat model 当作 embedding model 填进去。

如果只有 chat/VLM 网关、没有 embedding 渠道，可以先启动本仓库的本地 OpenAI-compatible embedding shim 打通端到端流程：

```bash
OPENVIKING_LOCAL_EMBEDDING_DIMENSION=384 \
  scripts/openviking-local-embedding-server.mjs
```

然后生成配置时使用：

```bash
OPENVIKING_EMBEDDING_PROVIDER="openai" \
OPENVIKING_EMBEDDING_API_BASE="http://127.0.0.1:1934/v1" \
OPENVIKING_EMBEDDING_API_KEY="local" \
OPENVIKING_EMBEDDING_MODEL="wiki-local-hash-embedding" \
OPENVIKING_EMBEDDING_DIMENSION="384" \
OPENVIKING_VLM_API_BASE="http://your-openai-compatible-host/v1" \
OPENVIKING_VLM_API_KEY="..." \
OPENVIKING_VLM_MODEL="gpt-5.4-mini" \
scripts/openviking-write-local-config.sh
```

这个 shim 使用词/字符 n-gram 的 feature hashing 生成向量，只用于本地闭环和低成本验证；生产检索质量仍建议换成真实 embedding 模型。

3. 启动服务端。

```bash
OPENVIKING_CONFIG_FILE="$PWD/.openviking-local/ov.conf" openviking-server --config "$PWD/.openviking-local/ov.conf"
```

4. 摄入首批低噪声资源。

```bash
OPENVIKING_CLI_CONFIG_FILE="$PWD/.openviking-local/ovcli.conf" \
  scripts/openviking-ingest.sh --wait
```

默认 manifest 是 `docs/openviking/ingest-manifest.tsv`。脚本会展开 `file`、`dir`、`glob` 三类条目，并跳过 manifest 中标记的 `exclude`。
manifest 的 `target` 支持 `{path}` 和 `{path_no_ext}` 占位符，用于让 glob 展开的文件保留唯一 URI。

## MCP 接入

OpenViking v0.3.17 服务端内置 `/mcp` HTTP 端点，复用 REST API 的 API key，并暴露 `find`、`search`、`read`、`list`、`remember`、`add_resource`、`grep`、`glob`、`forget`、`health` 等工具。

注意：MCP `add_resource` 用于 HTTP/HTTPS 或 git URL。摄入本仓库本地文件时继续使用 `ov add-resource` CLI 或 `scripts/openviking-ingest.sh`。

客户端配置可从 `docs/openviking/mcp-client.example.json` 复制到对应 MCP 配置位置。Claude Code 示例：

```bash
claude mcp add --transport http openviking \
  http://localhost:1933/mcp \
  --header "Authorization: Bearer $OPENVIKING_API_KEY"
```

## 使用规则

- 探索型问题：先用 OpenViking `search` / `glob` 找候选目录，再读 L1 overview，确认相关后才读 L2 原文。
- 如果使用本地 hash embedding shim，MCP `find/search` 的默认 `min_score=0.35` 可能偏高；本地验收可以显式传 `min_score=0.1`，生产环境应换成真实 embedding 模型后再收紧阈值。
- 修改代码前：必须回到 GitNexus 做符号级 context / impact；OpenViking 不替代调用图和影响分析。
- 大源码目录：默认只摄入导航文档，不全量摄入源码镜像。需要专题研究时，临时把具体子目录加入 manifest。
- 新增核心笔记后：追加 manifest 或直接调用 `add_resource --wait` 做增量摄入，再用 benchmark 问题抽查召回质量。

## 验收

用 `docs/openviking/benchmark-questions.md` 中的 10 个问题做人工基准。通过标准是：能先定位到合理模块，再给出具体文件路径；普通前端/AI 知识问题不应优先命中大型源码镜像。

## 参考

- OpenViking context layers: https://volcengine-openviking.mintlify.app/concepts/context-layers
- OpenViking retrieval: https://volcengine-openviking.mintlify.app/concepts/retrieval
- OpenViking add_resource: https://volcengine-openviking.mintlify.app/api/resources/add-resource
- OpenViking MCP / Codex integration: https://docs.openviking.ai/en/agent-integrations/04-codex
