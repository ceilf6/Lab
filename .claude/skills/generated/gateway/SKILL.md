---
name: gateway
description: "Skill for the Gateway area of Wiki. 1131 symbols across 303 files."
---

# Gateway

1131 symbols | 303 files | Cohesion: 56%

## When to Use

- Working with code in `AI/`
- Understanding how waitForNodeStatus, runNodeHost, coerceNodeInvokePayload work
- Modifying gateway-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `AI/3-Application/Openclaw-source/apps/android/app/src/main/java/ai/openclaw/app/gateway/GatewaySession.kt` | refreshNodeCanvasCapability, handleConnectSuccess, handleMessage, handleResponse, handleEvent (+32) |
| `AI/3-Application/Openclaw-source/src/gateway/session-utils.ts` | truncateTitle, deriveSessionTitle, resolvePositiveNumber, resolveNonNegativeNumber, resolveEstimatedSessionCostUsd (+28) |
| `AI/3-Application/Openclaw-source/src/gateway/session-utils.fs.ts` | normalizeRole, extractPreviewText, isToolCall, extractMediaSummary, buildPreviewItems (+20) |
| `AI/3-Application/Openclaw-source/src/gateway/server-chat.ts` | resolveMergedAssistantText, add, peek, remove, createSessionMessageSubscriberRegistry (+19) |
| `AI/3-Application/Openclaw-source/src/gateway/call.ts` | ensureGatewaySupportsRequiredMethods, executeGatewayRequestWithScopes, resolveGatewayCallTimeout, callGatewayWithScopes, callGatewayScoped (+17) |
| `AI/3-Application/Openclaw-source/src/gateway/test-helpers.server.ts` | rpcReq, occupyPort, onceMessage, getFreePort, startGatewayServerWithRetries (+17) |
| `AI/3-Application/Openclaw-source/apps/android/app/src/main/java/ai/openclaw/app/gateway/GatewayDiscovery.kt` | startUnicastDiscovery, publish, refreshUnicast, keyName, recordsByName (+16) |
| `AI/3-Application/Openclaw-source/src/gateway/hooks.ts` | extractHookToken, normalizeHookHeaders, normalizeWakePayload, resolveHookChannel, resolveHookDeliver (+15) |
| `AI/3-Application/Openclaw-source/src/gateway/net.ts` | resolveGatewayListenHosts, normalizeIp, parseIpLiteral, parseRealIp, resolveForwardedClientIp (+15) |
| `AI/3-Application/Openclaw-source/src/gateway/client.ts` | GatewayClient, start, queueConnect, scheduleReconnect, request (+13) |

## Entry Points

Start here when exploring this area:

- **`waitForNodeStatus`** (Function) — `AI/3-Application/Openclaw-source/test/helpers/gateway-e2e-harness.ts:338`
- **`runNodeHost`** (Function) — `AI/3-Application/Openclaw-source/src/node-host/runner.ts:143`
- **`coerceNodeInvokePayload`** (Function) — `AI/3-Application/Openclaw-source/src/node-host/invoke.ts:564`
- **`connectGatewayClient`** (Function) — `AI/3-Application/Openclaw-source/src/gateway/test-helpers.e2e.ts:27`
- **`clampProbeTimeoutMs`** (Function) — `AI/3-Application/Openclaw-source/src/gateway/probe.ts:34`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `GatewayClient` | Class | `AI/3-Application/Openclaw-source/src/gateway/client.ts` | 130 |
| `DeviceIdentityStore` | Class | `AI/3-Application/Openclaw-source/apps/android/app/src/main/java/ai/openclaw/app/gateway/DeviceIdentityStore.kt` | 17 |
| `GatewayLockError` | Class | `AI/3-Application/Openclaw-source/src/infra/gateway-lock.ts` | 37 |
| `GatewaySession` | Class | `AI/3-Application/Openclaw-source/apps/android/app/src/main/java/ai/openclaw/app/gateway/GatewaySession.kt` | 81 |
| `DeviceAuthStore` | Class | `AI/3-Application/Openclaw-source/apps/android/app/src/main/java/ai/openclaw/app/gateway/DeviceAuthStore.kt` | 10 |
| `GatewaySecretRefUnavailableError` | Class | `AI/3-Application/Openclaw-source/src/gateway/credentials.ts` | 35 |
| `InvokeResult` | Class | `AI/3-Application/Openclaw-source/apps/android/app/src/main/java/ai/openclaw/app/gateway/GatewaySession.kt` | 104 |
| `ErrorShape` | Class | `AI/3-Application/Openclaw-source/apps/android/app/src/main/java/ai/openclaw/app/gateway/GatewaySession.kt` | 112 |
| `waitForNodeStatus` | Function | `AI/3-Application/Openclaw-source/test/helpers/gateway-e2e-harness.ts` | 338 |
| `runNodeHost` | Function | `AI/3-Application/Openclaw-source/src/node-host/runner.ts` | 143 |
| `coerceNodeInvokePayload` | Function | `AI/3-Application/Openclaw-source/src/node-host/invoke.ts` | 564 |
| `connectGatewayClient` | Function | `AI/3-Application/Openclaw-source/src/gateway/test-helpers.e2e.ts` | 27 |
| `clampProbeTimeoutMs` | Function | `AI/3-Application/Openclaw-source/src/gateway/probe.ts` | 34 |
| `probeGateway` | Function | `AI/3-Application/Openclaw-source/src/gateway/probe.ts` | 38 |
| `createOperatorApprovalsGatewayClient` | Function | `AI/3-Application/Openclaw-source/src/gateway/operator-approvals-client.ts` | 6 |
| `createHooksRequestHandler` | Function | `AI/3-Application/Openclaw-source/src/gateway/server-http.ts` | 370 |
| `buildHookReplayCacheKey` | Function | `AI/3-Application/Openclaw-source/src/gateway/server-http.ts` | 417 |
| `createHooksHandler` | Function | `AI/3-Application/Openclaw-source/src/gateway/server-http.test-harness.ts` | 183 |
| `extractHookToken` | Function | `AI/3-Application/Openclaw-source/src/gateway/hooks.ts` | 136 |
| `normalizeHookHeaders` | Function | `AI/3-Application/Openclaw-source/src/gateway/hooks.ts` | 175 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `StartGatewayServer → ApplyAgentDefaults` | cross_community | 6 |
| `StartGatewayServer → IsRecord` | cross_community | 6 |
| `StartGatewayServer → NormalizeConfigIssuePath` | cross_community | 6 |
| `StartGatewayServer → Trim` | cross_community | 5 |
| `StartGatewayServer → SanitizeTerminalText` | cross_community | 5 |
| `StartGatewayServer → ToLowerCase` | cross_community | 5 |
| `StartGatewayServer → IsValidProfileName` | cross_community | 5 |
| `AttachGatewayWsMessageHandler → ToLowerCase` | cross_community | 5 |
| `AttachGatewayWsMessageHandler → IsIpv4Address` | cross_community | 5 |
| `AttachGatewayWsMessageHandler → IsIpv6Address` | cross_community | 5 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Scripts | 188 calls |
| Infra | 90 calls |
| Agents | 53 calls |
| Auto-reply | 46 calls |
| Plugins | 41 calls |
| Commands | 33 calls |
| Ink | 32 calls |
| Sessions | 26 calls |

## How to Explore

1. `gitnexus_context({name: "waitForNodeStatus"})` — see callers and callees
2. `gitnexus_query({query: "gateway"})` — find related execution flows
3. Read key files listed above for implementation details
