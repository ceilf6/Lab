---
name: monitor
description: "Skill for the Monitor area of Wiki. 1258 symbols across 394 files."
---

# Monitor

1258 symbols | 394 files | Cohesion: 65%

## When to Use

- Working with code in `AI/`
- Understanding how normalizeE164, isSelfChatMode, toWhatsappJid work
- Modifying monitor-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `AI/3-Application/Openclaw-source/extensions/discord/src/monitor/agent-components.ts` | dispatchDiscordComponentEvent, handleDiscordComponentEvent, handleDiscordModalTrigger, run, run (+20) |
| `AI/3-Application/Openclaw-source/extensions/discord/src/monitor/model-picker.ts` | loadDiscordModelPickerData, renderDiscordModelPickerModelsView, toDiscordModelPickerMessagePayload, normalizePage, clampPageSize (+19) |
| `AI/3-Application/Openclaw-source/extensions/discord/src/monitor/allow-list.ts` | resolveDiscordOwnerAccess, resolveDiscordChannelConfigWithFallback, resolveDiscordShouldRequireMention, isDiscordAutoThreadOwnedByBot, isDiscordGroupAllowedByPolicy (+18) |
| `AI/3-Application/Openclaw-source/extensions/discord/src/monitor/listeners.ts` | registerDiscordListener, DiscordMessageListener, DiscordReactionListener, DiscordReactionRemoveListener, DiscordPresenceListener (+18) |
| `AI/3-Application/Openclaw-source/extensions/discord/src/monitor/exec-approvals.ts` | ExecApprovalButton, createExecApprovalButton, extractDiscordChannelId, ExecApprovalActionRow, buildExecApprovalPayload (+18) |
| `AI/3-Application/Openclaw-source/extensions/discord/src/monitor/agent-components-helpers.ts` | ensureDmComponentAuthorized, readParsedComponentId, mapOptionLabels, resolveAgentComponentRoute, ackComponentInteraction (+16) |
| `AI/3-Application/Openclaw-source/extensions/discord/src/monitor/message-utils.ts` | resolveDiscordChannelInfo, mergeHostnameList, resolveDiscordMediaSsrFPolicy, resolveMediaList, resolveForwardedMediaList (+15) |
| `AI/3-Application/Openclaw-source/extensions/discord/src/monitor/native-command-ui.ts` | buildDiscordModelPickerAllowedModelRefs, resolveDiscordModelPickerPreferenceScope, resolveDiscordModelPickerRoute, resolveDiscordModelPickerCurrentModel, replyWithDiscordModelPickerProviders (+12) |
| `AI/3-Application/Openclaw-source/extensions/discord/src/monitor/thread-bindings.state.ts` | rememberThreadBindingToken, getThreadBindingToken, resolveThreadBindingIdleTimeoutMs, resolveThreadBindingMaxAgeMs, resolveThreadBindingInactivityExpiresAt (+12) |
| `AI/3-Application/Openclaw-source/extensions/matrix/src/matrix/monitor/verification-events.ts` | readVerificationSignal, trimMaybeString, formatVerificationStageNotice, sendVerificationNotice, rememberVerificationUserRoom (+11) |

## Entry Points

Start here when exploring this area:

