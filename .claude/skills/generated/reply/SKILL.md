---
name: reply
description: "Skill for the Reply area of Wiki. 578 symbols across 217 files."
---

# Reply

578 symbols | 217 files | Cohesion: 51%

## When to Use

- Working with code in `AI/`
- Understanding how resolveSessionKeyFromResolveParams, loadCombinedSessionStoreForGateway, assertModelSelection work
- Modifying reply-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `AI/3-Application/Openclaw-source/src/auto-reply/reply/commands-acp.test.ts` | runTelegramAcpCommand, runTelegramDmAcpCommand, runFeishuDmAcpCommand, runInternalAcpCommand, createSessionBinding (+12) |
| `AI/3-Application/Openclaw-source/src/auto-reply/reply/acp-projector.ts` | createAcpReplyProjector, createTurnBlockReplyPipeline, clearLiveIdleTimer, drainChunker, flushLiveBuffer (+11) |
| `AI/3-Application/Openclaw-source/src/auto-reply/reply/abort.ts` | setAbortMemory, formatAbortReplyText, resolveSessionEntryForKey, resolveAbortTargetKey, stopSubagentsForRequester (+5) |
| `AI/3-Application/Openclaw-source/src/auto-reply/reply/reply-payloads.ts` | filterMessagingToolMediaDuplicates, normalizeMediaForDedupe, shouldSuppressReasoningPayload, resolveReplyThreadingForPayload, applyReplyThreading (+5) |
| `AI/3-Application/Openclaw-source/src/auto-reply/reply/block-reply-pipeline.ts` | createBlockReplyPayloadKey, bufferPayload, flushBuffered, enqueue, flush (+5) |
| `AI/3-Application/Openclaw-source/src/auto-reply/reply/acp-projector.test.ts` | createProjectorHarness, createFinalOnlyStatusToolHarness, createLiveToolLifecycleHarness, createLiveStatusAndToolLifecycleHarness, blockDeliveries (+4) |
| `AI/3-Application/Openclaw-source/src/auto-reply/reply/commands-models.ts` | parseModelsArgs, resolveProviderLabel, formatModelsAvailableHeader, resolveModelsCommandReply, handleModelsCommand (+3) |
| `AI/3-Application/Openclaw-source/src/auto-reply/reply/commands-session.ts` | resolveSessionBindingDurationMs, resolveSessionBindingBoundBy, resolveUpdatedBindingExpiry, handleSessionCommand, resolveSessionBindingLastActivityAt (+3) |
| `AI/3-Application/Openclaw-source/extensions/telegram/src/bot-message-dispatch.ts` | pruneStickerMediaFromContext, resolveTelegramReasoningLevel, dispatchTelegramMessage, enqueueDraftLaneEvent, resetDraftLaneState (+3) |
| `AI/3-Application/Openclaw-source/src/auto-reply/reply/typing-mode.ts` | isRenderableText, signalMessageStart, signalTextDelta, signalReasoningDelta, signalToolStart (+3) |

## Entry Points

Start here when exploring this area:

