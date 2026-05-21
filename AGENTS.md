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

<!-- cgc:start -->
## CodeGraphContext — Code Quality & Visualization

CGC complements GitNexus with capabilities it lacks: dead code detection, cyclomatic complexity analysis, live file watching with auto-reindex, and interactive graph visualization.

### Routing Rules

| Scenario | Tool | Notes |
|----------|------|-------|
| Impact analysis / blast radius | GitNexus | CGC has no equivalent |
| Execution flow tracing / processes | GitNexus | CGC has no equivalent |
| Safe rename / refactor | GitNexus | CGC has no equivalent |
| Pre-commit change detection | GitNexus | `detect_changes()` |
| Dead code detection | CGC | GitNexus has no equivalent |
| Cyclomatic complexity analysis | CGC | GitNexus has no equivalent |
| Interactive graph visualization | CGC | GitNexus has no equivalent |
| Caller/callee queries | Both | Default GitNexus; add CGC for cross-validation |

### Always Do

- Use CGC for dead code detection: `codegraphcontext analyze dead-code`
- Use CGC for complexity analysis: `codegraphcontext analyze complexity --threshold 10`
- When cross-validating caller/callee results, query both GitNexus and CGC and compare

### Never Do

- NEVER use CGC for impact analysis or execution flow tracing — use GitNexus
- NEVER use CGC for safe renames — use `gitnexus_rename`
- NEVER skip GitNexus impact analysis just because CGC shows no callers (CGC may have a stale index)

### CLI

| Task | Command |
|------|---------|
| Dead code detection | `codegraphcontext analyze dead-code` |
| Complexity analysis | `codegraphcontext analyze complexity --threshold 10` |
| Visualize call graph | `codegraphcontext analyze calls <function> --viz` |
| Visualize class tree | `codegraphcontext analyze tree <class> --viz` |
| Re-index | `codegraphcontext index .` |
| Start live watcher | `codegraphcontext watch .` |
| Start MCP server | `codegraphcontext mcp start` |

| Task | Read this skill file |
|------|---------------------|
| Dead code, complexity, visualization | `.claude/skills/cgc/cgc-usage/SKILL.md` |
<!-- cgc:end -->

<!-- deepwiki:start -->
## DeepWiki — External Repo Documentation & Q&A

DeepWiki provides instant AI-generated documentation and conversational Q&A for any public GitHub/GitLab/Bitbucket repository. No local clone or indexing required.

### Scope

- **ONLY for external/unfamiliar public repositories** — never for local Lab content
- Use when researching a new library, framework, or open-source project
- Use to get high-level architectural understanding before cloning and using GitNexus for deep analysis

### MCP Tools

| Tool | Usage |
|------|-------|
| `read_wiki_structure` | Get documentation topic tree for a repo |
| `read_wiki_contents` | Get specific documentation content |
| `ask_question` | Natural language Q&A grounded in the repo's code |

### Always Do

- Use DeepWiki as the first step when exploring an unfamiliar external project
- After getting high-level understanding from DeepWiki, clone the repo and use GitNexus for symbol-level analysis if needed

### Never Do

- NEVER use DeepWiki for questions about the local Lab repository — use OpenViking + GitNexus
- NEVER use DeepWiki as a substitute for GitNexus impact analysis or code modification workflows
- NEVER rely solely on DeepWiki for implementation details — it provides high-level documentation, not precise symbol relationships

### Workflow: Researching a New Library

```
1. mcp__deepwiki__read_wiki_structure({repo: "owner/repo"})  → Get topic overview
2. mcp__deepwiki__ask_question({repo: "owner/repo", question: "How does X work?"})  → High-level answer
3. If deeper analysis needed: clone repo → gitnexus index → gitnexus_query/context
```

| Task | Read this skill file |
|------|---------------------|
| Query external repos, research libraries | `.claude/skills/deepwiki/deepwiki-usage/SKILL.md` |
<!-- deepwiki:end -->
