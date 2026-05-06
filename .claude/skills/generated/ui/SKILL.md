---
name: ui
description: "Skill for the Ui area of Wiki. 348 symbols across 87 files."
---

# Ui

348 symbols | 87 files | Cohesion: 54%

## When to Use

- Working with code in `AI/`
- Understanding how Text, remember, OnboardingFlow work
- Modifying ui-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `AI/3-Application/Openclaw-source/ui/src/ui/app.ts` | handleChatScroll, handleLogsScroll, handleChannelConfigSave, handleChannelConfigReload, handleNostrProfileEdit (+23) |
| `AI/3-Application/Openclaw-source/ui/src/ui/app-render.helpers.ts` | renderTopbarThemeModeToggle, resetChatStateForSessionSwitch, renderChatControls, renderChatMobileToggle, switchChatSession (+21) |
| `AI/3-Application/Openclaw-source/ui/src/ui/app-settings.ts` | applySettings, applyTheme, syncThemeWithSettings, applyBorderRadius, applyResolvedTheme (+18) |
| `AI/3-Application/Openclaw-source/apps/android/app/src/main/java/ai/openclaw/app/ui/OnboardingFlow.kt` | OnboardingFlow, isPermissionToggleGranted, onboardingPrimaryButtonColors, onboardingSwitchColors, GatewayStep (+13) |
| `AI/3-Application/Openclaw-source/ui/src/ui/app-chat.ts` | sendChatMessageNow, flushChatQueue, dispatchSlashCommand, clearChatHistory, refreshChat (+10) |
| `AI/3-Application/Openclaw-source/ui/src/ui/app-channels.ts` | handleChannelConfigSave, handleChannelConfigReload, handleNostrProfileEdit, handleWhatsAppStart, handleWhatsAppWait (+8) |
| `AI/3-Application/Openclaw-source/ui/src/ui/gateway.ts` | resolveGatewayErrorDetailCode, isNonRecoverableAuthError, start, stop, connect (+8) |
| `AI/3-Application/Openclaw-source/apps/android/app/src/main/java/ai/openclaw/app/MainViewModel.kt` | setManualEnabled, setManualHost, setManualPort, setManualTls, setGatewayToken (+6) |
| `AI/3-Application/Openclaw-source/ui/src/ui/storage.ts` | settingsKeyForGateway, normalizeGatewayTokenScope, resolveScopedSessionSelection, loadSettings, saveSettings (+6) |
| `AI/3-Application/Openclaw-source/ui/src/ui/app-tool-stream.ts` | formatToolOutput, flushToolStreamSync, scheduleToolStreamSync, handleAgentEvent, toTrimmedString (+5) |

## Entry Points

Start here when exploring this area:

- **`Text`** (Function) — `AI/3-Application/Claude-Code-source/src/ink/components/Text.tsx:113`
- **`remember`** (Function) — `AI/3-Application/Openclaw-source/extensions/matrix/src/matrix/monitor/thread-context.ts:76`
- **`OnboardingFlow`** (Function) — `AI/3-Application/Openclaw-source/apps/android/app/src/main/java/ai/openclaw/app/ui/OnboardingFlow.kt:208`
- **`isPermissionToggleGranted`** (Function) — `AI/3-Application/Openclaw-source/apps/android/app/src/main/java/ai/openclaw/app/ui/OnboardingFlow.kt:324`
- **`ConnectTabScreen`** (Function) — `AI/3-Application/Openclaw-source/apps/android/app/src/main/java/ai/openclaw/app/ui/ConnectTabScreen.kt:62`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `Surface` | Class | `React/React-source/packages/react-devtools-timeline/src/view-base/Surface.js` | 59 |
| `GatewayRequestError` | Class | `AI/3-Application/Openclaw-source/ui/src/ui/gateway.ts` | 38 |
| `Color` | Class | `React/React-source/compiler/packages/react-forgive/client/src/colors.ts` | 11 |
| `Text` | Function | `AI/3-Application/Claude-Code-source/src/ink/components/Text.tsx` | 113 |
| `remember` | Function | `AI/3-Application/Openclaw-source/extensions/matrix/src/matrix/monitor/thread-context.ts` | 76 |
| `OnboardingFlow` | Function | `AI/3-Application/Openclaw-source/apps/android/app/src/main/java/ai/openclaw/app/ui/OnboardingFlow.kt` | 208 |
| `isPermissionToggleGranted` | Function | `AI/3-Application/Openclaw-source/apps/android/app/src/main/java/ai/openclaw/app/ui/OnboardingFlow.kt` | 324 |
| `ConnectTabScreen` | Function | `AI/3-Application/Openclaw-source/apps/android/app/src/main/java/ai/openclaw/app/ui/ConnectTabScreen.kt` | 62 |
| `subtitleForTab` | Function | `AI/3-Application/Openclaw-source/ui/src/ui/navigation.ts` | 194 |
| `handleChatScroll` | Function | `AI/3-Application/Openclaw-source/ui/src/ui/app-scroll.ts` | 125 |
| `renderApp` | Function | `AI/3-Application/Openclaw-source/ui/src/ui/app-render.ts` | 286 |
| `getCurrentConfigValue` | Function | `AI/3-Application/Openclaw-source/ui/src/ui/app-render.ts` | 323 |
| `findAgentIndex` | Function | `AI/3-Application/Openclaw-source/ui/src/ui/app-render.ts` | 325 |
| `renderTopbarThemeModeToggle` | Function | `AI/3-Application/Openclaw-source/ui/src/ui/app-render.helpers.ts` | 919 |
| `handleChannelConfigSave` | Function | `AI/3-Application/Openclaw-source/ui/src/ui/app-channels.ts` | 26 |
| `handleChannelConfigReload` | Function | `AI/3-Application/Openclaw-source/ui/src/ui/app-channels.ts` | 32 |
| `handleNostrProfileEdit` | Function | `AI/3-Application/Openclaw-source/ui/src/ui/app-channels.ts` | 89 |
| `getVisibleCronJobs` | Function | `AI/3-Application/Openclaw-source/ui/src/ui/controllers/cron.ts` | 352 |
| `loadConfig` | Function | `AI/3-Application/Openclaw-source/ui/src/ui/controllers/config.ts` | 38 |
| `saveConfig` | Function | `AI/3-Application/Openclaw-source/ui/src/ui/controllers/config.ts` | 129 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `RenderApp → NormalizeGatewayTokenScope` | cross_community | 7 |
| `RenderApp → PrefersLightScheme` | cross_community | 7 |
| `RenderApp → Trim` | cross_community | 7 |
| `RenderApp → GatewayBrowserClient` | cross_community | 6 |
| `RenderApp → ApplyResolvedTheme` | cross_community | 5 |
| `RenderApp → ToLowerCase` | cross_community | 4 |
| `OnboardingFlow → ServiceComponent` | cross_community | 4 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Controllers | 78 calls |
| Scripts | 61 calls |
| Auto-reply | 20 calls |
| Views | 16 calls |
| App | 10 calls |
| Chat | 9 calls |
| Gateway | 7 calls |
| Infra | 6 calls |

## How to Explore

1. `gitnexus_context({name: "Text"})` — see callers and callees
2. `gitnexus_query({query: "ui"})` — find related execution flows
3. Read key files listed above for implementation details
