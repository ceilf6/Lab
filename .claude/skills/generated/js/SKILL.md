---
name: js
description: "Skill for the Js area of Wiki. 398 symbols across 45 files."
---

# Js

398 symbols | 45 files | Cohesion: 63%

## When to Use

- Working with code in `sandboxs-runner/`
- Understanding how extractPropsFromVNodeData, installCompatInstanceProperties, createBuffer work
- Modifying js-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `sandboxs-runner/sandboxs/vue-observe/demo1/js/vue.js` | isUndef, isDef, isTrue, isRegExp, isPromise (+318) |
| `sandboxs-runner/sandboxs/shopping-cart/js/index.js` | getTotalChooseNumber, hasGoodsInCar, isCrossDeliveryThreshold, constructor, createHTML (+6) |
| `Vue3/Vue3-source/packages/server-renderer/src/render.ts` | createBuffer, getBuffer, renderComponentVNode, renderComponentSubTree, renderVNode (+2) |
| `Vue3/Vue3-source/packages/runtime-core/src/compat/instance.ts` | installCompatInstanceProperties, $once, $destroy |
| `Vue3/Vue3-source/packages/server-renderer/src/helpers/ssrVModelHelpers.ts` | ssrLooseContain, ssrRenderDynamicModel, ssrGetDynamicModelProps |
| `Vue3/Vue3-source/packages/runtime-core/src/rendererTemplateRef.ts` | setRef, canSetRef, doSet |
| `Vue3/Vue3-source/packages/runtime-test/src/nodeOps.ts` | createElement, createText, createComment |
| `Vue2/Vue2-source/src/core/vdom/helpers/extract-props.ts` | extractPropsFromVNodeData, checkProp |
| `Vue3/Vue3-source/packages/runtime-core/src/warning.ts` | pushWarningContext, popWarningContext |
| `Vue3/Vue3-source/packages/runtime-core/src/renderer.ts` | updateComponent, cloneNode |

## Entry Points

Start here when exploring this area:

- **`extractPropsFromVNodeData`** (Function) — `Vue2/Vue2-source/src/core/vdom/helpers/extract-props.ts:11`
- **`installCompatInstanceProperties`** (Function) — `Vue3/Vue3-source/packages/runtime-core/src/compat/instance.ts:64`
- **`createBuffer`** (Function) — `Vue3/Vue3-source/packages/server-renderer/src/render.ts:65`
- **`renderComponentVNode`** (Function) — `Vue3/Vue3-source/packages/server-renderer/src/render.ts:90`
- **`renderVNode`** (Function) — `Vue3/Vue3-source/packages/server-renderer/src/render.ts:222`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `extractPropsFromVNodeData` | Function | `Vue2/Vue2-source/src/core/vdom/helpers/extract-props.ts` | 11 |
| `installCompatInstanceProperties` | Function | `Vue3/Vue3-source/packages/runtime-core/src/compat/instance.ts` | 64 |
| `createBuffer` | Function | `Vue3/Vue3-source/packages/server-renderer/src/render.ts` | 65 |
| `renderComponentVNode` | Function | `Vue3/Vue3-source/packages/server-renderer/src/render.ts` | 90 |
| `renderVNode` | Function | `Vue3/Vue3-source/packages/server-renderer/src/render.ts` | 222 |
| `pushWarningContext` | Function | `Vue3/Vue3-source/packages/runtime-core/src/warning.ts` | 24 |
| `popWarningContext` | Function | `Vue3/Vue3-source/packages/runtime-core/src/warning.ts` | 28 |
| `ssrRenderTeleport` | Function | `Vue3/Vue3-source/packages/server-renderer/src/helpers/ssrRenderTeleport.ts` | 8 |
| `setAttribute` | Function | `AI/3-Application/Claude-Code-source/src/ink/dom.ts` | 246 |
| `setSrcObject` | Function | `React/React-source/packages/react-dom-bindings/src/client/ReactDOMSrcObject.js` | 9 |
| `completeBoundaryWithStyles` | Function | `React/React-source/packages/react-dom-bindings/src/server/fizz-instruction-set/ReactDOMFizzInstructionSetShared.js` | 450 |
| `getRandomJoke` | Function | `Vue3/Pinia-source/packages/playground/src/api/jokes.ts` | 15 |
| `fetchJoke` | Function | `Vue3/Pinia-source/packages/playground/src/stores/jokes.ts` | 31 |
| `toReadonly` | Function | `Vue3/Vue3-source/packages/reactivity/src/reactive.ts` | 439 |
| `renderList` | Function | `Vue3/Vue3-source/packages/runtime-core/src/helpers/renderList.ts` | 16 |
| `ssrLooseContain` | Function | `Vue3/Vue3-source/packages/server-renderer/src/helpers/ssrVModelHelpers.ts` | 5 |
| `ssrRenderDynamicModel` | Function | `Vue3/Vue3-source/packages/server-renderer/src/helpers/ssrVModelHelpers.ts` | 10 |
| `ssrGetDynamicModelProps` | Function | `Vue3/Vue3-source/packages/server-renderer/src/helpers/ssrVModelHelpers.ts` | 29 |
| `useGdpBar` | Function | `Vue3/composition-API/src/composition/useBar.js` | 6 |
| `addSubscription` | Function | `Vue3/Pinia-source/packages/pinia/src/subscriptions.ts` | 5 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Scripts | 18 calls |
| Compat | 9 calls |
| V3 | 8 calls |
| Auto-reply | 7 calls |
| Get | 3 calls |
| Dts-test | 3 calls |
| Cluster_571 | 3 calls |
| Validate | 2 calls |

## How to Explore

1. `gitnexus_context({name: "extractPropsFromVNodeData"})` — see callers and callees
2. `gitnexus_query({query: "js"})` — find related execution flows
3. Read key files listed above for implementation details
