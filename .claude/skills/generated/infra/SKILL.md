---
name: infra
description: "Skill for the Infra area of Wiki. 1329 symbols across 355 files."
---

# Infra

1329 symbols | 355 files | Cohesion: 55%

## When to Use

- Working with code in `AI/`
- Understanding how runGatewayUpdate, step, runGitCheckoutOrFail work
- Modifying infra-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `AI/3-Application/Openclaw-source/src/infra/push-apns.ts` | resolveApnsRegistrationPath, normalizeNodeId, isValidNodeId, normalizeApnsToken, normalizeRelayHandle (+34) |
| `AI/3-Application/Openclaw-source/src/infra/boundary-path.ts` | createLexicalTraversalState, advanceCanonicalCursorForSegment, handleLexicalStatDisposition, resolveBoundaryPathLexicalAsync, resolveSymlinkHopPath (+33) |
| `AI/3-Application/Openclaw-source/src/infra/exec-wrapper-resolution.ts` | scanWrapperInvocation, unwrapNiceInvocation, unwrapNohupInvocation, unwrapDashOptionInvocation, unwrapStdbufInvocation (+29) |
| `AI/3-Application/Openclaw-source/src/infra/device-pairing.ts` | getPairedDeviceFromState, buildDeviceAuthToken, resolveApprovedDeviceScopeBaseline, scopesWithinApprovedDeviceBaseline, verifyDeviceToken (+23) |
| `AI/3-Application/Openclaw-source/src/infra/fs-safe.ts` | openVerifiedLocalFile, resolveOpenedFileRealPathForHandle, openWritableFileWithinRoot, appendFileWithinRoot, SafeOpenError (+18) |
| `AI/3-Application/Openclaw-source/src/infra/exec-approvals-analysis.ts` | shellEscapeSingleArg, rebuildShellCommandFromSource, buildSafeShellCommand, renderQuotedArgv, finalizeRebuiltShellCommand (+16) |
| `AI/3-Application/Openclaw-source/src/infra/state-migrations.ts` | runFileCopyPlans, migrateLegacyWhatsAppAuth, migrateLegacyTelegramPairingAllowFrom, runLegacyStateMigrations, isSurfaceGroupKey (+16) |
| `AI/3-Application/Openclaw-source/src/infra/exec-approvals.ts` | resolveExecApprovalsPath, resolveExecApprovalsSocketPath, coerceAllowlistEntries, normalizeExecApprovals, readExecApprovalsSnapshot (+13) |
| `AI/3-Application/Openclaw-source/src/infra/bonjour-discovery.ts` | decodeDnsSdEscapes, parseIntOrNull, parseTxtTokens, parseDnsSdBrowse, parseDnsSdResolve (+12) |
| `AI/3-Application/Openclaw-source/src/infra/exec-approvals-allowlist.ts` | pickExecAllowlistContext, evaluateExecAllowlist, evaluateShellAllowlist, normalizeSafeBins, resolveSafeBins (+12) |

## Entry Points

Start here when exploring this area:

- **`runGatewayUpdate`** (Function) — `AI/3-Application/Openclaw-source/src/infra/update-runner.ts:324`
- **`step`** (Function) — `AI/3-Application/Openclaw-source/src/infra/update-runner.ts:340`
- **`runGitCheckoutOrFail`** (Function) — `AI/3-Application/Openclaw-source/src/infra/update-runner.ts:400`
- **`createGlobalInstallEnv`** (Function) — `AI/3-Application/Openclaw-source/src/infra/update-global.ts:109`
- **`globalInstallArgs`** (Function) — `AI/3-Application/Openclaw-source/src/infra/update-global.ts:240`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `SafeOpenError` | Class | `AI/3-Application/Openclaw-source/src/infra/fs-safe.ts` | 28 |
| `RequestBodyLimitError` | Class | `AI/3-Application/Openclaw-source/src/infra/http-body.ts` | 33 |
| `LocalMediaAccessError` | Class | `AI/3-Application/Openclaw-source/extensions/whatsapp/src/media.ts` | 66 |
| `ArchiveSecurityError` | Class | `AI/3-Application/Openclaw-source/src/infra/archive-staging.ts` | 12 |
| `runGatewayUpdate` | Function | `AI/3-Application/Openclaw-source/src/infra/update-runner.ts` | 324 |
| `step` | Function | `AI/3-Application/Openclaw-source/src/infra/update-runner.ts` | 340 |
| `runGitCheckoutOrFail` | Function | `AI/3-Application/Openclaw-source/src/infra/update-runner.ts` | 400 |
| `createGlobalInstallEnv` | Function | `AI/3-Application/Openclaw-source/src/infra/update-global.ts` | 109 |
| `globalInstallArgs` | Function | `AI/3-Application/Openclaw-source/src/infra/update-global.ts` | 240 |
| `globalInstallFallbackArgs` | Function | `AI/3-Application/Openclaw-source/src/infra/update-global.ts` | 250 |
| `trimLogTail` | Function | `AI/3-Application/Openclaw-source/src/infra/restart-sentinel.ts` | 136 |
| `normalizePackageTagInput` | Function | `AI/3-Application/Openclaw-source/src/infra/package-tag.ts` | 0 |
| `maybeOfferUpdateBeforeDoctor` | Function | `AI/3-Application/Openclaw-source/src/commands/doctor-update.ts` | 26 |
| `runUpdateStep` | Function | `AI/3-Application/Openclaw-source/src/cli/update-cli/shared.ts` | 144 |
| `normalizeApnsEnvironment` | Function | `AI/3-Application/Openclaw-source/src/infra/push-apns.ts` | 391 |
| `registerApnsRegistration` | Function | `AI/3-Application/Openclaw-source/src/infra/push-apns.ts` | 402 |
| `registerApnsToken` | Function | `AI/3-Application/Openclaw-source/src/infra/push-apns.ts` | 475 |
| `clearApnsRegistration` | Function | `AI/3-Application/Openclaw-source/src/infra/push-apns.ts` | 500 |
| `clearApnsRegistrationIfCurrent` | Function | `AI/3-Application/Openclaw-source/src/infra/push-apns.ts` | 541 |
| `normalizeMessageChannel` | Function | `AI/3-Application/Openclaw-source/src/utils/message-channel.ts` | 67 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `LoadConfig → Normalize` | cross_community | 10 |
| `LoadConfig → ResolveRawOsHomeDir` | cross_community | 10 |
| `LoadConfig → Cwd` | cross_community | 8 |
| `RunCli → Normalize` | cross_community | 7 |
| `Setup → StatSync` | cross_community | 6 |
| `OnEvent → NormalizeSystemText` | cross_community | 6 |
| `AttachGatewayWsMessageHandler → IsIpv4Address` | cross_community | 5 |
| `AttachGatewayWsMessageHandler → IsIpv6Address` | cross_community | 5 |
| `MonitorWebChannel → MkdirSync` | cross_community | 5 |
| `HandlePluginsCommand → NormalizeChannelKey` | cross_community | 5 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Scripts | 302 calls |
| Auto-reply | 56 calls |
| Plugins | 56 calls |
| Ink | 41 calls |
| Gateway | 31 calls |
| Commands | 28 calls |
| Agents | 26 calls |
| Security | 20 calls |

## How to Explore

1. `gitnexus_context({name: "runGatewayUpdate"})` — see callers and callees
2. `gitnexus_query({query: "infra"})` — find related execution flows
3. Read key files listed above for implementation details
