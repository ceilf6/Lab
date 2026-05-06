---
name: commands
description: "Skill for the Commands area of Wiki. 786 symbols across 272 files."
---

# Commands

786 symbols | 272 files | Cohesion: 53%

## When to Use

- Working with code in `AI/`
- Understanding how getActivePluginRegistryKey, runProviderPluginAuthMethod, applyAuthChoiceLoadedPluginProvider work
- Modifying commands-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `AI/3-Application/Openclaw-source/src/commands/doctor-config-flow.ts` | scanLegacyToolsBySenderKeys, maybeRepairLegacyToolsBySenderKeys, loadAndMaybeMigrateDoctorConfig, scanList, resolveUserId (+26) |
| `AI/3-Application/Openclaw-source/src/commands/onboard-channels.ts` | formatAccountLabel, promptRemovalAccountId, setupChannels, resolveWorkspaceDir, getVisibleChannelPlugin (+20) |
| `AI/3-Application/Openclaw-source/src/commands/onboard-custom.ts` | isAzureFoundryUrl, isAzureOpenAiUrl, isAzureUrl, transformAzureConfigUrl, resolveVerificationEndpoint (+17) |
| `AI/3-Application/Openclaw-source/src/commands/doctor-state-integrity.ts` | existsFile, ensureDir, dirPermissionHint, countJsonlLines, formatLinuxSdBackedStateDirWarning (+16) |
| `AI/3-Application/Openclaw-source/src/commands/onboard-helpers.ts` | ensureWorkspaceAndSessions, moveToTrash, handleReset, probeGatewayReachable, waitForGatewayReachable (+13) |
| `AI/3-Application/Openclaw-source/src/commands/doctor-legacy-config.ts` | normalizeCompatibilityConfigValues, isRecord, normalizeDmAliases, allowFromEqual, normalizeProvider (+11) |
| `AI/3-Application/Openclaw-source/src/commands/health.ts` | debugHealth, formatDurationParts, resolveHeartbeatSummary, resolveAgentOrder, buildSessionSummary (+10) |
| `AI/3-Application/Openclaw-source/src/commands/agent.acp.test.ts` | withTempHome, createAcpEnabledConfig, mockConfig, mockConfigWithAcpOverrides, writeAcpSessionStore (+9) |
| `AI/3-Application/Openclaw-source/src/commands/onboard-search.ts` | sortSearchProviderOptions, resolveSearchProviderOptions, resolveSearchProviderEntry, hasKeyInEnv, rawKeyValue (+8) |
| `AI/3-Application/Openclaw-source/src/commands/agent.test.ts` | withTempHome, mockConfig, runWithDefaultAgentConfig, runEmbeddedWithTempConfig, writeSessionStoreSeed (+7) |

## Entry Points

Start here when exploring this area:

