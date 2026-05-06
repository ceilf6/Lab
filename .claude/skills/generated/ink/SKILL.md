---
name: ink
description: "Skill for the Ink area of Wiki. 282 symbols across 101 files."
---

# Ink

282 symbols | 101 files | Cohesion: 50%

## When to Use

- Working with code in `AI/`
- Understanding how widestLine, lineWidth, waitForNodeReconnect work
- Modifying ink-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `AI/3-Application/Claude-Code-source/src/ink/ink.tsx` | copySelectionNoClear, copySelection, hasTextSelection, onRender, unmount (+33) |
| `AI/3-Application/Claude-Code-source/src/ink/screen.ts` | cellAtCI, diffEach, diffRowBoth, diffRowRemoved, diffRowAdded (+29) |
| `AI/3-Application/Claude-Code-source/src/ink/selection.ts` | hasSelection, applySelectionOverlay, startSelection, wordBoundsAt, selectWordAt (+12) |
| `AI/3-Application/Claude-Code-source/src/ink/log-update.ts` | render, transitionHyperlink, transitionStyle, readLine, renderFrameSlice (+9) |
| `AI/3-Application/Claude-Code-source/src/ink/dom.ts` | measureTextNode, findOwnerChainAtRow, walk, setStyle, setTextStyles (+6) |
| `AI/3-Application/Claude-Code-source/src/ink/render-node-to-output.ts` | drainAdaptive, drainProportional, renderNodeToOutput, renderChildren, blitEscapingAbsoluteDescendants (+6) |
| `AI/3-Application/Claude-Code-source/src/ink/focus.ts` | focusNext, focusPrevious, moveFocus, collectTabbable, FocusManager (+5) |
| `AI/3-Application/Claude-Code-source/src/ink/output.ts` | blit, intersectClip, maxDefined, get, write (+3) |
| `AI/3-Application/Claude-Code-source/src/ink/parse-keypress.ts` | parseTerminalResponse, parseMultipleKeypresses, keycodeToName, parseMouseEvent, parseKeypress |
| `AI/3-Application/Claude-Code-source/src/ink/render-to-screen.ts` | scanPositions, applyPositionedHighlight, transform, renderToScreen |

## Entry Points

Start here when exploring this area:

- **`widestLine`** (Function) — `AI/3-Application/Claude-Code-source/src/ink/widest-line.ts:2`
- **`lineWidth`** (Function) — `AI/3-Application/Claude-Code-source/src/ink/line-width-cache.ts:9`
- **`waitForNodeReconnect`** (Function) — `AI/3-Application/Openclaw-source/src/gateway/server-methods/nodes.ts:473`
- **`resolveCliNoOutputTimeoutMs`** (Function) — `AI/3-Application/Openclaw-source/src/agents/cli-runner/reliability.ts:56`
- **`scheduleStatePersist`** (Function) — `AI/3-Application/Openclaw-source/extensions/nostr/src/nostr-bus.ts:377`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `ClickEvent` | Class | `AI/3-Application/Claude-Code-source/src/ink/events/click-event.ts` | 9 |
| `CharPool` | Class | `AI/3-Application/Claude-Code-source/src/ink/screen.ts` | 20 |
| `HyperlinkPool` | Class | `AI/3-Application/Claude-Code-source/src/ink/screen.ts` | 56 |
| `StylePool` | Class | `AI/3-Application/Claude-Code-source/src/ink/screen.ts` | 111 |
| `FocusManager` | Class | `AI/3-Application/Claude-Code-source/src/ink/focus.ts` | 14 |
| `ActivityManager` | Class | `AI/3-Application/Claude-Code-source/src/utils/activityManager.ts` | 12 |
| `Ink` | Class | `AI/3-Application/Claude-Code-source/src/ink/ink.tsx` | 76 |
| `widestLine` | Function | `AI/3-Application/Claude-Code-source/src/ink/widest-line.ts` | 2 |
| `lineWidth` | Function | `AI/3-Application/Claude-Code-source/src/ink/line-width-cache.ts` | 9 |
| `waitForNodeReconnect` | Function | `AI/3-Application/Openclaw-source/src/gateway/server-methods/nodes.ts` | 473 |
| `resolveCliNoOutputTimeoutMs` | Function | `AI/3-Application/Openclaw-source/src/agents/cli-runner/reliability.ts` | 56 |
| `scheduleStatePersist` | Function | `AI/3-Application/Openclaw-source/extensions/nostr/src/nostr-bus.ts` | 377 |
| `getChatMembers` | Function | `AI/3-Application/Openclaw-source/extensions/feishu/src/chat.ts` | 38 |
| `getSkillUsageScore` | Function | `AI/3-Application/Claude-Code-source/src/utils/suggestions/skillUsageTracking.ts` | 43 |
| `calculateFeedWidth` | Function | `AI/3-Application/Claude-Code-source/src/components/LogoV2/Feed.tsx` | 23 |
| `getChartData` | Function | `React/React-source/packages/react-devtools-shared/src/devtools/views/Profiler/RankedChartBuilder.js` | 32 |
| `getChartData` | Function | `React/React-source/packages/react-devtools-shared/src/devtools/views/Profiler/FlamegraphChartBuilder.js` | 36 |
| `walkTree` | Function | `React/React-source/packages/react-devtools-shared/src/devtools/views/Profiler/FlamegraphChartBuilder.js` | 65 |
| `resolveMediaDurationMs` | Function | `AI/3-Application/Openclaw-source/extensions/matrix/src/matrix/send/media.ts` | 161 |
| `cb` | Function | `Vue2/Vue2-source/packages/server-renderer/src/util.ts` | 108 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `ScrollKeybindingHandler → HasSelection` | cross_community | 5 |
| `RegisterTelegramHandlers → Max` | cross_community | 5 |
| `HandlePluginsCommand → Max` | cross_community | 5 |
| `CondensedLogo → Max` | cross_community | 5 |
| `ScrollKeybindingHandler → ClearSelection` | cross_community | 4 |
| `CreateTelegramBot → Max` | cross_community | 4 |
| `HandleModelPickerInteraction → Max` | cross_community | 4 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Plugins | 14 calls |
| Termio | 11 calls |
| Auto-reply | 5 calls |
| Scripts | 4 calls |
| Shared-commands | 4 calls |
| Constants | 3 calls |
| Components | 3 calls |
| Cli | 2 calls |

## How to Explore

1. `gitnexus_context({name: "widestLine"})` — see callers and callees
2. `gitnexus_query({query: "ink"})` — find related execution flows
3. Read key files listed above for implementation details
