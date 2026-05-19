# OpenViking Benchmark Questions

Use these questions after ingesting `docs/openviking/ingest-manifest.tsv`. The point is not to get perfect prose; the point is to see whether retrieval narrows from L0/L1 context to useful files without being distracted by giant source mirrors.

| # | Question | Expected high-signal locations |
|---|----------|--------------------------------|
| 1 | React beginWork 流程图在哪里？ | `.flows/react_beginWork_flow.drawio`, `React/source-analyse/`, `.effect-pictures/react-render.png` |
| 2 | CSS BFC 或视觉格式化模型的核心笔记在哪里？ | `CSS/**/core.md`, `CSS/BFC/`, `CSS/视觉格式化模型/` |
| 3 | FrontAgent RAG 或上下文管理实现应该从哪里看？ | `AI/3-Application/FrontAgent-app/`, `docs/WORKSPACE_MAP.md`, `README.md` RAG entries |
| 4 | OpenClaw / agent skill 相关资料在哪里？ | `AI/learn-2&3/skill/`, `AI/3-Application/Openclaw-source/`, `README.md` skill entries |
| 5 | 浏览器存储机制有哪些实验入口？ | `Browser/store/`, `Browser/Web-API/README.md`, `docs/WORKSPACE_MAP.md` |
| 6 | Vue2 和 Vue3 响应式对比应从哪里开始？ | `Vue2/pre/`, `Vue3/reactivity-API/`, `.effect-pictures/vue3-*.png` |
| 7 | Node/CommonJS 加载行为笔记在哪里？ | `NodeJS/CMJ/`, `README.md` NodeJS entries |
| 8 | 网络安全和跨域相关笔记在哪里？ | `Network/SSL.md`, `Network/XSS.md`, `Network/CORS.html`, `Network/cookie/` |
| 9 | sandbox 运行入口和新增实验方法是什么？ | `sandboxs-runner/`, `docs/_README.md`, `docs/_README-CN.md` |
| 10 | GitNexus 和 OpenViking 在本仓库中分别应该负责什么？ | `AGENTS.md`, `docs/openviking/README.md`, `docs/openviking/navigation-l1.md` |

## Manual Pass Criteria

- For each question, `find` or MCP `search` should return at least one expected high-signal location in the top results.
- For general frontend questions, results should not be dominated by `Browser/Chromium-source`, `NodeJS/Node-source`, `JS/V8engine-source`, or LangChain source paths.
- For architecture questions, the first step should be a navigation or overview file before raw source.
- If a query returns only raw upstream source, add or improve an L1 navigation note instead of ingesting more source.