- **`resolveSessionKeyFromResolveParams`** (Function) — `AI/3-Application/Openclaw-source/src/gateway/sessions-resolve.ts:18`
- **`loadCombinedSessionStoreForGateway`** (Function) — `AI/3-Application/Openclaw-source/src/gateway/session-utils.ts:847`
- **`assertModelSelection`** (Function) — `AI/3-Application/Openclaw-source/src/auto-reply/reply.directive.directive-behavior.e2e-harness.ts:117`
- **`loadSessionStore`** (Function) — `AI/3-Application/Openclaw-source/src/config/sessions/store.ts:194`
- **`updateSessionStore`** (Function) — `AI/3-Application/Openclaw-source/src/config/sessions/store.ts:584`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `EmbeddedBlockChunker` | Class | `AI/3-Application/Openclaw-source/src/agents/pi-embedded-block-chunker.ts` | 97 |
| `CommandLaneClearedError` | Class | `AI/3-Application/Openclaw-source/src/process/command-queue.ts` | 8 |
| `resolveSessionKeyFromResolveParams` | Function | `AI/3-Application/Openclaw-source/src/gateway/sessions-resolve.ts` | 18 |
| `loadCombinedSessionStoreForGateway` | Function | `AI/3-Application/Openclaw-source/src/gateway/session-utils.ts` | 847 |
| `assertModelSelection` | Function | `AI/3-Application/Openclaw-source/src/auto-reply/reply.directive.directive-behavior.e2e-harness.ts` | 117 |
| `loadSessionStore` | Function | `AI/3-Application/Openclaw-source/src/config/sessions/store.ts` | 194 |
| `updateSessionStore` | Function | `AI/3-Application/Openclaw-source/src/config/sessions/store.ts` | 584 |
| `readSessionStoreCache` | Function | `AI/3-Application/Openclaw-source/src/config/sessions/store-cache.ts` | 40 |
| `incrementCompactionCount` | Function | `AI/3-Application/Openclaw-source/src/auto-reply/reply/session-updates.ts` | 251 |
| `persistAbortTargetEntry` | Function | `AI/3-Application/Openclaw-source/src/auto-reply/reply/commands-session-store.ts` | 21 |
| `handleStopCommand` | Function | `AI/3-Application/Openclaw-source/src/auto-reply/reply/commands-session-abort.ts` | 105 |
| `handleAbortTrigger` | Function | `AI/3-Application/Openclaw-source/src/auto-reply/reply/commands-session-abort.ts` | 152 |
| `applySessionHints` | Function | `AI/3-Application/Openclaw-source/src/auto-reply/reply/body.ts` | 4 |
| `setAbortMemory` | Function | `AI/3-Application/Openclaw-source/src/auto-reply/reply/abort.ts` | 139 |
| `formatAbortReplyText` | Function | `AI/3-Application/Openclaw-source/src/auto-reply/reply/abort.ts` | 164 |
| `resolveSessionEntryForKey` | Function | `AI/3-Application/Openclaw-source/src/auto-reply/reply/abort.ts` | 172 |
| `stopSubagentsForRequester` | Function | `AI/3-Application/Openclaw-source/src/auto-reply/reply/abort.ts` | 216 |
| `tryFastAbortFromMessage` | Function | `AI/3-Application/Openclaw-source/src/auto-reply/reply/abort.ts` | 278 |
| `applyAbortCutoffToSessionEntry` | Function | `AI/3-Application/Openclaw-source/src/auto-reply/reply/abort-cutoff.ts` | 45 |
| `createSessionStatusTool` | Function | `AI/3-Application/Openclaw-source/src/agents/tools/session-status-tool.ts` | 175 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `RegisterTelegramHandlers → Trim` | cross_community | 6 |
| `RegisterTelegramHandlers → ToLowerCase` | cross_community | 6 |
| `RegisterTelegramHandlers → GetActivePluginRegistry` | cross_community | 6 |
| `OnEvent → NormalizeSystemText` | cross_community | 6 |
| `OnEvent → ShouldFlushLiveBufferOnIdle` | cross_community | 6 |
| `OnEvent → DrainChunker` | cross_community | 6 |
| `RegisterTelegramHandlers → Max` | cross_community | 5 |
| `RegisterTelegramHandlers → BuildSkillCommandDefinitions` | cross_community | 5 |
| `HandlePluginsCommand → Max` | cross_community | 5 |
| `HandlePluginsCommand → NormalizeChannelKey` | cross_community | 5 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Scripts | 131 calls |
| Agents | 96 calls |
| Auto-reply | 77 calls |
| Monitor | 53 calls |
| Sessions | 31 calls |
| Ink | 25 calls |
| Gateway | 24 calls |
| Plugins | 21 calls |

## How to Explore

1. `gitnexus_context({name: "resolveSessionKeyFromResolveParams"})` — see callers and callees
2. `gitnexus_query({query: "reply"})` — find related execution flows
3. Read key files listed above for implementation details
