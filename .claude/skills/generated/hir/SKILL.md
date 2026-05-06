---
name: hir
description: "Skill for the HIR area of Wiki. 507 symbols across 110 files."
---

# HIR

507 symbols | 110 files | Cohesion: 71%

## When to Use

- Working with code in `React/`
- Understanding how getRuleForCategory, nameAnonymousFunctions, assertExhaustive work
- Modifying hir-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `React/React-source/compiler/packages/babel-plugin-react-compiler/src/HIR/HIR.ts` | isStatementBlockKind, isExpressionBlockKind, convertHoistedLValueKind, validateIdentifierName, promoteTemporary (+30) |
| `React/React-source/compiler/packages/babel-plugin-react-compiler/src/Inference/InferMutationAliasingEffects.ts` | inferMutationAliasingEffects, findHoistedContextDeclarations, visit, cacheApplySignature, internEffect (+27) |
| `React/React-source/compiler/packages/babel-plugin-react-compiler/src/HIR/HIRBuilder.ts` | build, switch, loop, resolveBlockTarget, removeUnreachableForUpdates (+25) |
| `React/React-source/compiler/packages/babel-plugin-react-compiler/src/HIR/BuildHIR.ts` | handleMaybeDependency, lower, lowerStatement, lowerObjectPropertyKey, lowerExpression (+22) |
| `React/React-source/compiler/packages/babel-plugin-react-compiler/src/HIR/PropagateScopeDependenciesHIR.ts` | propagateScopeDependenciesHIR, collectTemporariesSidemap, #checkValidDependency, handleInstruction, collectTemporariesSidemapImpl (+15) |
| `React/React-source/compiler/packages/babel-plugin-react-compiler/src/Validation/ValidateNoRefAccessInRender.ts` | makeRefId, nextRefId, lookup, define, get (+14) |
| `React/React-source/compiler/packages/babel-plugin-react-compiler/src/ReactiveScopes/CodegenReactiveFunction.ts` | codegenFunction, codegenReactiveFunction, Context, wrapCacheDep, codegenInstructionNullable (+14) |
| `React/React-source/compiler/packages/babel-plugin-react-compiler/src/HIR/PrintHIR.ts` | printFunction, printHIR, printMixedHIR, printInstruction, printPhi (+14) |
| `React/React-source/compiler/packages/babel-plugin-react-compiler/src/HIR/CollectHoistablePropertyLoads.ts` | getOrCreateIdentifier, getOrCreateProperty, getMaybeNonNullInInstruction, isImmutableAtInstr, collectNonNullsInBlocks (+10) |
| `React/React-source/compiler/packages/babel-plugin-react-compiler/src/CompilerError.ts` | CompilerDiagnostic, create, withDetails, CompilerError, invariant (+9) |

## Entry Points

Start here when exploring this area:

- **`getRuleForCategory`** (Function) — `React/React-source/compiler/packages/babel-plugin-react-compiler/src/CompilerError.ts:781`
- **`nameAnonymousFunctions`** (Function) — `React/React-source/compiler/packages/babel-plugin-react-compiler/src/Transform/NameAnonymousFunctions.ts:14`
- **`assertExhaustive`** (Function) — `React/React-source/compiler/packages/babel-plugin-react-compiler/src/Utils/utils.ts:28`
- **`retainWhere`** (Function) — `React/React-source/compiler/packages/babel-plugin-react-compiler/src/Utils/utils.ts:33`
- **`getOrInsertWith`** (Function) — `React/React-source/compiler/packages/babel-plugin-react-compiler/src/Utils/utils.ts:58`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `CompilerDiagnostic` | Class | `React/React-source/compiler/packages/babel-plugin-react-compiler/src/CompilerError.ts` | 121 |
| `CompilerError` | Class | `React/React-source/compiler/packages/babel-plugin-react-compiler/src/CompilerError.ts` | 301 |
| `DisjointSet` | Class | `React/React-source/compiler/packages/babel-plugin-react-compiler/src/Utils/DisjointSet.ts` | 11 |
| `ReactiveScopeDependencyTreeHIR` | Class | `React/React-source/compiler/packages/babel-plugin-react-compiler/src/HIR/DeriveMinimalDependenciesHIR.ts` | 22 |
| `HIRBuilder` | Class | `React/React-source/compiler/packages/babel-plugin-react-compiler/src/HIR/HIRBuilder.ts` | 103 |
| `FlowTypeEnv` | Class | `React/React-source/compiler/packages/babel-plugin-react-compiler/src/Flood/Types.ts` | 694 |
| `DependencyCollectionContext` | Class | `React/React-source/compiler/packages/babel-plugin-react-compiler/src/HIR/PropagateScopeDependenciesHIR.ts` | 399 |
| `ScopeBlockTraversal` | Class | `React/React-source/compiler/packages/babel-plugin-react-compiler/src/HIR/visitors.ts` | 1237 |
| `getRuleForCategory` | Function | `React/React-source/compiler/packages/babel-plugin-react-compiler/src/CompilerError.ts` | 781 |
| `nameAnonymousFunctions` | Function | `React/React-source/compiler/packages/babel-plugin-react-compiler/src/Transform/NameAnonymousFunctions.ts` | 14 |
| `assertExhaustive` | Function | `React/React-source/compiler/packages/babel-plugin-react-compiler/src/Utils/utils.ts` | 28 |
| `retainWhere` | Function | `React/React-source/compiler/packages/babel-plugin-react-compiler/src/Utils/utils.ts` | 33 |
| `getOrInsertWith` | Function | `React/React-source/compiler/packages/babel-plugin-react-compiler/src/Utils/utils.ts` | 58 |
| `Iterable_some` | Function | `React/React-source/compiler/packages/babel-plugin-react-compiler/src/Utils/utils.ts` | 138 |
| `Ok` | Function | `React/React-source/compiler/packages/babel-plugin-react-compiler/src/Utils/Result.ts` | 87 |
| `Err` | Function | `React/React-source/compiler/packages/babel-plugin-react-compiler/src/Utils/Result.ts` | 165 |
| `isHookDeclaration` | Function | `React/React-source/compiler/packages/babel-plugin-react-compiler/src/Utils/HookDeclaration.ts` | 13 |
| `isComponentDeclaration` | Function | `React/React-source/compiler/packages/babel-plugin-react-compiler/src/Utils/ComponentDeclaration.ts` | 13 |
| `inferTypes` | Function | `React/React-source/compiler/packages/babel-plugin-react-compiler/src/TypeInference/InferTypes.ts` | 65 |
| `validateUseMemo` | Function | `React/React-source/compiler/packages/babel-plugin-react-compiler/src/Validation/ValidateUseMemo.ts` | 24 |

## Connected Areas

| Area | Connections |
|------|-------------|
| ReactiveScopes | 53 calls |
| Transform | 17 calls |
| Validation | 16 calls |
| Ink | 11 calls |
| Inference | 8 calls |
| Entrypoint | 8 calls |
| Optimization | 5 calls |
| Scripts | 4 calls |

## How to Explore

1. `gitnexus_context({name: "getRuleForCategory"})` — see callers and callees
2. `gitnexus_query({query: "hir"})` — find related execution flows
3. Read key files listed above for implementation details
