---
name: hooks
description: "Skill for the Hooks area of Wiki. 371 symbols across 150 files."
---

# Hooks

371 symbols | 150 files | Cohesion: 55%

## When to Use

- Working with code in `AI/`
- Understanding how mergeHookPresets, normalizeHooksPath, normalizeServePath work
- Modifying hooks-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `AI/3-Application/Openclaw-source/src/hooks/gmail-setup-utils.ts` | ensureGcloudOnPath, resolvePythonExecutablePath, gcloudEnv, runGcloudCommand, ensureDependency (+10) |
| `AI/3-Application/Openclaw-source/src/hooks/message-hook-mappers.ts` | buildCanonicalSentMessageHookContext, toPluginMessageContext, toPluginMessageSentEvent, toInternalMessageSentContext, deriveInboundMessageHookContext (+8) |
| `AI/3-Application/Openclaw-source/src/hooks/internal-hooks.ts` | isHookEventTypeAndAction, getHookContext, hasStringContextField, isAgentBootstrapEvent, isGatewayStartupEvent (+7) |
| `AI/3-Application/Openclaw-source/src/hooks/workspace.ts` | readHookPackageManifest, resolvePackageHooks, loadHooksFromDir, loadHookEntriesFromDir, loadHookFromDir (+6) |
| `AI/3-Application/Claude-Code-source/src/hooks/fileSuggestions.ts` | findLongestCommonPrefix, getFileIndex, getGitIndexMtime, getClaudeConfigFiles, getPathsForSuggestions (+5) |
| `AI/3-Application/Openclaw-source/src/hooks/install.ts` | buildHookInstallForwardParams, installFromResolvedHookDir, installHooksFromArchive, installHooksFromPath, validateHookId (+5) |
| `AI/3-Application/Openclaw-source/src/hooks/gmail.ts` | mergeHookPresets, normalizeHooksPath, normalizeServePath, buildDefaultHookUrl, resolveGmailHookRuntimeConfig (+4) |
| `AI/3-Application/Claude-Code-source/src/utils/hooks/fileChangedWatcher.ts` | startWatching, handleFileEvent, updateWatchPaths, restartWatching, onCwdChangedForHooks (+4) |
| `AI/3-Application/Claude-Code-source/src/utils/sessionStorage.ts` | saveWorktreeState, isChainParticipant, getUserType, insertMessageChain, recordTranscript (+3) |
| `AI/3-Application/Claude-Code-source/src/hooks/useVoice.ts` | normalizeLanguageForSTT, useVoice, updateState, finishRecording, armFocusSilenceTimer (+3) |

## Entry Points

Start here when exploring this area:

- **`mergeHookPresets`** (Function) — `AI/3-Application/Openclaw-source/src/hooks/gmail.ts:64`
- **`normalizeHooksPath`** (Function) — `AI/3-Application/Openclaw-source/src/hooks/gmail.ts:70`
- **`normalizeServePath`** (Function) — `AI/3-Application/Openclaw-source/src/hooks/gmail.ts:79`
- **`buildDefaultHookUrl`** (Function) — `AI/3-Application/Openclaw-source/src/hooks/gmail.ts:90`
- **`resolveGmailHookRuntimeConfig`** (Function) — `AI/3-Application/Openclaw-source/src/hooks/gmail.ts:99`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `WindowsToWSLConverter` | Class | `AI/3-Application/Claude-Code-source/src/utils/idePathConversion.ts` | 24 |
| `TerminalEvent` | Class | `AI/3-Application/Claude-Code-source/src/ink/events/terminal-event.ts` | 18 |
| `KeyboardEvent` | Class | `AI/3-Application/Claude-Code-source/src/ink/events/keyboard-event.ts` | 11 |
| `mergeHookPresets` | Function | `AI/3-Application/Openclaw-source/src/hooks/gmail.ts` | 64 |
| `normalizeHooksPath` | Function | `AI/3-Application/Openclaw-source/src/hooks/gmail.ts` | 70 |
| `normalizeServePath` | Function | `AI/3-Application/Openclaw-source/src/hooks/gmail.ts` | 79 |
| `buildDefaultHookUrl` | Function | `AI/3-Application/Openclaw-source/src/hooks/gmail.ts` | 90 |
| `resolveGmailHookRuntimeConfig` | Function | `AI/3-Application/Openclaw-source/src/hooks/gmail.ts` | 99 |
| `buildGogWatchStartArgs` | Function | `AI/3-Application/Openclaw-source/src/hooks/gmail.ts` | 207 |
| `buildTopicPath` | Function | `AI/3-Application/Openclaw-source/src/hooks/gmail.ts` | 252 |
| `parseTopicPath` | Function | `AI/3-Application/Openclaw-source/src/hooks/gmail.ts` | 256 |
| `startGmailWatcher` | Function | `AI/3-Application/Openclaw-source/src/hooks/gmail-watcher.ts` | 131 |
| `startGmailWatcherWithLogs` | Function | `AI/3-Application/Openclaw-source/src/hooks/gmail-watcher-lifecycle.ts` | 10 |
| `resolvePythonExecutablePath` | Function | `AI/3-Application/Openclaw-source/src/hooks/gmail-setup-utils.ts` | 117 |
| `ensureDependency` | Function | `AI/3-Application/Openclaw-source/src/hooks/gmail-setup-utils.ts` | 167 |
| `ensureGcloudAuth` | Function | `AI/3-Application/Openclaw-source/src/hooks/gmail-setup-utils.ts` | 193 |
| `runGcloud` | Function | `AI/3-Application/Openclaw-source/src/hooks/gmail-setup-utils.ts` | 207 |
| `ensureTopic` | Function | `AI/3-Application/Openclaw-source/src/hooks/gmail-setup-utils.ts` | 215 |
| `ensureSubscription` | Function | `AI/3-Application/Openclaw-source/src/hooks/gmail-setup-utils.ts` | 226 |
| `ensureTailscaleEndpoint` | Function | `AI/3-Application/Openclaw-source/src/hooks/gmail-setup-utils.ts` | 263 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `Setup → JsonStringify` | cross_community | 6 |
| `Setup → GetFsImplementation` | cross_community | 6 |
| `Setup → StatSync` | cross_community | 6 |
| `PartialCompactConversation → GetIsNonInteractiveSession` | cross_community | 5 |
| `PromptInput → CallSafe` | cross_community | 4 |
| `Setup → ToLowerCase` | cross_community | 4 |
| `Setup → Trim` | cross_community | 4 |
| `LogSelector → UseApp` | cross_community | 4 |
| `LogSelector → UseDoublePress` | cross_community | 4 |
| `UseTypeahead → UseAppStore` | cross_community | 4 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Plugins | 75 calls |
| Scripts | 40 calls |
| Components | 33 calls |
| Services | 14 calls |
| Constants | 10 calls |
| Infra | 10 calls |
| Auto-reply | 8 calls |
| Oauth | 8 calls |

## How to Explore

1. `gitnexus_context({name: "mergeHookPresets"})` — see callers and callees
2. `gitnexus_query({query: "hooks"})` — find related execution flows
3. Read key files listed above for implementation details
