---
name: cgc-usage
description: "Use for dead code detection, cyclomatic complexity analysis, code graph visualization, or cross-validating GitNexus caller/callee results. Examples: 'find dead code', 'which functions are too complex', 'visualize the call graph', 'cross-check callers'"
---

# CodeGraphContext — Usage Guide

## When to Use

- "Find unused functions / dead code"
- "Which functions are too complex?"
- "Show me the call graph for X"
- "Visualize class hierarchy"
- "Cross-validate GitNexus callers with another source"

## Workflow

### Dead Code Detection

```bash
codegraphcontext analyze dead-code
```

Returns functions, classes, and methods with zero incoming references. Review results carefully — entry points (main, handlers, exports) will appear as "dead" since nothing calls them internally.

### Complexity Analysis

```bash
codegraphcontext analyze complexity --threshold 10
```

Returns functions with cyclomatic complexity above the threshold. Higher values indicate more branching paths and harder-to-test code.

### Visualization

```bash
# Visualize call graph for a specific function
codegraphcontext analyze calls myFunction --viz

# Visualize class inheritance tree
codegraphcontext analyze tree MyClass --viz

# Find and visualize symbols matching a pattern
codegraphcontext find pattern "Auth" --viz
```

Opens an interactive HTML graph in the browser.

### Cross-Validation with GitNexus

When you want to verify GitNexus caller/callee results:

```
1. gitnexus_context({name: "targetSymbol"})     → GitNexus callers/callees
2. codegraphcontext analyze calls targetSymbol   → CGC callers/callees
3. Compare results — differences may indicate:
   - Stale index on one side (re-index)
   - Dynamic/indirect calls one tool catches but not the other
   - Different analysis depth or confidence thresholds
```

## Index Management

```bash
# Full re-index
codegraphcontext index .

# Start live file watcher (auto-reindex on changes)
codegraphcontext watch .

# MCP server (for AI assistant integration)
codegraphcontext mcp start
```

## Checklist

```
- [ ] Identify the task: dead code / complexity / visualization / cross-validation
- [ ] Run the appropriate CGC command
- [ ] For dead code: filter out known entry points before reporting
- [ ] For complexity: suggest refactoring for functions above threshold
- [ ] For visualization: open HTML in browser, confirm it renders
- [ ] For cross-validation: compare with GitNexus results, explain differences
```
