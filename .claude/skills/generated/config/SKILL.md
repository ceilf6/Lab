---
name: config
description: "Skill for the Config area of Wiki. 501 symbols across 143 files."
---

# Config

501 symbols | 143 files | Cohesion: 60%

## When to Use

- Working with code in `AI/`
- Understanding how shouldEnableShellEnvFallback, shouldDeferShellEnvFallback, compareOpenClawVersions work
- Modifying config-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `AI/3-Application/Openclaw-source/src/config/io.ts` | warnIfConfigFromFuture, maybeLoadDotEnvForConfig, resolveConfigIncludesForRead, loadConfig, readConfigFileSnapshotInternal (+31) |
| `AI/3-Application/Openclaw-source/src/config/redact-snapshot.ts` | isSensitivePath, isExplicitlyNonSensitivePath, restoreRedactedValues, RedactionError, restoreOriginalValueOrThrow (+20) |
| `AI/3-Application/Openclaw-source/src/config/plugin-auto-enable.ts` | resolvePluginIdForChannel, collectCandidateChannelIds, resolveConfiguredPlugins, isPluginExplicitlyDisabled, isPluginDenied (+18) |
| `AI/3-Application/Openclaw-source/src/config/schema.ts` | cloneSchema, asSchemaObject, isObjectSchema, mergeObjectSchema, applyPluginSchemas (+18) |
| `AI/3-Application/Openclaw-source/src/config/doc-baseline.ts` | logConfigDocBaselineDebug, loadBundledConfigSchemaResponse, loadChannelSurfaceMetadata, buildConfigDocBaseline, renderConfigDocBaselineStatefile (+17) |
| `AI/3-Application/Openclaw-source/src/config/group-policy.ts` | normalizeSenderKey, normalizeTypedSenderKey, normalizeLegacySenderKey, normalizeCandidate, normalizeSenderIdCandidates (+12) |
| `AI/3-Application/Openclaw-source/src/config/validation.ts` | validateConfigObject, validateConfigObjectWithPlugins, validateConfigObjectRawWithPlugins, validateConfigObjectWithPluginsBase, ensureCompatConfig (+11) |
| `AI/3-Application/Openclaw-source/src/config/includes.ts` | readConfigIncludeFileWithGuards, ConfigIncludeError, CircularIncludeError, loadFile, resolvePath (+11) |
| `AI/3-Application/Openclaw-source/src/config/talk.ts` | isPlainObject, normalizeString, normalizeVoiceAliases, normalizeTalkSecretInput, normalizeTalkProviderConfig (+9) |
| `AI/3-Application/Openclaw-source/src/config/paths.ts` | envHomedir, legacyStateDirs, resolveStateDir, resolveUserPath, resolveCanonicalConfigPath (+8) |

## Entry Points

Start here when exploring this area:

- **`shouldEnableShellEnvFallback`** (Function) — `AI/3-Application/Openclaw-source/src/infra/shell-env.ts:190`
- **`shouldDeferShellEnvFallback`** (Function) — `AI/3-Application/Openclaw-source/src/infra/shell-env.ts:194`
- **`compareOpenClawVersions`** (Function) — `AI/3-Application/Openclaw-source/src/config/version.ts:26`
- **`validateConfigObject`** (Function) — `AI/3-Application/Openclaw-source/src/config/validation.ts:281`
- **`normalizeConfigPaths`** (Function) — `AI/3-Application/Openclaw-source/src/config/normalize-paths.ts:62`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `ConfigIncludeError` | Class | `AI/3-Application/Openclaw-source/src/config/includes.ts` | 46 |
| `CircularIncludeError` | Class | `AI/3-Application/Openclaw-source/src/config/includes.ts` | 57 |
| `ConfigRuntimeRefreshError` | Class | `AI/3-Application/Openclaw-source/src/config/io.ts` | 152 |
| `MissingEnvVarError` | Class | `AI/3-Application/Openclaw-source/src/config/env-substitution.ts` | 28 |
| `shouldEnableShellEnvFallback` | Function | `AI/3-Application/Openclaw-source/src/infra/shell-env.ts` | 190 |
| `shouldDeferShellEnvFallback` | Function | `AI/3-Application/Openclaw-source/src/infra/shell-env.ts` | 194 |
| `compareOpenClawVersions` | Function | `AI/3-Application/Openclaw-source/src/config/version.ts` | 26 |
| `validateConfigObject` | Function | `AI/3-Application/Openclaw-source/src/config/validation.ts` | 281 |
| `normalizeConfigPaths` | Function | `AI/3-Application/Openclaw-source/src/config/normalize-paths.ts` | 62 |
| `normalizeExecSafeBinProfilesInConfig` | Function | `AI/3-Application/Openclaw-source/src/config/normalize-exec-safe-bin.ts` | 4 |
| `normalizeExec` | Function | `AI/3-Application/Openclaw-source/src/config/normalize-exec-safe-bin.ts` | 5 |
| `loadConfig` | Function | `AI/3-Application/Openclaw-source/src/config/io.ts` | 733 |
| `readConfigFileSnapshotInternal` | Function | `AI/3-Application/Openclaw-source/src/config/io.ts` | 884 |
| `readConfigIncludeFileWithGuards` | Function | `AI/3-Application/Openclaw-source/src/config/includes.ts` | 288 |
| `applyMessageDefaults` | Function | `AI/3-Application/Openclaw-source/src/config/defaults.ts` | 130 |
| `applyTalkConfigNormalization` | Function | `AI/3-Application/Openclaw-source/src/config/defaults.ts` | 208 |
| `applyModelDefaults` | Function | `AI/3-Application/Openclaw-source/src/config/defaults.ts` | 212 |
| `applyAgentDefaults` | Function | `AI/3-Application/Openclaw-source/src/config/defaults.ts` | 348 |
| `applyLoggingDefaults` | Function | `AI/3-Application/Openclaw-source/src/config/defaults.ts` | 389 |
| `applyCompactionDefaults` | Function | `AI/3-Application/Openclaw-source/src/config/defaults.ts` | 508 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `LoadConfig → Normalize` | cross_community | 10 |
| `LoadConfig → ResolveRawOsHomeDir` | cross_community | 10 |
| `LoadConfig → Cwd` | cross_community | 8 |
| `MonitorMattermostProvider → IsRecord` | cross_community | 8 |
| `MonitorMattermostProvider → Trim` | cross_community | 8 |
| `MonitorDiscordProvider → Trim` | cross_community | 7 |
| `MonitorDiscordProvider → FormatSecretRefLabel` | cross_community | 7 |
| `StartGatewayServer → ApplyAgentDefaults` | cross_community | 6 |
| `StartGatewayServer → IsRecord` | cross_community | 6 |
| `StartGatewayServer → NormalizeConfigIssuePath` | cross_community | 6 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Scripts | 93 calls |
| Plugins | 32 calls |
| Commands | 18 calls |
| Auto-reply | 14 calls |
| Reply | 13 calls |
| Monitor | 13 calls |
| Infra | 12 calls |
| Agents | 12 calls |

## How to Explore

1. `gitnexus_context({name: "shouldEnableShellEnvFallback"})` — see callers and callees
2. `gitnexus_query({query: "config"})` — find related execution flows
3. Read key files listed above for implementation details
