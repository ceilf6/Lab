# 智能体长期记忆快捷入口设计

日期：2026-05-20

## 背景

当前痛点是：用户想更新智能体长期记忆时，常常需要在对话里显式告诉智能体“把下面内容加入长期记忆”。这个路径不够直观，也不适合发生在飞书客户端、移动端等日常工作现场。

本项目从 0 到 1 创建一个独立仓库，目标是提供一个低摩擦、可编辑、可审核、可同步的长期记忆入口。第一版先建设记忆底座和通用接入协议，不直接依赖 OpenClaw 的内部存储，也不把飞书真实接入作为 MVP 必须完成项。

新仓库后续作为 git submodule 添加到：

```text
/Users/ceilf6/Desktop/myrepos/Wiki/AI/2-AI-infra
```

## 已确认决策

- MVP 方向：独立记忆服务/MCP + 多入口适配。
- 第一版存储：新仓库自带本地记忆库。
- 本地记忆库形态：Hybrid，Markdown 是长期真源，SQLite 是可重建索引。
- 用户入口：轻量 Web UI + CLI + MCP/API。
- 技术栈：TypeScript / Node.js。
- 首个真实入口方向：飞书客户端和移动端，但 MVP 只预留适配器边界，不强依赖飞书官方能力。

## 目标

第一版要让用户可以把一段内容快速放入长期记忆流程，经过编辑和确认后成为智能体可读取的长期记忆。

成功标准：

- 用户可以通过 CLI、MCP/API 或轻量 Web UI 创建记忆草稿。
- 草稿默认进入 inbox，不会直接成为长期记忆。
- 用户可以在 Web UI 中查看、编辑、确认、拒绝或归档记忆。
- 已确认记忆以 Markdown 文件保存，用户可以直接阅读和手动编辑。
- SQLite 索引用于搜索、列表、状态查询和去重提示，并且可以从 Markdown 重新构建。
- 智能体可以通过 MCP tools 捕获、查询、更新和确认记忆。

## 非目标

第一版暂不包含：

- 飞书 Bot、飞书快捷应用或飞书开放平台的真实接入。
- 自动从聊天记录中抽取长期记忆。
- embedding 或向量检索。
- 多用户权限系统。
- 云同步或远端托管。
- OpenClaw 内部长期记忆存储适配。

这些能力应通过 adapters 和 storage/provider 边界在后续版本中添加。

## 推荐方案

采用 Monorepo App Kit 形态。仓库内部使用 pnpm workspace，把核心记忆能力、MCP、CLI、Web UI 和未来入口适配器拆开。

```text
apps/web                 # 轻量记忆收件箱与编辑确认 UI
packages/core            # 记忆模型、Markdown 存储、SQLite 索引、状态流转
packages/mcp-server      # MCP tools: capture/update/search/list/approve
packages/cli             # 本地命令：新增、审核、重建索引、搜索
packages/adapters        # 预留飞书/OpenClaw/浏览器等入口适配器
docs                     # 架构、协议、使用说明
```

选择这个结构的原因：

- 项目从第一天就有 UI、CLI、MCP 和未来入口适配器，单服务结构后期容易耦合。
- `packages/core` 可以保持纯粹，所有入口都调用同一套记忆模型和状态流转。
- 后续接飞书、OpenClaw、浏览器插件或系统快捷指令时，可以在 adapters 中增量扩展。

## 核心数据流

```text
外部入口/用户操作
  -> capture memory draft
  -> 记忆收件箱 inbox
  -> 用户编辑/确认
  -> 写入 Markdown 真源
  -> 重建或增量更新 SQLite 索引
  -> MCP/API/CLI 对外提供查询和写入能力
```

记忆进入系统后先成为 `draft`，只有用户确认后才进入 `active`。这能避免临时上下文、误转发内容或噪声信息被直接写入长期记忆。

## 记忆状态

```text
draft      # 刚捕获，待编辑
active     # 已确认，可被智能体读取
archived   # 用户保留，但默认不召回
rejected   # 明确不要写入长期记忆
```

状态转换规则：

- `capture` 创建 `draft`。
- `approve` 将 `draft` 或 `archived` 转为 `active`。
- `reject` 将 `draft` 转为 `rejected`。
- `archive` 将 `active` 转为 `archived`。
- `update` 可以修改内容、标签、来源、状态和元数据，但必须经过 schema 校验。

## Markdown 真源

每条记忆保存为 Markdown 文件，frontmatter 承载结构化元数据，正文承载用户可读的记忆内容。

示例：

```md
---
id: mem_20260520_xxxxxx
status: active
scope: personal
source: manual
tags: [preference, work]
createdAt: 2026-05-20T10:00:00+08:00
updatedAt: 2026-05-20T10:05:00+08:00
---

我偏好在开始复杂任务前先看到简短方案，再进入实现。
```

建议目录结构：

