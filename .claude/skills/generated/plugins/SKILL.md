---
name: plugins
description: "Skill for the Plugins area of Wiki. 2423 symbols across 745 files."
---

# Plugins

2423 symbols | 745 files | Cohesion: 65%

## When to Use

- Working with code in `AI/`
- Understanding how copyA2uiAssets, getSteps, addToHistory work
- Modifying plugins-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `AI/3-Application/Openclaw-source/src/channels/plugins/setup-wizard-helpers.ts` | promptSingleChannelSecretInput, resolveAccountIdForConfigure, addWildcardAllowFrom, setChannelDmPolicyWithAllowFrom, setLegacyChannelDmPolicyWithAllowFrom (+38) |
| `AI/3-Application/Openclaw-source/src/plugins/conversation-binding.ts` | normalizeChannel, normalizeConversation, toConversationRef, buildPluginBindingSessionKey, isLegacyPluginBindingRecord (+31) |
| `AI/3-Application/Claude-Code-source/src/utils/plugins/marketplaceManager.ts` | getKnownMarketplacesFile, getMarketplacesCacheDir, clearMarketplacesCache, getDeclaredMarketplaces, loadKnownMarketplacesConfig (+29) |
| `AI/3-Application/Claude-Code-source/src/utils/plugins/pluginLoader.ts` | getPluginCachePath, getVersionedCachePathIn, getVersionedCachePath, getVersionedZipCachePath, probeSeedCache (+28) |
| `AI/3-Application/Openclaw-source/src/plugins/bundle-manifest.ts` | resolveClaudeComponentPaths, resolveClaudeSkillsRootDirs, resolveClaudeCommandRootDirs, resolveClaudeSkillDirs, resolveClaudeAgentDirs (+27) |
| `AI/3-Application/Claude-Code-source/src/utils/sessionStorage.ts` | getProjectsDir, getAgentMetadataPath, writeAgentMetadata, readAgentMetadata, getRemoteAgentsDir (+26) |
| `AI/3-Application/Openclaw-source/src/plugins/hooks.ts` | runVoidHook, runAgentEnd, runLlmInput, runLlmOutput, runMessageReceived (+25) |
| `AI/3-Application/Claude-Code-source/src/utils/nativeInstaller/installer.ts` | getPlatform, getBinaryName, getBaseDirectories, isPossibleClaudeBinary, getVersionPaths (+24) |
| `AI/3-Application/Claude-Code-source/src/utils/plugins/installedPluginsManager.ts` | getInstalledPluginsFilePath, getInstalledPluginsV2FilePath, migrateToSinglePluginFile, cleanupLegacyCache, readInstalledPluginsFileRaw (+21) |
| `AI/3-Application/Openclaw-source/src/plugins/provider-auth-storage.ts` | resolveAuthAgentDir, setAnthropicApiKey, setOpenaiApiKey, setGeminiApiKey, setMinimaxApiKey (+21) |

## Entry Points

Start here when exploring this area:

- **`copyA2uiAssets`** (Function) — `AI/3-Application/Openclaw-source/scripts/canvas-a2ui-copy.ts:12`
- **`getSteps`** (Function) — `AI/3-Application/Claude-Code-source/src/projectOnboardingState.ts:18`
- **`addToHistory`** (Function) — `AI/3-Application/Claude-Code-source/src/history.ts:410`
- **`getEmptyToolPermissionContext`** (Function) — `AI/3-Application/Claude-Code-source/src/Tool.ts:140`
- **`doCompileStyle`** (Function) — `Vue3/Vue3-source/packages/compiler-sfc/src/compileStyle.ts:88`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `ConfigParseError` | Class | `AI/3-Application/Claude-Code-source/src/utils/errors.ts` | 38 |
| `FlushGate` | Class | `AI/3-Application/Claude-Code-source/src/bridge/flushGate.ts` | 15 |
| `BoundedUUIDSet` | Class | `AI/3-Application/Claude-Code-source/src/bridge/bridgeMessaging.ts` | 428 |
| `CCRClient` | Class | `AI/3-Application/Claude-Code-source/src/cli/transports/ccrClient.ts` | 261 |
| `PluginLoadFailureError` | Class | `AI/3-Application/Openclaw-source/src/plugins/loader.ts` | 76 |
| `copyA2uiAssets` | Function | `AI/3-Application/Openclaw-source/scripts/canvas-a2ui-copy.ts` | 12 |
| `getSteps` | Function | `AI/3-Application/Claude-Code-source/src/projectOnboardingState.ts` | 18 |
| `addToHistory` | Function | `AI/3-Application/Claude-Code-source/src/history.ts` | 410 |
| `getEmptyToolPermissionContext` | Function | `AI/3-Application/Claude-Code-source/src/Tool.ts` | 140 |
| `doCompileStyle` | Function | `Vue3/Vue3-source/packages/compiler-sfc/src/compileStyle.ts` | 88 |
| `recordPlainCssDependencies` | Function | `Vue3/Vue3-source/packages/compiler-sfc/src/compileStyle.ts` | 171 |
| `spawnGatewayInstance` | Function | `AI/3-Application/Openclaw-source/test/helpers/gateway-e2e-harness.ts` | 103 |
| `readFileUtf8AndCleanup` | Function | `AI/3-Application/Openclaw-source/src/test-utils/camera-url-test-helpers.ts` | 14 |
| `createBundleProbePlugin` | Function | `AI/3-Application/Openclaw-source/src/plugins/bundle-mcp.test-support.ts` | 27 |
| `createWindowsCmdShimFixture` | Function | `AI/3-Application/Openclaw-source/src/plugin-sdk/testing.ts` | 14 |
| `cleanOldMedia` | Function | `AI/3-Application/Openclaw-source/src/media/store.ts` | 112 |
| `removeExpiredFilesInDir` | Function | `AI/3-Application/Openclaw-source/src/media/store.ts` | 118 |
| `writeSessionStore` | Function | `AI/3-Application/Openclaw-source/src/gateway/test-helpers.server.ts` | 65 |
| `saveCronStore` | Function | `AI/3-Application/Openclaw-source/src/cron/store.ts` | 62 |
| `writeCronStoreSnapshot` | Function | `AI/3-Application/Openclaw-source/src/cron/service.test-harness.ts` | 53 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `HandleModelPickerInteraction → Dep` | cross_community | 10 |
| `HandleModelPickerInteraction → ToRaw` | cross_community | 9 |
| `HandleModelPickerInteraction → IsShallow` | cross_community | 9 |
| `HandleModelPickerInteraction → CreateEmptyPluginRegistry` | cross_community | 8 |
| `HandleModelPickerInteraction → Trim` | cross_community | 8 |
| `HandleSpeculationAccept → ToLowerCase` | cross_community | 8 |
| `HandleSpeculationAccept → Trim` | cross_community | 8 |
| `HandleModelPickerInteraction → GetActivePluginRegistryVersion` | cross_community | 7 |
| `HandleSpeculationAccept → ShouldShowDebugCategories` | cross_community | 7 |
| `CompactEmbeddedPiSessionDirect → LogToFile` | cross_community | 6 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Scripts | 373 calls |
| Agents | 81 calls |
| Components | 72 calls |
| Infra | 67 calls |
| Oauth | 58 calls |
| Validate | 56 calls |
| Auto-reply | 50 calls |
| Constants | 35 calls |

## How to Explore

1. `gitnexus_context({name: "copyA2uiAssets"})` — see callers and callees
2. `gitnexus_query({query: "plugins"})` — find related execution flows
3. Read key files listed above for implementation details
