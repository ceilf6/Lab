# Wiki L1 Navigation For OpenViking

This file is the default L1-style navigation layer for large areas that should not be fully ingested on day one. It gives agents enough structure to decide where to search next without loading whole source mirrors.

## Root

- `README.md`: high-signal pointer graph. Many entries link to commits or files and encode why a topic matters.
- `docs/WORKSPACE_MAP.md`: broad map of this workspace as a personal technical lab, knowledge base, source-reading area, and sandbox collection.
- `docs/_README.md` and `docs/_README-CN.md`: Vite playground usage and module overview.
- `AGENTS.md`: repository rules. GitNexus is mandatory for code impact analysis; OpenViking is an exploration layer.

## AI

- `AI/learn-2&3/`: agent prompts, proxy-server experiments, session traces, and skill learning notes. This is safe to ingest selectively.
- `AI/1-LLM/`: LLM and machine learning basics. Prefer markdown notes and diagrams before code.
- `AI/2-AI-infra/ceilf6-skills-app/`: local skill implementations and skill architecture work.
- `AI/2-AI-infra/LLM-SDK/Langchain-source/`: upstream mirror. Do not ingest by default; target specific packages only.
- `AI/3-Application/FrontAgent-app/`: FrontAgent app/source. Use for RAG, memory, planner, MCP, and CLI architecture questions.
- `docs/openviking/frontagent-l1.md`: focused FrontAgent L1 navigation. Use this before reading FrontAgent source files.
- `AI/3-Application/Openclaw-source/`: OpenClaw source. Use for OpenClaw runtime, plugins, gateway, UI, and agent integration.
- `AI/3-Application/GitNexus-source/`: GitNexus source. Use for code graph, impact analysis, and index workflow questions.

## React

- `React/source-analyse/`: handwritten React source analysis notes.
- `React/mini-react-app/`: small implementation and experiments.
- `React/sandboxs/`: runnable React examples.
- `React/Ahooks-source/`: ahooks source mirror; ingest README first, then topic packages.
- `React/React-source/`: upstream React source. Do not ingest by default. For Fiber questions, start with `.flows/`, `.effect-pictures/`, and source-analysis notes before targeted source directories.

Important related assets:

- `.flows/react_beginWork_flow.drawio`
- `.flows/react_completeWork_flow.drawio`
- `.flows/react_scheduler_flow.drawio`
- `.flows/FiberNode_memoizedState_effect.drawio`
- `.effect-pictures/react-render.png`
- `.effect-pictures/MessageChannel.png`

## Vue

- `Vue2/pre/` and `Vue3/composition-API/`: small learning examples.
- `Vue2/sandboxs/` and `Vue3/sandboxs-vite/`: runnable sandbox projects.
- `Vue2/Vue2-source/` and `Vue3/Vue3-source/`: source mirrors. Ingest README and targeted packages only.
- `Vue3/reactivity-API/`: useful for reactivity-specific exploration.
- `Vue3/Pinia-source/`: Pinia source mirror; ingest README first.

## Browser And Runtime

- `Browser/Web-API/`: browser API notes.
- `Browser/cache/`, `Browser/render/`, `Browser/store/`: focused browser mechanism experiments.
- `Browser/Chromium-source/`: huge Chromium mirror. Do not ingest by default; select subdirectories only when the question explicitly needs Chromium source.
- `NodeJS/CMJ/`: CommonJS experiments.
- `NodeJS/Libuv-source/`: libuv source mirror; README can be useful, but full source ingestion should be topic-scoped.
- `NodeJS/Node-source/`: Node.js source mirror. Do not ingest by default.
- `JS/V8engine-source/`: V8 source mirror. Do not ingest by default.

## Frontend Knowledge Notes

- `CSS/**/core.md`: concept summaries for selectors, inheritance, computed style, layout, visual formatting, and related CSS basics.
- `HTML/**/core.md`: element-family notes for images, media, containers, text, lists, entities, and semantic structure.
- `JS/API/`, `JS/call-stack/`, `JS/function/`, `JS/property-descriptor/`, `JS/sync/`, `JS/algorithm/`: JavaScript language/runtime experiments and hand-written implementations.
- `Network/`: HTTP, SSL, XSS, CORS, cookies, AJAX, WebSocket, and Socket.io notes.
- `Pattern/Design-Pattern/`: design pattern examples split by behavioral, creational, structural, and OOP concepts.

## Sandbox And App Entrypoints

- `sandboxs-runner/`: Vite-based experiment runner. Useful when the task asks to run or add a visible demo.
- `engineering/webpack/`: webpack demo and build experiments.
- `monorepo/Reimplementing-Masterpieces/`: submodule-style learning area for reimplementing elegant engineering designs.
- `operating-system-app/`: markdown-to-site style experiment referenced from README.

## Retrieval Defaults

- Start at `README.md`, `docs/WORKSPACE_MAP.md`, and this file.
- Prefer `core.md`, `README.md`, `.flows`, and `.effect-pictures` before source mirrors.
- Treat giant source mirrors as opt-in. Add only the exact subdirectory needed for a concrete question.
- For code changes or symbol-level questions, leave OpenViking and use GitNexus.