```text
memory/
  inbox/                 # draft/rejected 草稿和决策记录
  active/                # 可被智能体读取的长期记忆
  archived/              # 默认不召回的历史记忆
  .index/memory.sqlite   # 可重建 SQLite 索引
```

Markdown 文件是唯一长期真源。SQLite 索引可以删除并通过 `memory index rebuild` 重新生成。

## SQLite 索引

SQLite 存储可查询索引，不作为唯一数据源。

第一版索引字段：

- `id`
- `status`
- `scope`
- `source`
- `tags`
- `content_hash`
- `possible_duplicate`
- `created_at`
- `updated_at`
- `path`
- `search_text`

索引用途：

- inbox 和 memories 列表。
- 状态过滤。
- 关键词搜索。
- 内容 hash 去重提示。
- 快速检测 Markdown 文件和索引是否不一致。

## 组件设计

### MemoryCore

负责：

- 记忆 schema。
- 状态流转。
- Markdown 读写。
- SQLite 索引。
- 内容 hash 和重复提示。
- 索引重建。

不负责：

- Web 路由。
- CLI 参数解析。
- MCP 协议细节。
- 飞书或 OpenClaw 适配。

### MemoryInbox

负责 draft、active、archived、rejected 的查询和操作模型。Web UI、CLI 和 MCP tools 都应通过它访问记忆。

### MCP Server

第一版暴露以下 tools：

- `capture_memory(content, source?, tags?)`
- `list_memories(status?)`
- `search_memories(query, status?)`
- `update_memory(id, content?, tags?, status?)`
- `approve_memory(id)`

MCP 返回结构要稳定，方便 OpenClaw 或其他智能体后续接入。

### CLI

第一版命令：

```text
memory capture "内容"
memory list --status draft
memory approve <id>
memory reject <id>
memory archive <id>
memory search "关键词"
memory index rebuild
```

CLI 既是用户工具，也是开发和验证工具。

### Web UI

第一版只做轻量管理界面：

- `/inbox`：draft 列表。
- `/memories`：active/archived 列表和搜索。
- `/memories/:id`：编辑、approve、reject、archive。

Web UI 不做复杂权限、协作或云同步。

## 错误处理

- Markdown 写入失败：不更新 SQLite，返回明确错误。
- SQLite 更新失败：保留 Markdown，并提示运行 `memory index rebuild`。
- 重复内容：默认允许创建 draft，但标记 `possibleDuplicate`。
- schema 不合法：拒绝写入，返回字段级错误。
- Markdown 和 SQLite 不一致：以 Markdown 为准，通过重建索引修复。

## 测试策略

第一版测试重点放在核心行为和入口冒烟验证：

- Core 单测：schema 校验、状态转换、Markdown roundtrip、索引重建。
- CLI 冒烟测试：capture/list/search/approve/reject/archive。
- MCP 工具测试：入参校验和返回结构。
- Web 测试：inbox 列表、编辑确认、拒绝和归档的基础流程。

飞书真实入口、浏览器插件和 OpenClaw 适配进入后，再补端到端测试。

## 后续演进

### 飞书入口

优先探索客户端和移动端可落地的方式：

- 转发消息给飞书 Bot，Bot 创建 draft 并返回确认入口。
- 飞书内打开轻量 Web 表单，粘贴或编辑记忆后提交。
- 如果飞书开放能力支持消息快捷操作，再接入消息级快捷入口。

不把“任意框选文字后出现自定义菜单”作为第一版假设，因为客户端和移动端能力受飞书开放平台限制。

### OpenClaw 适配

OpenClaw 可以先通过 MCP tools 查询和写入本地记忆库。后续如果 OpenClaw 有自己的长期记忆存储，再增加 adapter 做双写、迁移或同步。

### 检索增强

第一版只做关键词搜索和标签过滤。后续可以增加：

- embedding 索引。
- 语义召回。
- 按智能体、项目、空间或上下文 scope 过滤。
- 记忆合并与过期策略。

## 待确认问题

以下问题不阻塞 MVP 设计，但会影响实现计划：

- 新仓库名称。
- Markdown 文件按单条记忆保存，还是按主题文件聚合保存。
- Web UI 使用 Next.js、Vite + React，还是更轻量的服务端渲染。
- SQLite 访问库使用 `better-sqlite3` 还是异步驱动。
- MCP server 是否需要同时提供 HTTP API，还是只通过 stdio/SSE MCP 暴露。

## 实施顺序建议

1. 初始化 TypeScript/pnpm workspace 仓库。
2. 实现 `packages/core` 的 schema、Markdown store 和 SQLite index。
3. 实现 CLI，先保证本地 capture/list/search/approve 链路可用。
4. 实现 MCP server，复用 core 能力。
5. 实现轻量 Web UI，完成 inbox 编辑确认链路。
6. 增加 adapters 骨架和飞书入口设计文档。
7. 将新仓库作为 submodule 添加到 `AI/2-AI-infra`。
