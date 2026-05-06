---
name: agents
description: "Skill for the Agents area of Wiki. 1919 symbols across 567 files."
---

# Agents

1919 symbols | 567 files | Cohesion: 60%

## When to Use

- Working with code in `AI/`
- Understanding how resolveMessageChannel, applyModelOverrideToSessionEntry, clearInternalHooks work
- Modifying agents-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `AI/3-Application/Openclaw-source/src/agents/subagent-registry.ts` | getSubagentRunByChildSessionKey, resolveAnnounceRetryDelayMs, logAnnounceGiveUp, persistSubagentRuns, suppressAnnounceForSteerRestart (+55) |
| `AI/3-Application/Openclaw-source/src/agents/tool-display-common.ts` | stripOuterQuotes, splitShellWords, binaryName, positionalArgs, firstPositional (+29) |
| `AI/3-Application/Openclaw-source/src/agents/subagent-announce.ts` | buildSubagentSystemPrompt, loadSubagentRegistryRuntime, buildCompactAnnounceStatsLine, loadSessionEntryByKey, hasUsableSessionEntry (+26) |
| `AI/3-Application/Openclaw-source/src/agents/bash-tools.test.ts` | readTextContent, readNormalizedTextContent, readTrimmedLines, readBackgroundLogSnapshot, runLongLogExpectationCase (+24) |
| `AI/3-Application/Openclaw-source/src/agents/model-selection.ts` | normalizeAliasKey, modelKey, legacyModelKey, parseModelRef, resolveAllowlistModelKey (+19) |
| `AI/3-Application/Openclaw-source/src/agents/models-config.providers.ts` | normalizeApiKeyConfig, normalizeProviderModels, normalizeGoogleProvider, normalizeAntigravityProvider, normalizeProviders (+17) |
| `AI/3-Application/Openclaw-source/src/agents/model-fallback.ts` | createModelCandidateCollector, addCandidate, addExplicitCandidate, addAllowlistedCandidate, resolveImageFallbackCandidates (+15) |
| `AI/3-Application/Openclaw-source/src/agents/cli-credentials.ts` | resolveClaudeCliCredentialsPath, parseClaudeCliOauthCredential, readClaudeCliKeychainCredentials, readClaudeCliCredentials, readClaudeCliCredentialsCached (+14) |
| `AI/3-Application/Openclaw-source/src/agents/model-auth.ts` | getApiKeyForModel, requireApiKey, hasUsableCustomProviderApiKey, resolveEnvApiKey, resolveModelAuthMode (+13) |
| `AI/3-Application/Openclaw-source/src/agents/subagent-control.ts` | resolveSessionEntryForKey, ensureControllerOwnsRun, killSubagentRun, cascadeKillChildren, killAllControlledSubagentRuns (+12) |

## Entry Points

Start here when exploring this area:

- **`resolveMessageChannel`** (Function) — `AI/3-Application/Openclaw-source/src/utils/message-channel.ts:156`
- **`applyModelOverrideToSessionEntry`** (Function) — `AI/3-Application/Openclaw-source/src/sessions/model-overrides.ts:8`
- **`clearInternalHooks`** (Function) — `AI/3-Application/Openclaw-source/src/hooks/internal-hooks.ts:246`
- **`resolveSessionModelRef`** (Function) — `AI/3-Application/Openclaw-source/src/gateway/session-utils.ts:910`
- **`startGatewaySidecars`** (Function) — `AI/3-Application/Openclaw-source/src/gateway/server-startup.ts:33`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `OpenAIWebSocketManager` | Class | `AI/3-Application/Openclaw-source/src/agents/openai-ws-connection.ts` | 297 |
| `FailoverError` | Class | `AI/3-Application/Openclaw-source/src/agents/failover-error.ts` | 10 |
| `BaseSingleActionAgent` | Class | `AI/2-AI-infra/LLM-SDK/Langchain-source/libs/langchain/langchain_classic/agents/agent.py` | 54 |
| `Agent` | Class | `AI/2-AI-infra/LLM-SDK/Langchain-source/libs/langchain/langchain_classic/agents/agent.py` | 703 |
| `ReActDocstoreAgent` | Class | `AI/2-AI-infra/LLM-SDK/Langchain-source/libs/langchain/langchain_classic/agents/react/base.py` | 35 |
| `resolveMessageChannel` | Function | `AI/3-Application/Openclaw-source/src/utils/message-channel.ts` | 156 |
| `applyModelOverrideToSessionEntry` | Function | `AI/3-Application/Openclaw-source/src/sessions/model-overrides.ts` | 8 |
| `clearInternalHooks` | Function | `AI/3-Application/Openclaw-source/src/hooks/internal-hooks.ts` | 246 |
| `resolveSessionModelRef` | Function | `AI/3-Application/Openclaw-source/src/gateway/session-utils.ts` | 910 |
| `startGatewaySidecars` | Function | `AI/3-Application/Openclaw-source/src/gateway/server-startup.ts` | 33 |
| `collectConfiguredModelPricingRefs` | Function | `AI/3-Application/Openclaw-source/src/gateway/model-pricing-cache.ts` | 246 |
| `__setGatewayModelPricingForTest` | Function | `AI/3-Application/Openclaw-source/src/gateway/model-pricing-cache.ts` | 461 |
| `resolveAgentModelPrimaryValue` | Function | `AI/3-Application/Openclaw-source/src/config/model-input.ts` | 7 |
| `resolveAgentModelFallbackValues` | Function | `AI/3-Application/Openclaw-source/src/config/model-input.ts` | 19 |
| `toAgentModelListLike` | Function | `AI/3-Application/Openclaw-source/src/config/model-input.ts` | 26 |
| `promptDefaultModel` | Function | `AI/3-Application/Openclaw-source/src/commands/model-picker.ts` | 182 |
| `promptModelAllowlist` | Function | `AI/3-Application/Openclaw-source/src/commands/model-picker.ts` | 424 |
| `modelKey` | Function | `AI/3-Application/Openclaw-source/src/agents/model-selection.ts` | 43 |
| `legacyModelKey` | Function | `AI/3-Application/Openclaw-source/src/agents/model-selection.ts` | 57 |
| `parseModelRef` | Function | `AI/3-Application/Openclaw-source/src/agents/model-selection.ts` | 142 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `DispatchPreparedSlackMessage → Trim` | cross_community | 6 |
| `DispatchPreparedSlackMessage → StripNullBytes` | cross_community | 6 |
| `DispatchPreparedSlackMessage → NormalizeAvatarValue` | cross_community | 5 |
| `HandlePluginsCommand → Max` | cross_community | 5 |
| `ProcessMessage → NormalizeChatType` | cross_community | 4 |
| `DispatchPreparedSlackMessage → IsAvatarHttpUrl` | cross_community | 4 |
| `DispatchPreparedSlackMessage → IsAvatarDataUrl` | cross_community | 4 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Scripts | 380 calls |
| Plugins | 97 calls |
| Auto-reply | 92 calls |
| Ink | 76 calls |
| Infra | 67 calls |
| Reply | 55 calls |
| Gateway | 46 calls |
| Commands | 39 calls |

## How to Explore

1. `gitnexus_context({name: "resolveMessageChannel"})` — see callers and callees
2. `gitnexus_query({query: "agents"})` — find related execution flows
3. Read key files listed above for implementation details
