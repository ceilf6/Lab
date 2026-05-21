<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **Lab** (286820 symbols, 800402 relationships, 300 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> If any GitNexus tool warns the index is stale, run `npx gitnexus analyze` in terminal first.

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `gitnexus_impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `gitnexus_detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `gitnexus_query({query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `gitnexus_context({name: "symbolName"})`.

## Never Do

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
# CodeGraphContext — Code Quality & Visualization

CGC runs as a parallel MCP server (KuzuDB backend) providing dead code detection, cyclomatic complexity analysis, live file watching, and interactive graph visualization.

## Always Do

- Use CGC for dead code detection and complexity analysis — GitNexus does not provide these.
- When caller/callee results from GitNexus seem incomplete, cross-validate with CGC.
- Use `--viz` flag to generate interactive HTML graphs for architecture reviews.

## Never Do

- NEVER use CGC as a substitute for GitNexus impact analysis, execution flow tracing, or safe renames.
- NEVER skip GitNexus `detect_changes()` before committing just because CGC watch is running.

## CLI

| Task | Read this skill file |
|------|---------------------|
| Dead code, complexity, visualization, cross-validation | `.claude/skills/cgc/cgc-usage/SKILL.md` |
<!-- cgc:end -->

<!-- deepwiki:start -->
# DeepWiki — External Repo Documentation & Q&A

DeepWiki is a hosted MCP service that generates documentation and answers questions about any public repository. It requires no local setup.

## Always Do

- Use DeepWiki when researching external open-source projects you haven't cloned locally.
- Use `ask_question` for high-level "how does this work" questions about external repos.

## Never Do

- NEVER use DeepWiki for questions about the local Lab repository — use OpenViking + GitNexus.
- NEVER treat DeepWiki answers as authoritative for implementation — verify with source code.

## CLI

| Task | Read this skill file |
|------|---------------------|
| Query external repos, research libraries | `.claude/skills/deepwiki/deepwiki-usage/SKILL.md` |
<!-- deepwiki:end -->
