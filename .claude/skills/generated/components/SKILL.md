---
name: components
description: "Skill for the Components area of Wiki. 606 symbols across 247 files."
---

# Components

606 symbols | 247 files | Cohesion: 51%

## When to Use

- Working with code in `AI/`
- Understanding how hydrateNode, onMismatch, hydrateElement work
- Modifying components-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `Vue3/Vue3-source/packages/runtime-core/src/components/BaseTransition.ts` | afterLeave, delayLeave, recursiveGetSubtree, setup, findNonCommentChild (+15) |
| `Vue3/Vue3-source/packages/runtime-core/src/renderer.ts` | patchProp, insert, createText, createComment, parentNode (+14) |
| `Vue3/Vue3-source/packages/runtime-dom/src/components/Transition.ts` | resolveTransitionProps, normalizeDuration, NumberOf, forceReflow, whenTransitionEnds (+12) |
| `Vue3/Vue3-source/packages/runtime-core/src/hydration.ts` | logMismatchError, isSVGContainer, isMathMLContainer, getContainerType, hydrateNode (+11) |
| `AI/3-Application/Claude-Code-source/src/components/Stats.tsx` | createAllTimeStatsPromise, Stats, StatsContent, handleScreenshot, renderStatsToAnsi (+9) |
| `AI/3-Application/Openclaw-source/src/tui/components/searchable-select-list.ts` | smartFilter, getSelectedItem, SearchableSelectList, render, getCachedRegex (+8) |
| `Vue3/Vue3-source/packages/runtime-core/src/components/Teleport.ts` | hydrateTeleport, hydrateAnchor, hydrateDisabledTeleport, prepareAnchor, isTargetSVG (+7) |
| `AI/3-Application/Openclaw-source/src/tui/components/chat-log.ts` | pruneOverflow, append, resolveRunId, startAssistant, updateAssistant (+7) |
| `AI/3-Application/Claude-Code-source/src/components/MessageSelector.tsx` | isTextBlock, UserMessageOption, selectableUserMessagesFilter, loadFileHistoryMetadata, computeDiffStatsBetweenMessages (+7) |
| `Vue3/Vue3-source/packages/runtime-core/src/components/Suspense.ts` | process, fallback, triggerEvent, mountSuspense, patchSuspense (+6) |

## Entry Points

Start here when exploring this area:

- **`hydrateNode`** (Function) — `Vue3/Vue3-source/packages/runtime-core/src/hydration.ts:136`
- **`onMismatch`** (Function) — `Vue3/Vue3-source/packages/runtime-core/src/hydration.ts:146`
- **`hydrateElement`** (Function) — `Vue3/Vue3-source/packages/runtime-core/src/hydration.ts:367`
- **`hydrateChildren`** (Function) — `Vue3/Vue3-source/packages/runtime-core/src/hydration.ts:557`
- **`hydrateFragment`** (Function) — `Vue3/Vue3-source/packages/runtime-core/src/hydration.ts:638`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `AssistantMessageComponent` | Class | `AI/3-Application/Openclaw-source/src/tui/components/assistant-message.ts` | 4 |
| `ToolExecutionComponent` | Class | `AI/3-Application/Openclaw-source/src/tui/components/tool-execution.ts` | 54 |
| `HyperlinkMarkdown` | Class | `AI/3-Application/Openclaw-source/src/tui/components/hyperlink-markdown.ts` | 9 |
| `UserMessageComponent` | Class | `AI/3-Application/Openclaw-source/src/tui/components/user-message.ts` | 3 |
| `MarkdownMessageComponent` | Class | `AI/3-Application/Openclaw-source/src/tui/components/markdown-message.ts` | 5 |
| `SearchableSelectList` | Class | `AI/3-Application/Openclaw-source/src/tui/components/searchable-select-list.ts` | 25 |
| `BtwInlineMessage` | Class | `AI/3-Application/Openclaw-source/src/tui/components/btw-inline-message.ts` | 10 |
| `hydrateNode` | Function | `Vue3/Vue3-source/packages/runtime-core/src/hydration.ts` | 136 |
| `onMismatch` | Function | `Vue3/Vue3-source/packages/runtime-core/src/hydration.ts` | 146 |
| `hydrateElement` | Function | `Vue3/Vue3-source/packages/runtime-core/src/hydration.ts` | 367 |
| `hydrateChildren` | Function | `Vue3/Vue3-source/packages/runtime-core/src/hydration.ts` | 557 |
| `hydrateFragment` | Function | `Vue3/Vue3-source/packages/runtime-core/src/hydration.ts` | 638 |
| `handleMismatch` | Function | `Vue3/Vue3-source/packages/runtime-core/src/hydration.ts` | 676 |
| `locateClosingAnchor` | Function | `Vue3/Vue3-source/packages/runtime-core/src/hydration.ts` | 738 |
| `replaceNode` | Function | `Vue3/Vue3-source/packages/runtime-core/src/hydration.ts` | 760 |
| `isTemplateNode` | Function | `Vue3/Vue3-source/packages/runtime-core/src/hydration.ts` | 781 |
| `MailboxProvider` | Function | `AI/3-Application/Claude-Code-source/src/context/mailbox.tsx` | 7 |
| `useTeleportResume` | Function | `AI/3-Application/Claude-Code-source/src/hooks/useTeleportResume.tsx` | 14 |
| `TeleportResumeWrapper` | Function | `AI/3-Application/Claude-Code-source/src/components/TeleportResumeWrapper.tsx` | 22 |
| `StatusNotices` | Function | `AI/3-Application/Claude-Code-source/src/components/StatusNotices.tsx` | 17 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `PromptInput → ShouldUseMockSubscription` | cross_community | 6 |
| `PromptInput → GetMockSubscriptionType` | cross_community | 6 |
| `ScrollKeybindingHandler → HasSelection` | cross_community | 5 |
| `Feedback → MyPromise` | cross_community | 5 |
| `TrustDialog → GetCwdState` | cross_community | 5 |
| `PromptInput → UseAppStore` | cross_community | 4 |
| `ScrollKeybindingHandler → ClearSelection` | cross_community | 4 |
| `ScrollKeybindingHandler → UseAppStore` | cross_community | 4 |
| `ScrollKeybindingHandler → UseStdin` | cross_community | 4 |
| `LogSelector → UseApp` | cross_community | 4 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Plugins | 79 calls |
| Ink | 58 calls |
| Scripts | 37 calls |
| Plugin | 18 calls |
| Oauth | 16 calls |
| Hooks | 15 calls |
| Compat | 14 calls |
| Auto-reply | 14 calls |

## How to Explore

1. `gitnexus_context({name: "hydrateNode"})` — see callers and callees
2. `gitnexus_query({query: "components"})` — find related execution flows
3. Read key files listed above for implementation details
