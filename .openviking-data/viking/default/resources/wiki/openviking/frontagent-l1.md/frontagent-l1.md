# FrontAgent L1 Navigation

This file is a focused OpenViking navigation layer for FrontAgent. It exists so broad RAG, memory, MCP, planner, and context-management questions can land on stable entry points before an agent reads code.

## Product And Architecture Docs

- `AI/3-Application/FrontAgent-app/README.md`: main FrontAgent guide. It covers SDD, MCP mode, remote RAG, facts memory, cross-session memory, planner/executor flow, CLI usage, and package layout.
- `AI/3-Application/FrontAgent-app/docs/architecture.md`: architecture notes for the FrontAgent runtime, planner, executor, MCP clients, and safety boundaries.
- `AI/3-Application/FrontAgent-app/docs/README-CN.md`: Chinese documentation entry.
- `docs/luca-reply-analysis.md`: analysis of FrontAgent memory design language, especially facts memory and cross-session memory.

## RAG Implementation Entrypoints

- `AI/3-Application/FrontAgent-app/packages/mcp-memory/src/rag.ts`: remote repository RAG implementation. Start here for BM25 indexing, semantic embedding retrieval, metadata filters, reranking, cache layout, vector-store support, and `rag_query`.
- `AI/3-Application/FrontAgent-app/packages/runtime-node/src/mcp-clients.ts`: wires `MemoryMCPClient` to the `rag_query` tool.
- `AI/3-Application/FrontAgent-app/apps/cli/src/index.ts`: CLI flags for `--rag-*` runtime configuration.
- `AI/3-Application/FrontAgent-app/apps/cli/src/commands/rag.ts`: RAG cache import/export and maintenance commands.
- `AI/3-Application/FrontAgent-app/apps/cli/src/bootstrap.ts`: default `.frontagent/rag-cache` path resolution.
- `AI/3-Application/FrontAgent-app/packages/core/src/agent.ts`: calls RAG before planning and injects retrieved context into the task flow.

## Memory And Context Entrypoints

- `AI/3-Application/FrontAgent-app/packages/core/src/memory/`: cross-session memory storage, recall, and persistence.
- `AI/3-Application/FrontAgent-app/packages/core/src/context/`: runtime task context and collected files/RAG results.
- `AI/3-Application/FrontAgent-app/packages/core/src/skills/executor-skills.ts`: executor-time memory recall injection for file creation and patching.

## Retrieval Notes

- For "FrontAgent RAG implementation", prefer this file, then `packages/mcp-memory/src/rag.ts`, then `packages/runtime-node/src/mcp-clients.ts`, and only then `packages/core/src/agent.ts`.
- For "FrontAgent memory design", prefer `docs/luca-reply-analysis.md`, `packages/core/src/memory/`, and the memory sections in `README.md`.
- For "FrontAgent MCP exposed tools", prefer `README.md` MCP sections plus `packages/runtime-node/src/mcp-clients.ts`.
- Use GitNexus for symbol-level tracing before modifying FrontAgent code. OpenViking is only the navigation and retrieval layer.
