<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **Lab** (286820 symbols, 800402 relationships, 300 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> If any GitNexus tool warns the index is stale, run `npx gitnexus analyze` in terminal first.

## Always Do

- For exploratory knowledge-base questions, prefer OpenViking first when it is available. Start from L0/L1 summaries and navigation resources, then read L2/source files only after the target area is clear. See `docs/openviking/README.md`.
- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `gitnexus_impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `gitnexus_detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `gitnexus_query({query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `gitnexus_context({name: "symbolName"})`.

## Never Do

- NEVER use OpenViking as a substitute for GitNexus impact analysis, symbol context, or commit-scope change detection.
- NEVER ingest giant upstream mirrors into OpenViking by default. Keep `Browser/Chromium-source`, `NodeJS/Node-source`, `JS/V8engine-source`, and `AI/2-AI-infra/LLM-SDK/Langchain-source` opt-in by topic.
- NEVER edit a function, class, or method without first running `gitnexus_impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `gitnexus_rename` which understands the call graph.
- NEVER commit changes without running `gitnexus_detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/Lab/context` | Codebase overview, check index freshness |
| `gitnexus://repo/Lab/clusters` | All functional areas |
| `gitnexus://repo/Lab/processes` | All execution flows |
| `gitnexus://repo/Lab/process/{name}` | Step-by-step execution trace |

## OpenViking

| Resource | Use for |
|----------|---------|
| `docs/openviking/README.md` | Local setup, ingestion workflow, MCP connection, and usage rules |
| `docs/openviking/ingest-manifest.tsv` | Default low-noise ingestion allowlist/exclude list |
| `docs/openviking/navigation-l1.md` | Human-authored L1 navigation layer for large source/research areas |
| `docs/openviking/frontagent-l1.md` | Focused FrontAgent RAG, memory, MCP, planner, and context navigation |
| `docs/openviking/benchmark-questions.md` | Manual retrieval quality checks |

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->
