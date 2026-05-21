# CGC Report

_Generated: 2026-05-21 02:09 UTC_


## Most Complex Functions
_Cyclomatic complexity > 10 is a refactoring candidate._

| Function | File | Cyclomatic Complexity |
| --- | --- | --- |
| PromptInput | components/prompt-input.tsx | 503 |
| Layout | pages/layout.tsx | 502 |
| Page | pages/session.tsx | 469 |
| monitorTlonProvider | monitor/index.ts | 300 |
| Prompt | prompt/index.tsx | 219 |
| Session | session/index.tsx | 194 |
| handleFeishuMessage | src/bot.ts | 184 |
| Autocomplete | prompt/autocomplete.tsx | 183 |
| SessionTurn | components/session-turn.tsx | 173 |
| preflightDiscordMessage | monitor/message-handler.preflight.ts | 169 |
| handler | cmd/github.ts | 164 |
| processDiscordMessage | monitor/message-handler.process.ts | 149 |
| Diff | components/diff.tsx | 147 |
| dispatchReplyFromConfig | reply/dispatch-from-config.ts | 134 |
| createThreadBindingManager | monitor/thread-bindings.manager.ts | 123 |


## Potential Dead Code
_Functions with zero callers (not guaranteed dead — may be entry points or called via reflection)._

| Function | File |
| --- | --- |
| execute | tool/github-pr-search.ts |
| githubFetch | tool/github-pr-search.ts |
| execute | tool/github-triage.ts |
| getIssueNumber | tool/github-triage.ts |
| githubFetch | tool/github-triage.ts |
| assertContextEvent | github/index.ts |
| assertOpencodeConnected | github/index.ts |
| assertPayloadKeyword | github/index.ts |
| assertPermissions | github/index.ts |
| branchIsDirty | github/index.ts |
| buildPromptDataForIssue | github/index.ts |
| buildPromptDataForPR | github/index.ts |
| chat | github/index.ts |
| checkoutForkBranch | github/index.ts |
| checkoutLocalBranch | github/index.ts |
| checkoutNewBranch | github/index.ts |
| configureGit | github/index.ts |
| createComment | github/index.ts |
| createOpencode | github/index.ts |
| createPR | github/index.ts |


## Suggested Cypher Queries
_Copy these into `execute_cypher_query` to explore further._

### Callers of a specific function
```cypher
MATCH (caller)-[:CALLS]->(fn:Function {name: 'yourFunctionName'})
RETURN caller.name, caller.path LIMIT 20
```

### Class hierarchy for a specific class
```cypher
MATCH path = (c:Class {name: 'YourClass'})-[:INHERITS*]->(parent)
RETURN [n IN nodes(path) | n.name] AS hierarchy
```

### Most-injected Spring beans
```cypher
MATCH ()-[:INJECTS]->(bean:Class)
RETURN bean.name, count(*) AS injection_count
ORDER BY injection_count DESC LIMIT 10
```

### All external library dependencies
```cypher
MATCH (m:MavenModule)-[:USES_LIBRARY]->(lib:ExternalLibrary)
RETURN m.artifact_id, lib.group_id, lib.artifact_id, lib.version
ORDER BY lib.artifact_id
```

### CALLS edges with low confidence (potential mis-resolutions)
```cypher
MATCH (a)-[c:CALLS]->(b)
WHERE c.confidence_label = 'AMBIGUOUS'
RETURN a.name, b.name, c.resolution_tier, a.path LIMIT 20
```