- **`getActivePluginRegistryKey`** (Function) — `AI/3-Application/Openclaw-source/src/plugins/runtime.ts:93`
- **`runProviderPluginAuthMethod`** (Function) — `AI/3-Application/Openclaw-source/src/plugins/provider-auth-choice.ts:83`
- **`applyAuthChoiceLoadedPluginProvider`** (Function) — `AI/3-Application/Openclaw-source/src/plugins/provider-auth-choice.ts:158`
- **`applyAuthChoicePluginProvider`** (Function) — `AI/3-Application/Openclaw-source/src/plugins/provider-auth-choice.ts:218`
- **`applyDefaultModel`** (Function) — `AI/3-Application/Openclaw-source/src/plugins/provider-auth-choice-helpers.ts:60`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `CustomApiError` | Class | `AI/3-Application/Openclaw-source/src/commands/onboard-custom.ts` | 143 |
| `getActivePluginRegistryKey` | Function | `AI/3-Application/Openclaw-source/src/plugins/runtime.ts` | 93 |
| `runProviderPluginAuthMethod` | Function | `AI/3-Application/Openclaw-source/src/plugins/provider-auth-choice.ts` | 83 |
| `applyAuthChoiceLoadedPluginProvider` | Function | `AI/3-Application/Openclaw-source/src/plugins/provider-auth-choice.ts` | 158 |
| `applyAuthChoicePluginProvider` | Function | `AI/3-Application/Openclaw-source/src/plugins/provider-auth-choice.ts` | 218 |
| `applyDefaultModel` | Function | `AI/3-Application/Openclaw-source/src/plugins/provider-auth-choice-helpers.ts` | 60 |
| `registerPluginCliCommands` | Function | `AI/3-Application/Openclaw-source/src/plugins/cli.ts` | 10 |
| `generateSlugViaLLM` | Function | `AI/3-Application/Openclaw-source/src/hooks/llm-slug-generator.ts` | 24 |
| `resolveAssistantIdentity` | Function | `AI/3-Application/Openclaw-source/src/gateway/assistant-identity.ts` | 80 |
| `listGatewayAgentsBasic` | Function | `AI/3-Application/Openclaw-source/src/gateway/agent-list.ts` | 49 |
| `isHeartbeatEnabledForAgent` | Function | `AI/3-Application/Openclaw-source/src/infra/heartbeat-summary.ts` | 30 |
| `resolveHeartbeatIntervalMs` | Function | `AI/3-Application/Openclaw-source/src/infra/heartbeat-summary.ts` | 42 |
| `resolveHeartbeatSummaryForAgent` | Function | `AI/3-Application/Openclaw-source/src/infra/heartbeat-summary.ts` | 71 |
| `runHeartbeatOnce` | Function | `AI/3-Application/Openclaw-source/src/infra/heartbeat-runner.ts` | 522 |
| `getAgentLocalStatuses` | Function | `AI/3-Application/Openclaw-source/src/commands/status.agent-local.ts` | 35 |
| `setupInternalHooks` | Function | `AI/3-Application/Openclaw-source/src/commands/onboard-hooks.ts` | 7 |
| `ensureWorkspaceAndSessions` | Function | `AI/3-Application/Openclaw-source/src/commands/onboard-helpers.ts` | 288 |
| `moveToTrash` | Function | `AI/3-Application/Openclaw-source/src/commands/onboard-helpers.ts` | 314 |
| `handleReset` | Function | `AI/3-Application/Openclaw-source/src/commands/onboard-helpers.ts` | 331 |
| `findAgentEntryIndex` | Function | `AI/3-Application/Openclaw-source/src/commands/agents.config.ts` | 37 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `StartGatewayServer → ApplyAgentDefaults` | cross_community | 6 |
| `StartGatewayServer → IsRecord` | cross_community | 6 |
| `StartGatewayServer → NormalizeConfigIssuePath` | cross_community | 6 |
| `DispatchPreparedSlackMessage → ListAgentEntries` | cross_community | 6 |
| `DispatchPreparedSlackMessage → Trim` | cross_community | 6 |
| `DispatchPreparedSlackMessage → StripNullBytes` | cross_community | 6 |
| `StartGatewayServer → Trim` | cross_community | 5 |
| `StartGatewayServer → SanitizeTerminalText` | cross_community | 5 |
| `DispatchPreparedSlackMessage → NormalizeAvatarValue` | cross_community | 5 |
| `HandlePluginsCommand → NormalizeChannelKey` | cross_community | 5 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Scripts | 225 calls |
| Plugins | 75 calls |
| Infra | 75 calls |
| Cli | 64 calls |
| Agents | 62 calls |
| Daemon | 62 calls |
| Config | 42 calls |
| Gateway | 40 calls |

## How to Explore

1. `gitnexus_context({name: "getActivePluginRegistryKey"})` — see callers and callees
2. `gitnexus_query({query: "commands"})` — find related execution flows
3. Read key files listed above for implementation details