- **`normalizeE164`** (Function) — `AI/3-Application/Openclaw-source/src/utils.ts:75`
- **`isSelfChatMode`** (Function) — `AI/3-Application/Openclaw-source/src/utils.ts:89`
- **`toWhatsappJid`** (Function) — `AI/3-Application/Openclaw-source/src/utils.ts:112`
- **`jidToE164`** (Function) — `AI/3-Application/Openclaw-source/src/utils.ts:168`
- **`resolveJidToE164`** (Function) — `AI/3-Application/Openclaw-source/src/utils.ts:193`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `KeyedAsyncQueue` | Class | `AI/3-Application/Openclaw-source/src/plugin-sdk/keyed-async-queue.ts` | 33 |
| `TwitchClientManager` | Class | `AI/3-Application/Openclaw-source/extensions/twitch/src/twitch-client.ts` | 10 |
| `DiscordStatusReadyListener` | Class | `AI/3-Application/Openclaw-source/extensions/discord/src/monitor/provider.ts` | 729 |
| `DiscordMessageListener` | Class | `AI/3-Application/Openclaw-source/extensions/discord/src/monitor/listeners.ts` | 200 |
| `DiscordReactionListener` | Class | `AI/3-Application/Openclaw-source/extensions/discord/src/monitor/listeners.ts` | 225 |
| `DiscordReactionRemoveListener` | Class | `AI/3-Application/Openclaw-source/extensions/discord/src/monitor/listeners.ts` | 243 |
| `DiscordPresenceListener` | Class | `AI/3-Application/Openclaw-source/extensions/discord/src/monitor/listeners.ts` | 696 |
| `DiscordThreadUpdateListener` | Class | `AI/3-Application/Openclaw-source/extensions/discord/src/monitor/listeners.ts` | 729 |
| `ExecApprovalButton` | Class | `AI/3-Application/Openclaw-source/extensions/discord/src/monitor/exec-approvals.ts` | 799 |
| `AgentComponentButton` | Class | `AI/3-Application/Openclaw-source/extensions/discord/src/monitor/agent-components.ts` | 777 |
| `AgentSelectMenu` | Class | `AI/3-Application/Openclaw-source/extensions/discord/src/monitor/agent-components.ts` | 867 |
| `UrbitSSEClient` | Class | `AI/3-Application/Openclaw-source/extensions/tlon/src/urbit/sse-client.ts` | 25 |
| `DefaultSentMessageCache` | Class | `AI/3-Application/Openclaw-source/extensions/imessage/src/monitor/echo-cache.ts` | 34 |
| `DiscordFormModal` | Class | `AI/3-Application/Openclaw-source/extensions/discord/src/components.ts` | 1128 |
| `DiscordExecApprovalHandler` | Class | `AI/3-Application/Openclaw-source/extensions/discord/src/monitor/exec-approvals.ts` | 369 |
| `normalizeE164` | Function | `AI/3-Application/Openclaw-source/src/utils.ts` | 75 |
| `isSelfChatMode` | Function | `AI/3-Application/Openclaw-source/src/utils.ts` | 89 |
| `toWhatsappJid` | Function | `AI/3-Application/Openclaw-source/src/utils.ts` | 112 |
| `jidToE164` | Function | `AI/3-Application/Openclaw-source/src/utils.ts` | 168 |
| `resolveJidToE164` | Function | `AI/3-Application/Openclaw-source/src/utils.ts` | 193 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `HandleModelPickerInteraction → Dep` | cross_community | 10 |
| `ProcessMessage → Trim` | cross_community | 9 |
| `HandleModelPickerInteraction → ToRaw` | cross_community | 9 |
| `HandleModelPickerInteraction → IsShallow` | cross_community | 9 |
| `ProcessMessage → ToLowerCase` | cross_community | 8 |
| `ProcessMessage → IsValidProfileName` | cross_community | 8 |
| `MonitorMattermostProvider → IsRecord` | cross_community | 8 |
| `MonitorMattermostProvider → Trim` | cross_community | 8 |
| `HandleModelPickerInteraction → CreateEmptyPluginRegistry` | cross_community | 8 |
| `HandleModelPickerInteraction → Trim` | cross_community | 8 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Scripts | 257 calls |
| Auto-reply | 79 calls |
| Reply | 48 calls |
| Ink | 46 calls |
| Matrix | 46 calls |
| Channels | 37 calls |
| Plugins | 27 calls |
| Config | 27 calls |

## How to Explore

1. `gitnexus_context({name: "normalizeE164"})` — see callers and callees
2. `gitnexus_query({query: "monitor"})` — find related execution flows
3. Read key files listed above for implementation details
