# Wiki Asset And Topic Index

This file gives OpenViking a text-first index for visual assets and topic directories that are otherwise hard to retrieve from binary files or sparse folder names.

## React Flow Diagrams

- `.flows/react_beginWork_flow.drawio`: React Fiber `beginWork` execution flow and reconciliation entry path.
- `.flows/react_completeWork_flow.drawio`: React Fiber `completeWork` execution flow.
- `.flows/react_scheduler_flow.drawio`: React Scheduler task scheduling flow.
- `.flows/FiberNode_memoizedState_effect.drawio`: FiberNode `memoizedState` and effect relation diagram.

Related image assets:

- `.effect-pictures/react-render.png`: React render flow picture.
- `.effect-pictures/react-updateQueue.png`: React update queue picture.
- `.effect-pictures/MessageChannel.png`: MessageChannel / Scheduler timing picture.
- `.effect-pictures/ClassCompRender.png`: class component render flow.
- `.effect-pictures/react17pre-createElement.png`: React 17 pre-JSX-runtime createElement picture.
- `.effect-pictures/react17aft-JSXruntime.png`: React 17 automatic JSX runtime picture.

## Vue Assets

- `.effect-pictures/vue2-lifecycle.png`: Vue 2 lifecycle picture.
- `.effect-pictures/vue3-block.png`: Vue 3 block tree and patch flag related picture.
- `.effect-pictures/vue3-patchFlag.png`: Vue 3 patch flag picture.
- `.effect-pictures/vue3-hoisted.png`: Vue 3 static hoist picture.
- `.effect-pictures/vue3-cached.png`: Vue 3 render cache picture.
- `.effect-pictures/vue3-reactive=>proxy.png`: Vue 3 reactive to Proxy picture.
- `.effect-pictures/vue3-ref.png`: Vue 3 ref picture.
- `.effect-pictures/vue3-RenderTracked.png`: Vue 3 renderTracked hook picture.
- `.effect-pictures/vue3-RenderTriggered.png`: Vue 3 renderTriggered hook picture.

## CSS And HTML Topic Entrypoints

- `CSS/BFC/`: BFC examples and block formatting context experiments.
- `CSS/视觉格式化模型/`: visual formatting model, normal flow, float, positioning, and popup examples.
- `CSS/布局/`: layout examples.
- `CSS/box/`: CSS box and overflow examples.
- `CSS/compute/core.md`: CSS value computation notes.
- `CSS/inherit继承/core.md`: CSS inheritance notes.
- `CSS/choose/core.md`: selector notes.
- `HTML/文本元素/core.md`: text elements.
- `HTML/多媒体元素/core.md`: media elements.
- `HTML/容器元素/core.md`: container and semantic structure elements.
- `HTML/img/core.md`: image element notes.

## Browser And Runtime Topic Entrypoints

- `Browser/store/`: browser storage experiments including cookie, localStorage, sessionStorage, IndexedDB, FileAPI, WebSQL, and SharedStorage.
- `Browser/render/`: rendering and dropped-frame experiments.
- `Browser/Web-API/README.md`: browser API learning entry.
- `NodeJS/CMJ/`: CommonJS loader and module behavior experiments.
- `NodeJS/Libuv-source/README.md`: libuv source reading entry.

## AI And Agent Topic Entrypoints

- `AI/learn-2&3/`: proxy, prompt, skill, and session learning notes.
- `AI/3-Application/FrontAgent-app/`: FrontAgent implementation area for RAG, memory, planner, MCP, and CLI questions.
- `AI/3-Application/Openclaw-source/`: OpenClaw implementation area for gateway, plugins, UI, and agent runtime questions.
- `AI/3-Application/GitNexus-source/`: GitNexus implementation area for code graph and impact analysis questions.

## Retrieval Notes

- For “React beginWork flow diagram”, prefer `.flows/react_beginWork_flow.drawio`.
- For “CSS BFC example”, prefer `CSS/BFC/` first, then `CSS/视觉格式化模型/`.
- For “FrontAgent RAG implementation”, prefer `AI/3-Application/FrontAgent-app/` and GitNexus for symbol-level tracing.
