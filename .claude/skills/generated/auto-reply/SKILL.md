---
name: auto-reply
description: "Skill for the Auto-reply area of Wiki. 326 symbols across 153 files."
---

# Auto-reply

326 symbols | 153 files | Cohesion: 55%

## When to Use

- Working with code in `AI/`
- Understanding how isPathWithinBase, parseCommand, parseBooleanValue work
- Modifying auto-reply-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `AI/3-Application/Openclaw-source/src/auto-reply/commands-registry.ts` | buildSkillCommandDefinitions, listChatCommands, listChatCommandsForConfig, getTextAliasMap, normalizeCommandBody (+11) |
| `AI/3-Application/Openclaw-source/src/auto-reply/reply.triggers.trigger-handling.test-harness.ts` | getRunEmbeddedPiAgentMock, requireSessionStorePath, readSessionStore, runDirectElevatedToggleAndLoadStore, makeCfg (+6) |
| `AI/3-Application/Openclaw-source/src/auto-reply/fallback-state.ts` | truncateFallbackReasonPart, formatFallbackAttemptReason, formatFallbackAttemptSummary, buildFallbackReasonSummary, buildFallbackAttemptSummaries (+5) |
| `AI/3-Application/Openclaw-source/src/auto-reply/command-auth.ts` | resolveProviderFromContext, resolveFallbackAllowFrom, resolveCommandAuthorization, normalizeAllowFromEntry, shouldUseFromAsSenderFallback (+5) |
| `AI/3-Application/Openclaw-source/src/auto-reply/status.ts` | formatCommandEntry, buildCommandItems, buildCommandsMessage, buildCommandsMessagePaginated, formatTokens (+4) |
| `AI/3-Application/Openclaw-source/src/auto-reply/thinking.shared.ts` | normalizeProviderId, isBinaryThinkingProvider, supportsBuiltInXHighThinking, listThinkingLevelLabels, resolveThinkingDefaultForModel (+4) |
| `AI/3-Application/Openclaw-source/src/auto-reply/reply.directive.directive-behavior.e2e-harness.ts` | replyText, makeWhatsAppDirectiveConfig, replyTexts, sessionStorePath, makeElevatedDirectiveConfig (+2) |
| `AI/3-Application/Openclaw-source/src/auto-reply/skill-commands.ts` | dedupeBySkillName, listSkillCommandsForAgents, findSkillCommand, resolveSkillCommandInvocation, listReservedChatSlashCommandNames (+1) |
| `AI/3-Application/Openclaw-source/src/auto-reply/commands-registry.data.ts` | getChatCommands, defineChatCommand, defineDockCommand, registerAlias, assertCommandRegistry (+1) |
| `AI/3-Application/Openclaw-source/src/auto-reply/chunk.ts` | chunkByNewline, chunkText, resolveChunkEarlyReturn, chunkMarkdownText, pickSafeBreakIndex (+1) |

## Entry Points

Start here when exploring this area:

- **`isPathWithinBase`** (Function) — `AI/3-Application/Openclaw-source/test/helpers/paths.ts:2`
- **`parseCommand`** (Function) — `AI/3-Application/Openclaw-source/src/tui/commands.ts:39`
- **`parseBooleanValue`** (Function) — `AI/3-Application/Openclaw-source/src/utils/boolean.ts:10`
- **`resolveThreadParentSessionKey`** (Function) — `AI/3-Application/Openclaw-source/src/sessions/session-key-utils.ts:111`
- **`isMattermostMutableAllowEntry`** (Function) — `AI/3-Application/Openclaw-source/src/security/mutable-allowlist-detectors.ts:68`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `isPathWithinBase` | Function | `AI/3-Application/Openclaw-source/test/helpers/paths.ts` | 2 |
| `parseCommand` | Function | `AI/3-Application/Openclaw-source/src/tui/commands.ts` | 39 |
| `parseBooleanValue` | Function | `AI/3-Application/Openclaw-source/src/utils/boolean.ts` | 10 |
| `resolveThreadParentSessionKey` | Function | `AI/3-Application/Openclaw-source/src/sessions/session-key-utils.ts` | 111 |
| `isMattermostMutableAllowEntry` | Function | `AI/3-Application/Openclaw-source/src/security/mutable-allowlist-detectors.ts` | 68 |
| `formatAllowFromLowercase` | Function | `AI/3-Application/Openclaw-source/src/plugin-sdk/allow-from.ts` | 30 |
| `isNormalizedSenderAllowed` | Function | `AI/3-Application/Openclaw-source/src/plugin-sdk/allow-from.ts` | 54 |
| `getFileExtension` | Function | `AI/3-Application/Openclaw-source/src/media/mime.ts` | 79 |
| `isGifMedia` | Function | `AI/3-Application/Openclaw-source/src/media/mime.ts` | 159 |
| `parseLogLine` | Function | `AI/3-Application/Openclaw-source/src/logging/parse-log-line.ts` | 40 |
| `parseCaseFilter` | Function | `AI/3-Application/Openclaw-source/src/image-generation/live-test-helpers.ts` | 8 |
| `parseProviderModelMap` | Function | `AI/3-Application/Openclaw-source/src/image-generation/live-test-helpers.ts` | 43 |
| `resolveConfiguredLiveImageModels` | Function | `AI/3-Application/Openclaw-source/src/image-generation/live-test-helpers.ts` | 59 |
| `add` | Function | `AI/3-Application/Openclaw-source/src/image-generation/live-test-helpers.ts` | 62 |
| `isWindowsPlatform` | Function | `AI/3-Application/Openclaw-source/src/infra/exec-approvals-analysis.ts` | 420 |
| `isSafeBinUsage` | Function | `AI/3-Application/Openclaw-source/src/infra/exec-approvals-allowlist.ts` | 50 |
| `listSkillCommandsForAgents` | Function | `AI/3-Application/Openclaw-source/src/auto-reply/skill-commands.ts` | 64 |
| `resolveSkillCommandInvocation` | Function | `AI/3-Application/Openclaw-source/src/auto-reply/skill-commands.ts` | 165 |
| `parseConfiguredAcpSessionKey` | Function | `AI/3-Application/Openclaw-source/src/acp/persistent-bindings.types.ts` | 108 |
| `matchesExactOrPrefix` | Function | `AI/3-Application/Openclaw-source/extensions/openai/shared.ts` | 5 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `ProcessMessage → ToLowerCase` | cross_community | 8 |
| `HandleSpeculationAccept → ToLowerCase` | cross_community | 8 |
| `CompactEmbeddedPiSessionDirect → ToLowerCase` | cross_community | 6 |
| `RegisterTelegramHandlers → Trim` | cross_community | 6 |
| `RegisterTelegramHandlers → ToLowerCase` | cross_community | 6 |
| `RegisterTelegramHandlers → GetActivePluginRegistry` | cross_community | 6 |
| `UseRemoteSession → ToLowerCase` | cross_community | 6 |
| `MonitorDiscordProvider → ToLowerCase` | cross_community | 6 |
| `StartGatewayServer → ToLowerCase` | cross_community | 5 |
| `AttachGatewayWsMessageHandler → ToLowerCase` | cross_community | 5 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Scripts | 107 calls |
| Monitor | 18 calls |
| Agents | 17 calls |
| Plugins | 13 calls |
| Reply | 13 calls |
| Infra | 12 calls |
| Ink | 9 calls |
| Commands | 6 calls |

## How to Explore

1. `gitnexus_context({name: "isPathWithinBase"})` — see callers and callees
2. `gitnexus_query({query: "auto-reply"})` — find related execution flows
3. Read key files listed above for implementation details
