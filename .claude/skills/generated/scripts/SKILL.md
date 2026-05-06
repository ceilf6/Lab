---
name: scripts
description: "Skill for the Scripts area of Wiki. 1068 symbols across 427 files."
---

# Scripts

1068 symbols | 427 files | Cohesion: 66%

## When to Use

- Working with code in `AI/`
- Understanding how insertCSS, injectStyles, WordMCPClient work
- Modifying scripts-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `AI/2-AI-infra/ceilf6-skills-app/report-writer/scripts/weekly-report-prep.mjs` | parseDailyReport, inferTitle, splitSections, isDoneHeading, isNextHeading (+41) |
| `AI/3-Application/Openclaw-source/scripts/test-parallel.mjs` | existingFiles, existingUnitConfigFiles, formatElapsedMs, ensureNodeOptionFlag, runOnce (+18) |
| `AI/3-Application/Openclaw-source/scripts/run-node.mjs` | normalizePath, isIgnoredSourcePath, isBuildRelevantSourcePath, isBuildRelevantRunNodePath, isRestartRelevantExtensionPath (+16) |
| `AI/3-Application/Openclaw-source/src/daemon/systemd.ts` | resolveSystemdUnitPathForName, resolveSystemdServiceName, resolveSystemdUnitPath, readSystemdServiceExecStart, readSystemctlDetail (+14) |
| `AI/3-Application/Openclaw-source/src/node-host/invoke-system-run-plan.ts` | resolvesToExistingFileSync, resolvePosixShellScriptOperandIndex, resolveOptionFilteredFileOperandIndex, resolveOptionFilteredPositionalIndex, collectExistingFileOperandIndexes (+10) |
| `Vue3/Vue3-source/scripts/release.js` | inc, run, getPkgRoot, step, main (+10) |
| `AI/3-Application/Openclaw-source/scripts/label-open-issues.ts` | resolveRepo, logStep, logSuccess, logInfo, createEmptyState (+9) |
| `AI/3-Application/Openclaw-source/scripts/audit-plugin-sdk-seams.mjs` | buildDuplicatedSeamFamilies, buildOverlapFiles, buildOptionalClusterStaticLeaks, collectWorkspacePackagePaths, normalizePath (+9) |
| `AI/3-Application/Openclaw-source/scripts/release-check.ts` | collectForbiddenPackPaths, collectDistPluginSdkExports, checkPluginSdkExports, main, collectBundledExtensions (+7) |
| `AI/3-Application/Openclaw-source/scripts/check-gateway-watch-regression.mjs` | parseTimingFile, runTimedWatch, ensureDir, runCheckedCommand, parsePathFile (+7) |

## Entry Points

Start here when exploring this area:

- **`insertCSS`** (Function) — `Vue2/Vue2-source/test/transition/helpers.ts:81`
- **`injectStyles`** (Function) — `Vue2/Vue2-source/test/transition/helpers.ts:91`
- **`WordMCPClient`** (Function) — `sandboxs-runner/sandboxs/wordMCP/index.tsx:40`
- **`handleChat`** (Function) — `sandboxs-runner/sandboxs/wordMCP/index.tsx:481`
- **`addTodo`** (Function) — `Vue3/sandboxs-vite/src/compositions/useNewTodo.js:6`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `insertCSS` | Function | `Vue2/Vue2-source/test/transition/helpers.ts` | 81 |
| `injectStyles` | Function | `Vue2/Vue2-source/test/transition/helpers.ts` | 91 |
| `WordMCPClient` | Function | `sandboxs-runner/sandboxs/wordMCP/index.tsx` | 40 |
| `handleChat` | Function | `sandboxs-runner/sandboxs/wordMCP/index.tsx` | 481 |
| `addTodo` | Function | `Vue3/sandboxs-vite/src/compositions/useNewTodo.js` | 6 |
| `throwFormattedError` | Function | `React/React-source/packages/internal-test-utils/consoleMock.js` | 264 |
| `collectReleasePackageMetadataErrors` | Function | `AI/3-Application/Openclaw-source/scripts/openclaw-npm-release-check.ts` | 169 |
| `main` | Function | `AI/3-Application/Openclaw-source/scripts/cron_usage_report.ts` | 97 |
| `isMemberExpressionBrowser` | Function | `Vue3/Vue3-source/packages/compiler-core/src/utils.ts` | 90 |
| `detectChangedScope` | Function | `AI/3-Application/Openclaw-source/scripts/ci-changed-scope.mjs` | 23 |
| `listChangedPaths` | Function | `AI/3-Application/Openclaw-source/scripts/ci-changed-scope.mjs` | 97 |
| `postJson` | Function | `AI/3-Application/Openclaw-source/test/helpers/gateway-e2e-harness.ts` | 219 |
| `isSameSessionKey` | Function | `AI/3-Application/Openclaw-source/src/tui/tui-event-handlers.ts` | 170 |
| `handleBtwEvent` | Function | `AI/3-Application/Openclaw-source/src/tui/tui-event-handlers.ts` | 361 |
| `parseInlineDirectives` | Function | `AI/3-Application/Openclaw-source/src/utils/directive-tags.ts` | 84 |
| `createIMessageTestPlugin` | Function | `AI/3-Application/Openclaw-source/src/test-utils/imessage-test-plugin.ts` | 5 |
| `parseApiErrorPayload` | Function | `AI/3-Application/Openclaw-source/src/shared/assistant-error-format.ts` | 43 |
| `parseApiErrorInfo` | Function | `AI/3-Application/Openclaw-source/src/shared/assistant-error-format.ts` | 103 |
| `isDiscordMutableAllowEntry` | Function | `AI/3-Application/Openclaw-source/src/security/mutable-allowlist-detectors.ts` | 0 |
| `resolveMutableFileOperandSnapshotSync` | Function | `AI/3-Application/Openclaw-source/src/node-host/invoke-system-run-plan.ts` | 793 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `LoadConfig → Normalize` | cross_community | 10 |
| `LoadConfig → ResolveRawOsHomeDir` | cross_community | 10 |
| `HandleModelPickerInteraction → Dep` | cross_community | 10 |
| `ProcessMessage → Trim` | cross_community | 9 |
| `HandleModelPickerInteraction → ToRaw` | cross_community | 9 |
| `HandleModelPickerInteraction → IsShallow` | cross_community | 9 |
| `LoadConfig → Cwd` | cross_community | 8 |
| `MonitorMattermostProvider → Trim` | cross_community | 8 |
| `HandleModelPickerInteraction → Trim` | cross_community | 8 |
| `HandleSpeculationAccept → Trim` | cross_community | 8 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Infra | 47 calls |
| Plugins | 38 calls |
| Auto-reply | 28 calls |
| Node-host | 17 calls |
| Daemon | 16 calls |
| Agents | 14 calls |
| Validate | 11 calls |
| Ink | 11 calls |

## How to Explore

1. `gitnexus_context({name: "insertCSS"})` — see callers and callees
2. `gitnexus_query({query: "scripts"})` — find related execution flows
3. Read key files listed above for implementation details
