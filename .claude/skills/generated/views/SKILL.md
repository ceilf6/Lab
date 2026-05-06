---
name: views
description: "Skill for the Views area of Wiki. 272 symbols across 69 files."
---

# Views

272 symbols | 69 files | Cohesion: 66%

## When to Use

- Working with code in `AI/`
- Understanding how parseToolSummary, renderUsage, applyPreset work
- Modifying views-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `AI/3-Application/Openclaw-source/ui/src/ui/views/chat.ts` | getInputHistory, getPinnedMessages, getDeletedMessages, renderContextNotice, renderWelcomeState (+15) |
| `AI/3-Application/Openclaw-source/ui/src/ui/views/config-form.node.ts` | jsonValue, getSensitiveRenderState, renderSensitiveToggleButton, hasSearchCriteria, normalizeTags (+14) |
| `AI/3-Application/Openclaw-source/ui/src/ui/views/cron.ts` | buildChannelOptions, renderSuggestionList, errorIdForField, collectBlockingFields, renderFieldLabel (+9) |
| `AI/3-Application/Openclaw-source/ui/src/ui/views/usage-metrics.ts` | formatTokens, renderUsageMosaic, formatCost, formatIsoDate, parseYmdDate (+8) |
| `AI/3-Application/Openclaw-source/ui/src/ui/views/usage-render-overview.ts` | pct, getCostBreakdown, renderDailyChartCompact, renderCostBreakdownCompact, renderInsightList (+6) |
| `AI/3-Application/Openclaw-source/ui/src/ui/views/agents-utils.ts` | resolveAgentAvatarUrl, addModelId, addModelConfigIds, sortLocaleStrings, sortRange (+6) |
| `AI/3-Application/Openclaw-source/ui/src/ui/views/config-form.shared.ts` | defaultValue, schemaType, pathKey, hintForPath, isSensitiveConfigPath (+5) |
| `AI/3-Application/Openclaw-source/ui/src/ui/views/nodes-exec-approvals.ts` | resolveExecApprovalsNodes, renderExecApprovalsAllowlist, renderAllowlistEntry, resolveConfigAgents, resolveExecApprovalsDefaults (+5) |
| `AI/3-Application/Openclaw-source/ui/src/ui/views/usage.ts` | renderUsage, applyPreset, selectedValuesFor, renderFilterSelect, sessionTouchesHours (+4) |
| `AI/3-Application/Openclaw-source/ui/src/ui/views/usage-render-details.ts` | pct, normalizeLogTimestamp, filterLogsByRange, renderSessionSummary, computeFilteredUsage (+4) |

## Entry Points

Start here when exploring this area:

- **`parseToolSummary`** (Function) — `AI/3-Application/Openclaw-source/ui/src/ui/usage-helpers.ts:291`
- **`renderUsage`** (Function) — `AI/3-Application/Openclaw-source/ui/src/ui/views/usage.ts:90`
- **`applyPreset`** (Function) — `AI/3-Application/Openclaw-source/ui/src/ui/views/usage.ts:340`
- **`formatNextRun`** (Function) — `AI/3-Application/Openclaw-source/ui/src/ui/presenter.ts:16`
- **`formatRelativeTimestamp`** (Function) — `AI/3-Application/Openclaw-source/src/infra/format-time/format-relative.ts:68`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `Blob` | Class | `AI/2-AI-infra/LLM-SDK/Langchain-source/libs/core/langchain_core/documents/base.py` | 58 |
| `parseToolSummary` | Function | `AI/3-Application/Openclaw-source/ui/src/ui/usage-helpers.ts` | 291 |
| `renderUsage` | Function | `AI/3-Application/Openclaw-source/ui/src/ui/views/usage.ts` | 90 |
| `applyPreset` | Function | `AI/3-Application/Openclaw-source/ui/src/ui/views/usage.ts` | 340 |
| `formatNextRun` | Function | `AI/3-Application/Openclaw-source/ui/src/ui/presenter.ts` | 16 |
| `formatRelativeTimestamp` | Function | `AI/3-Application/Openclaw-source/src/infra/format-time/format-relative.ts` | 68 |
| `renderOverviewCards` | Function | `AI/3-Application/Openclaw-source/ui/src/ui/views/overview-cards.ts` | 65 |
| `renderWhatsAppCard` | Function | `AI/3-Application/Openclaw-source/ui/src/ui/views/channels.whatsapp.ts` | 6 |
| `renderChannels` | Function | `AI/3-Application/Openclaw-source/ui/src/ui/views/channels.ts` | 28 |
| `renderTelegramCard` | Function | `AI/3-Application/Openclaw-source/ui/src/ui/views/channels.telegram.ts` | 6 |
| `renderAccountCard` | Function | `AI/3-Application/Openclaw-source/ui/src/ui/views/channels.telegram.ts` | 15 |
| `renderSlackCard` | Function | `AI/3-Application/Openclaw-source/ui/src/ui/views/channels.slack.ts` | 6 |
| `renderSignalCard` | Function | `AI/3-Application/Openclaw-source/ui/src/ui/views/channels.signal.ts` | 6 |
| `renderNostrCard` | Function | `AI/3-Application/Openclaw-source/ui/src/ui/views/channels.nostr.ts` | 24 |
| `renderAccountCard` | Function | `AI/3-Application/Openclaw-source/ui/src/ui/views/channels.nostr.ts` | 55 |
| `renderProfileSection` | Function | `AI/3-Application/Openclaw-source/ui/src/ui/views/channels.nostr.ts` | 95 |
| `renderNostrProfileForm` | Function | `AI/3-Application/Openclaw-source/ui/src/ui/views/channels.nostr-profile-form.ts` | 67 |
| `renderIMessageCard` | Function | `AI/3-Application/Openclaw-source/ui/src/ui/views/channels.imessage.ts` | 6 |
| `renderGoogleChatCard` | Function | `AI/3-Application/Openclaw-source/ui/src/ui/views/channels.googlechat.ts` | 6 |
| `renderDiscordCard` | Function | `AI/3-Application/Openclaw-source/ui/src/ui/views/channels.discord.ts` | 6 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `UseInboxPoller → GetNpmSemver` | cross_community | 6 |
| `UseInboxPoller → Compare` | cross_community | 6 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Scripts | 48 calls |
| Ink | 16 calls |
| Auto-reply | 16 calls |
| Chat | 12 calls |
| Events | 9 calls |
| Ui | 7 calls |
| Shared-commands | 3 calls |
| Commands | 3 calls |

## How to Explore

1. `gitnexus_context({name: "parseToolSummary"})` — see callers and callees
2. `gitnexus_query({query: "views"})` — find related execution flows
3. Read key files listed above for implementation details
