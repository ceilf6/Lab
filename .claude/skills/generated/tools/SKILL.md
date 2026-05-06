---
name: tools
description: "Skill for the Tools area of Wiki. 422 symbols across 131 files."
---

# Tools

422 symbols | 131 files | Cohesion: 56%

## When to Use

- Working with code in `AI/`
- Understanding how normalizeSecretInput, extractXaiWebSearchContent, requestXaiWebSearch work
- Modifying tools-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `AI/3-Application/Openclaw-source/src/agents/tools/web-fetch.ts` | resolveFetchMaxCharsCap, resolveFetchMaxResponseBytes, resolveFirecrawlApiKey, resolveFirecrawlBaseUrl, resolveFirecrawlMaxAgeMs (+12) |
| `AI/3-Application/Openclaw-source/src/agents/tools/web-search-provider-common.ts` | postTrustedWebToolsJson, withTrustedWebSearchEndpoint, resolveSearchTimeoutSeconds, resolveSearchCount, isValidIsoDate (+11) |
| `AI/3-Application/Openclaw-source/src/agents/tools/web-tools.enabled-defaults.test.ts` | installBraveResultsFetch, installBraveLlmContextFetch, createPerplexitySearchTool, createKimiSearchTool, createProviderSearchTool (+6) |
| `AI/3-Application/Openclaw-source/src/agents/tools/image-generate-tool.ts` | resolveImageGenerationModelCandidates, resolveImageGenerationModelConfigForTool, loadReferenceImages, resolveAction, resolveRequestedCount (+6) |
| `AI/3-Application/Openclaw-source/src/agents/tools/sessions-resolution.ts` | resolveMainSessionAlias, resolveInternalSessionKey, listSpawnedSessionKeys, isRequesterSpawnedSessionVisible, shouldVerifyRequesterSpawnedSessionVisibility (+6) |
| `AI/3-Application/Openclaw-source/src/agents/tools/sessions-access.ts` | resolveSessionToolsVisibility, resolveEffectiveSessionToolsVisibility, createSessionVisibilityGuard, matchesAllow, isAllowed (+6) |
| `AI/3-Application/Claude-Code-source/src/services/tools/StreamingToolExecutor.ts` | createSyntheticErrorMessage, getAbortReason, getToolInterruptBehavior, updateInterruptibleState, executeTool (+5) |
| `AI/3-Application/FrontAgent-app/packages/mcp-file/src/path-safety.ts` | normalizeRelativePath, isInsidePath, getRealProjectRoot, findNearestExistingParent, resolveReadPath (+4) |
| `AI/3-Application/Openclaw-source/src/agents/tools/image-tool.test.ts` | stubMinimaxOkFetch, stubOpenAiCompletionsOkFetch, stubMinimaxFetch, requireImageTool, createRequiredImageTool (+4) |
| `AI/3-Application/Openclaw-source/apps/android/app/src/main/java/ai/openclaw/app/tools/ToolDisplay.kt` | resolve, loadConfig, titleFromName, normalizeVerb, readDetail (+4) |

## Entry Points

Start here when exploring this area:

- **`normalizeSecretInput`** (Function) — `AI/3-Application/Openclaw-source/src/utils/normalize-secret-input.ts:15`
- **`extractXaiWebSearchContent`** (Function) — `AI/3-Application/Openclaw-source/extensions/xai/src/web-search-shared.ts:90`
- **`requestXaiWebSearch`** (Function) — `AI/3-Application/Openclaw-source/extensions/xai/src/web-search-shared.ts:125`
- **`runTavilySearch`** (Function) — `AI/3-Application/Openclaw-source/extensions/tavily/src/tavily-client.ts:67`
- **`runTavilyExtract`** (Function) — `AI/3-Application/Openclaw-source/extensions/tavily/src/tavily-client.ts:160`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `ToolInputError` | Class | `AI/3-Application/Openclaw-source/src/agents/tools/common.ts` | 26 |
| `normalizeSecretInput` | Function | `AI/3-Application/Openclaw-source/src/utils/normalize-secret-input.ts` | 15 |
| `extractXaiWebSearchContent` | Function | `AI/3-Application/Openclaw-source/extensions/xai/src/web-search-shared.ts` | 90 |
| `requestXaiWebSearch` | Function | `AI/3-Application/Openclaw-source/extensions/xai/src/web-search-shared.ts` | 125 |
| `runTavilySearch` | Function | `AI/3-Application/Openclaw-source/extensions/tavily/src/tavily-client.ts` | 67 |
| `runTavilyExtract` | Function | `AI/3-Application/Openclaw-source/extensions/tavily/src/tavily-client.ts` | 160 |
| `resolveTavilySearchConfig` | Function | `AI/3-Application/Openclaw-source/extensions/tavily/src/config.ts` | 22 |
| `resolveTavilyApiKey` | Function | `AI/3-Application/Openclaw-source/extensions/tavily/src/config.ts` | 40 |
| `resolveTavilyBaseUrl` | Function | `AI/3-Application/Openclaw-source/extensions/tavily/src/config.ts` | 49 |
| `resolveCacheTtlMs` | Function | `AI/3-Application/Openclaw-source/src/agents/tools/web-shared.ts` | 15 |
| `normalizeCacheKey` | Function | `AI/3-Application/Openclaw-source/src/agents/tools/web-shared.ts` | 21 |
| `readCache` | Function | `AI/3-Application/Openclaw-source/src/agents/tools/web-shared.ts` | 25 |
| `writeCache` | Function | `AI/3-Application/Openclaw-source/src/agents/tools/web-shared.ts` | 40 |
| `postTrustedWebToolsJson` | Function | `AI/3-Application/Openclaw-source/src/agents/tools/web-search-provider-common.ts` | 94 |
| `runFirecrawlSearch` | Function | `AI/3-Application/Openclaw-source/extensions/firecrawl/src/firecrawl-client.ts` | 183 |
| `runFirecrawlScrape` | Function | `AI/3-Application/Openclaw-source/extensions/firecrawl/src/firecrawl-client.ts` | 341 |
| `resolveFirecrawlSearchConfig` | Function | `AI/3-Application/Openclaw-source/extensions/firecrawl/src/config.ts` | 63 |
| `resolveFirecrawlApiKey` | Function | `AI/3-Application/Openclaw-source/extensions/firecrawl/src/config.ts` | 101 |
| `resolveFirecrawlBaseUrl` | Function | `AI/3-Application/Openclaw-source/extensions/firecrawl/src/config.ts` | 116 |
| `isInsidePath` | Function | `AI/3-Application/FrontAgent-app/packages/mcp-file/src/path-safety.ts` | 22 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Scripts | 91 calls |
| Ink | 25 calls |
| Agents | 24 calls |
| Security | 18 calls |
| Auto-reply | 17 calls |
| Gateway | 15 calls |
| Tavily | 10 calls |
| Plugins | 10 calls |

## How to Explore

1. `gitnexus_context({name: "normalizeSecretInput"})` — see callers and callees
2. `gitnexus_query({query: "tools"})` — find related execution flows
3. Read key files listed above for implementation details
