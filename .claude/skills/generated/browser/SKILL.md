---
name: browser
description: "Skill for the Browser area of Wiki. 482 symbols across 103 files."
---

# Browser

482 symbols | 103 files | Cohesion: 60%

## When to Use

- Working with code in `AI/`
- Understanding how ensureMediaDir, mapTabError, ensureTabAvailable work
- Modifying browser-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `AI/3-Application/Openclaw-source/src/browser/chrome-mcp.ts` | parsePageId, callTool, withTempFile, focusChromeMcpTab, closeChromeMcpTab (+34) |
| `AI/3-Application/Openclaw-source/src/browser/pw-session.ts` | storeRoleRefsForTarget, restoreRoleRefsForTarget, ensurePageState, observeContext, ensureContextState (+22) |
| `AI/3-Application/Openclaw-source/src/browser/chrome.executables.ts` | findFirstExecutable, findChromeExecutableMac, findChromeExecutableLinux, findChromeExecutableWindows, resolveBrowserExecutableForPlatform (+21) |
| `AI/3-Application/Openclaw-source/src/browser/pw-tools-core.interactions.ts` | pressKeyViaPlaywright, waitForViaPlaywright, takeScreenshotViaPlaywright, screenshotWithLabelsViaPlaywright, clamp (+16) |
| `AI/3-Application/Openclaw-source/src/browser/client.ts` | buildProfileQuery, withBaseUrl, browserStatus, browserProfiles, browserStart (+10) |
| `AI/3-Application/Openclaw-source/src/browser/pw-role-snapshot.ts` | getRoleSnapshotStats, getKey, getNextIndex, trackRef, removeNthFromNonDuplicates (+8) |
| `AI/3-Application/Openclaw-source/src/browser/cdp.helpers.ts` | appendCdpPath, fetchJson, fetchCdpChecked, fetchOk, normalizeCdpHttpBaseForJsonEndpoints (+8) |
| `AI/3-Application/Openclaw-source/src/browser/client-fetch.ts` | fetchBrowserJson, resolveBrowserFetchOperatorHint, normalizeErrorMessage, enhanceDispatcherPathError, enhanceBrowserFetchError (+8) |
| `AI/3-Application/Openclaw-source/src/browser/chrome.ts` | stopOpenClawChrome, exists, launchOpenClawChrome, resolveBrowserExecutable, isChromeReachable (+8) |
| `AI/3-Application/Openclaw-source/src/browser/session-tab-registry.ts` | normalizeSessionKey, normalizeTargetId, normalizeProfile, normalizeBaseUrl, toTrackedTabId (+6) |

## Entry Points

Start here when exploring this area:

- **`ensureMediaDir`** (Function) — `AI/3-Application/Openclaw-source/src/media/store.ts:88`
- **`mapTabError`** (Function) — `AI/3-Application/Openclaw-source/src/browser/server-context.ts:226`
- **`ensureTabAvailable`** (Function) — `AI/3-Application/Openclaw-source/src/browser/server-context.selection.ts:35`
- **`isHttpReachable`** (Function) — `AI/3-Application/Openclaw-source/src/browser/server-context.availability.ts:78`
- **`ensureBrowserAvailable`** (Function) — `AI/3-Application/Openclaw-source/src/browser/server-context.availability.ts:153`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `BrowserTabNotFoundError` | Class | `AI/3-Application/Openclaw-source/src/browser/errors.ts` | 31 |
| `BrowserProfileUnavailableError` | Class | `AI/3-Application/Openclaw-source/src/browser/errors.ts` | 55 |
| `BrowserResourceExhaustedError` | Class | `AI/3-Application/Openclaw-source/src/browser/errors.ts` | 61 |
| `BrowserError` | Class | `AI/3-Application/Openclaw-source/src/browser/errors.ts` | 3 |
| `BrowserValidationError` | Class | `AI/3-Application/Openclaw-source/src/browser/errors.ts` | 13 |
| `BrowserTargetAmbiguousError` | Class | `AI/3-Application/Openclaw-source/src/browser/errors.ts` | 25 |
| `BrowserProfileNotFoundError` | Class | `AI/3-Application/Openclaw-source/src/browser/errors.ts` | 37 |
| `BrowserConflictError` | Class | `AI/3-Application/Openclaw-source/src/browser/errors.ts` | 43 |
| `InvalidBrowserNavigationUrlError` | Class | `AI/3-Application/Openclaw-source/src/browser/navigation-guard.ts` | 16 |
| `BrowserResetUnsupportedError` | Class | `AI/3-Application/Openclaw-source/src/browser/errors.ts` | 49 |
| `ensureMediaDir` | Function | `AI/3-Application/Openclaw-source/src/media/store.ts` | 88 |
| `mapTabError` | Function | `AI/3-Application/Openclaw-source/src/browser/server-context.ts` | 226 |
| `ensureTabAvailable` | Function | `AI/3-Application/Openclaw-source/src/browser/server-context.selection.ts` | 35 |
| `isHttpReachable` | Function | `AI/3-Application/Openclaw-source/src/browser/server-context.availability.ts` | 78 |
| `ensureBrowserAvailable` | Function | `AI/3-Application/Openclaw-source/src/browser/server-context.availability.ts` | 153 |
| `traceStartViaPlaywright` | Function | `AI/3-Application/Openclaw-source/src/browser/pw-tools-core.trace.ts` | 4 |
| `traceStopViaPlaywright` | Function | `AI/3-Application/Openclaw-source/src/browser/pw-tools-core.trace.ts` | 25 |
| `cookiesGetViaPlaywright` | Function | `AI/3-Application/Openclaw-source/src/browser/pw-tools-core.storage.ts` | 2 |
| `cookiesSetViaPlaywright` | Function | `AI/3-Application/Openclaw-source/src/browser/pw-tools-core.storage.ts` | 12 |
| `cookiesClearViaPlaywright` | Function | `AI/3-Application/Openclaw-source/src/browser/pw-tools-core.storage.ts` | 45 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `RegisterBrowserAgentSnapshotRoutes → BrowserProfileNotFoundError` | cross_community | 6 |
| `RegisterBrowserAgentSnapshotRoutes → GetBrowserProfileCapabilities` | cross_community | 6 |
| `RegisterBrowserAgentSnapshotRoutes → ToBrowserTabs` | cross_community | 6 |
| `RegisterBrowserAgentStorageRoutes → JsonError` | intra_community | 5 |
| `RegisterBrowserAgentSnapshotRoutes → Trim` | cross_community | 5 |
| `RegisterBrowserAgentSnapshotRoutes → ExistsSync` | cross_community | 5 |
| `RegisterBrowserAgentSnapshotRoutes → BrowserProfileUnavailableError` | intra_community | 5 |
| `RegisterBrowserAgentSnapshotRoutes → AppendCdpPath` | cross_community | 5 |
| `RegisterBrowserAgentSnapshotRoutes → WithBrowserNavigationPolicy` | cross_community | 5 |
| `RegisterBrowserAgentSnapshotRoutes → ToBrowserErrorResponse` | intra_community | 5 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Scripts | 91 calls |
| Ink | 24 calls |
| Auto-reply | 15 calls |
| Tools | 11 calls |
| Security | 7 calls |
| Config | 7 calls |
| Media | 7 calls |
| Gateway | 6 calls |

## How to Explore

1. `gitnexus_context({name: "ensureMediaDir"})` — see callers and callees
2. `gitnexus_query({query: "browser"})` — find related execution flows
3. Read key files listed above for implementation details
