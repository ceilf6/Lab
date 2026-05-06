---
name: cli
description: "Skill for the Cli area of Wiki. 574 symbols across 176 files."
---

# Cli

574 symbols | 176 files | Cohesion: 57%

## When to Use

- Working with code in `AI/`
- Understanding how removeExtraFields, buildConversationChain, loadTranscriptFromFile work
- Modifying cli-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `AI/3-Application/Openclaw-source/src/cli/config-cli.ts` | isIndexSegment, parsePath, hasOwnPathKey, formatDoctorHint, validatePathSegments (+22) |
| `AI/3-Application/Claude-Code-source/src/utils/sessionStorage.ts` | extractFirstPrompt, removeExtraFields, findLatestMessage, buildConversationChain, buildFileHistorySnapshotChain (+18) |
| `AI/3-Application/Claude-Code-source/src/cli/print.ts` | handleOrphanedPermissionResponse, emitLoadError, loadInitialMessages, drainCommandQueue, runHeadlessStreaming (+18) |
| `AI/3-Application/Openclaw-source/src/cli/completion-cli.ts` | resolveShellFromEnv, resolveCompletionCacheDir, resolveCompletionCachePath, completionCacheExists, writeCompletionCache (+15) |
| `AI/3-Application/Openclaw-source/src/cli/memory-cli.ts` | loadMemoryCommandConfig, emitMemorySecretResolveDiagnostics, formatSourceLabel, resolveAgent, resolveAgentIds (+13) |
| `AI/3-Application/Openclaw-source/src/cli/exec-approvals-cli.ts` | renderApprovalsSnapshot, heading, normalizeAllowlistEntry, registerExecApprovalsCli, resolveTargetNodeId (+13) |
| `AI/3-Application/Openclaw-source/src/cli/command-secret-gateway.ts` | enforcesResolvedSecrets, dedupeDiagnostics, targetsRuntimeWebPath, classifyRuntimeWebTargetPathState, describeInactiveRuntimeWebTargetPath (+11) |
| `AI/3-Application/Openclaw-source/src/cli/argv.ts` | getFlagValue, getPositiveIntFlagValue, consumeKnownOptionToken, getCommandPositionalsWithRootOptions, isRootHelpInvocation (+8) |
| `AI/3-Application/Claude-Code-source/src/cli/structuredIO.ts` | write, trackResolvedToolUseId, read, injectControlResponse, processLine (+8) |
| `AI/3-Application/Openclaw-source/src/cli/cron-cli.test.ts` | runCronCommand, expectCronCommandExit, runCronEditAndGetPatch, runCronAddAndGetParams, runCronSimpleAndGetUpdatePatch (+7) |

## Entry Points

Start here when exploring this area:

- **`removeExtraFields`** (Function) — `AI/3-Application/Claude-Code-source/src/utils/sessionStorage.ts:1813`
- **`buildConversationChain`** (Function) — `AI/3-Application/Claude-Code-source/src/utils/sessionStorage.ts:2068`
- **`loadTranscriptFromFile`** (Function) — `AI/3-Application/Claude-Code-source/src/utils/sessionStorage.ts:2293`
- **`isLiteLog`** (Function) — `AI/3-Application/Claude-Code-source/src/utils/sessionStorage.ts:2939`
- **`loadFullLog`** (Function) — `AI/3-Application/Claude-Code-source/src/utils/sessionStorage.ts:2948`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `StructuredIO` | Class | `AI/3-Application/Claude-Code-source/src/cli/structuredIO.ts` | 134 |
| `RemoteIO` | Class | `AI/3-Application/Claude-Code-source/src/cli/remoteIO.ts` | 34 |
| `removeExtraFields` | Function | `AI/3-Application/Claude-Code-source/src/utils/sessionStorage.ts` | 1813 |
| `buildConversationChain` | Function | `AI/3-Application/Claude-Code-source/src/utils/sessionStorage.ts` | 2068 |
| `loadTranscriptFromFile` | Function | `AI/3-Application/Claude-Code-source/src/utils/sessionStorage.ts` | 2293 |
| `isLiteLog` | Function | `AI/3-Application/Claude-Code-source/src/utils/sessionStorage.ts` | 2939 |
| `loadFullLog` | Function | `AI/3-Application/Claude-Code-source/src/utils/sessionStorage.ts` | 2948 |
| `loadTranscriptFile` | Function | `AI/3-Application/Claude-Code-source/src/utils/sessionStorage.ts` | 3471 |
| `getLastSessionLog` | Function | `AI/3-Application/Claude-Code-source/src/utils/sessionStorage.ts` | 3868 |
| `getAgentTranscript` | Function | `AI/3-Application/Claude-Code-source/src/utils/sessionStorage.ts` | 4189 |
| `findUnresolvedToolUse` | Function | `AI/3-Application/Claude-Code-source/src/utils/sessionStorage.ts` | 4477 |
| `loadAllLogsFromSessionFile` | Function | `AI/3-Application/Claude-Code-source/src/utils/sessionStorage.ts` | 4597 |
| `loadMessagesFromJsonlPath` | Function | `AI/3-Application/Claude-Code-source/src/utils/conversationRecovery.ts` | 415 |
| `loadConversationForResume` | Function | `AI/3-Application/Claude-Code-source/src/utils/conversationRecovery.ts` | 455 |
| `handleOrphanedPermissionResponse` | Function | `AI/3-Application/Claude-Code-source/src/cli/print.ts` | 5240 |
| `SessionPreview` | Function | `AI/3-Application/Claude-Code-source/src/components/SessionPreview.tsx` | 19 |
| `call` | Function | `AI/3-Application/Claude-Code-source/src/commands/resume/resume.tsx` | 193 |
| `shortenHomePath` | Function | `AI/3-Application/Openclaw-source/src/utils.ts` | 320 |
| `setPluginEnabledInConfig` | Function | `AI/3-Application/Openclaw-source/src/plugins/toggle-config.ts` | 3 |
| `buildPluginStatusReport` | Function | `AI/3-Application/Openclaw-source/src/plugins/status.ts` | 116 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `ProcessMessage → Trim` | cross_community | 9 |
| `LoadConfig → Cwd` | cross_community | 8 |
| `RunCli → Normalize` | cross_community | 7 |
| `RunCli → StripControlChars` | cross_community | 6 |
| `RunCli → Trim` | cross_community | 6 |
| `HandleSpeculationAccept → WriteOut` | cross_community | 6 |
| `OnSelect → ExecFileNoThrowWithCwd` | cross_community | 5 |
| `OnSelect → GetOriginalCwd` | cross_community | 5 |
| `RunCli → Cwd` | cross_community | 5 |
| `RunHeadless → GetPerformance` | cross_community | 4 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Scripts | 85 calls |
| Plugins | 71 calls |
| Commands | 40 calls |
| Infra | 34 calls |
| Secrets | 27 calls |
| Terminal | 24 calls |
| Hooks | 20 calls |
| Components | 18 calls |

## How to Explore

1. `gitnexus_context({name: "removeExtraFields"})` — see callers and callees
2. `gitnexus_query({query: "cli"})` — find related execution flows
3. Read key files listed above for implementation details
