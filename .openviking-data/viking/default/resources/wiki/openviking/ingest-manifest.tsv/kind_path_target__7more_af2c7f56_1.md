# kind	path	target	reason



# kind:



# file   Add one tracked file.



# dir    Add one directory recursively. Use only for small, curated directories.



# glob   Expand a shell glob and add each matching file.



# exclude Mark a path prefix that must not be ingested by this default profile.



# # target is a viking:// URI prefix or exact URI. Use "-" to let OpenViking choose.

file	README.md	viking://resources/wiki/root/README.md	Root pointer graph and high-signal learning index.
file	AGENTS.md	viking://resources/wiki/root/AGENTS.md	Repository agent policy, GitNexus workflow, and OpenViking exploration rules.
file	CLAUDE.md	viking://resources/wiki/root/CLAUDE.md	Claude-oriented repository code intelligence instructions.
file	docs/WORKSPACE_MAP.md	viking://resources/wiki/docs/WORKSPACE_MAP.md	Human-maintained workspace map and top-level directory intent.
file	docs/_README.md	viking://resources/wiki/docs/_README.md	English playground quick start and module overview.
file	docs/_README-CN.md	viking://resources/wiki/docs/_README-CN.md	Chinese playground quick start and module overview.
file	docs/JS.md	viking://resources/wiki/docs/JS.md	JavaScript documentation pointer.
file	docs/antd-mobile.md	viking://resources/wiki/docs/antd-mobile.md	Ant Design Mobile notes.
file	docs/luca-reply-analysis.md	viking://resources/wiki/docs/luca-reply-analysis.md	Agent memory explanation and response analysis.
file	docs/openviking/README.md	viking://resources/wiki/openviking/README.md	OpenViking setup, ingestion, MCP, and usage rules for this repository.
file	docs/openviking/benchmark-questions.md	viking://resources/wiki/openviking/benchmark-questions.md	Manual benchmark questions for retrieval quality checks.
file	docs/openviking/ingest-manifest.tsv	viking://resources/wiki/openviking/ingest-manifest.tsv	Default OpenViking ingestion allowlist and exclude policy.
file	docs/openviking/navigation-l1.md	viking://resources/wiki/openviking/navigation-l1.md	L1 navigation document for large source and research areas.
file	docs/openviking/asset-index.md	viking://resources/wiki/openviking/asset-index.md	Flow diagram, image asset, and topic entry index for retrieval.
file	docs/openviking/frontagent-l1.md	viking://resources/wiki/openviking/frontagent-l1.md	Focused L1 navigation for FrontAgent RAG, memory, MCP, planner, and context management.

file	AI/learn-2&3/README.md	viking://resources/wiki/ai/learn-2-3/README.md	AI agent learning notes root.
file	AI/learn-2&3/GLOBAL-AGENTS.md	viking://resources/wiki/ai/learn-2-3/GLOBAL-AGENTS.md	Global prompt and agent policy notes.
file	AI/learn-2&3/REP-AGENTS.md	viking://resources/wiki/ai/learn-2-3/REP-AGENTS.md	Repository-level prompt and agent policy notes.
file	AI/learn-2&3/_proxy-server/README.md	viking://resources/wiki/ai/learn-2-3/proxy-server/README.md	Proxy server setup for agent experiments.
file	AI/learn-2&3/skill/README.md	viking://resources/wiki/ai/learn-2-3/skill/README.md	Skill experiment notes.

file	CSS/choose/core.md	viking://resources/wiki/css/choose/core.md	Core CSS selector notes.
file	CSS/compute/core.md	viking://resources/wiki/css/compute/core.md	Core CSS computed value notes.
file	CSS/inherit继承/core.md	viking://resources/wiki/css/inherit/core.md	Core CSS inheritance notes.
file	HTML/HTML实体/core.md	viking://resources/wiki/html/entities/core.md	Core HTML entity notes.
file	HTML/img/core.md	viking://resources/wiki/html/img/core.md	Core HTML image element notes.
file	HTML/列表元素/core.md	viking://resources/wiki/html/list/core.md	Core HTML list element notes.
file	HTML/多媒体元素/core.md	viking://resources/wiki/html/media/core.md	Core HTML media element notes.
file	HTML/容器元素/core.md	viking://resources/wiki/html/container/core.md	Core HTML container element notes.
file	HTML/文本元素/core.md	viking://resources/wiki/html/text/core.md	Core HTML text element notes.
file	Browser/Web-API/README.md	viking://resources/wiki/browser/Web-API/README.md	Browser Web API notes entry.
file	Browser/store/cookie/README.md	viking://resources/wiki/browser/store/cookie/README.md	Cookie storage notes entry.
file	NodeJS/Libuv-source/README.md	viking://resources/wiki/nodejs/libuv-source/README.md	Libuv source reading entry without full source ingestion.
file	Obsidion/README.md	viking://resources/wiki/obsidion/README.md	Obsidian notes entry.
file	React/Ahooks-source/README.md	viking://resources/wiki/react/ahooks-source/README.md	Ahooks source reading entry.
file	React/React-source/README.md	viking://resources/wiki/react/react-source/README.md	React source reading entry without full source ingestion.
file	React/sandboxs/README.md	viking://resources/wiki/react/sandboxs/README.md	React sandbox entry.
file	React/source-analyse/README.md	viking://resources/wiki/react/source-analyse/README.md	React source analysis entry.
file	TS/ex-ts-vite-react/README.md	viking://resources/wiki/ts/ex-ts-vite-react/README.md	TypeScript Vite React example entry.
file	Vue2/Vue2-source/README.md	viking://resources/wiki/vue2/vue2-source/README.md	Vue2 source reading entry without full source ingestion.
file	Vue2/sandboxs/README.md	viking://resources/wiki/vue2/sandboxs/README.md	Vue2 sandbox entry.
file	Vue3/Pinia-source/README.md	viking://resources/wiki/vue3/pinia-source/README.md	Pinia source reading entry.
file	Vue3/Vue3-source/README.md	viking://resources/wiki/vue3/vue3-source/README.md	Vue3 source reading entry without full source ingestion.
file	sandboxs-runner/sandboxs/wordMCP/README.md	viking://resources/wiki/sandboxs-runner/wordMCP/README.md	Word MCP sandbox entry.
dir	.effect-pictures	viking://resources/wiki/effect-pictures	Technical explanation images used by notes.
dir	.flows	viking://resources/wiki/flows	Draw.io flow diagrams for React/Fiber and related studies.

exclude	.git	-	Git internals.
exclude	node_modules	-	Dependency directories.
exclude	dist	-	Build output.
exclude	.gitnexus	-	GitNexus local index data.
exclude	.frontagent/runs	-	FrontAgent runtime logs.
exclude	.frontagent/rag-cache	-	Generated RAG cache.
exclude	.openviking-data	-	OpenViking local database.
exclude	.openviking-local	-	Private OpenViking config.
exclude	sandboxs-runner/node_modules	-	Dependency directory.
exclude	Browser/Chromium-source	-	Huge upstream source mirror; ingest only topic subdirs manually.
exclude	NodeJS/Node-source	-	Huge upstream source mirror; ingest only topic subdirs manually.
exclude	JS/V8engine-source	-	Huge upstream source mirror; ingest only topic subdirs manually.
exclude	AI/2-AI-infra/LLM-SDK/Langchain-source	-	Huge upstream source mirror; ingest only topic subdirs manually.