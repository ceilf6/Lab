# Open Memory Gateway Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `open-memory-gateway`, a public GitHub-hosted TypeScript monorepo that provides a local Markdown + SQLite long-term memory store with CLI, MCP stdio server, and a small Next.js management UI, then add it to Wiki as a submodule under `AI/2-AI-infra/open-memory-gateway`.

**Architecture:** The new repository is a pnpm workspace. `packages/core` owns the memory schema, Markdown truth source, SQLite rebuildable index, and state transitions. `packages/cli`, `packages/mcp-server`, and `apps/web` call core rather than duplicating memory logic.

**Tech Stack:** TypeScript, Node.js, pnpm workspaces, Vitest, tsup, Zod, gray-matter, better-sqlite3, Commander, official MCP TypeScript SDK, Next.js App Router.

---

## Confirmed Decisions

- GitHub repository: `https://github.com/ceilf6/open-memory-gateway`
- Visibility: public
- Local implementation checkout: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway`
- Wiki repository: `/Users/ceilf6/Desktop/myrepos/Wiki`
- Final submodule path: `/Users/ceilf6/Desktop/myrepos/Wiki/AI/2-AI-infra/open-memory-gateway`
- Markdown granularity: one memory per `.md` file
- Web UI: Next.js App Router
- SQLite driver: `better-sqlite3`
- MCP transport for MVP: stdio only
- HTTP API: only the internal Next.js route handlers needed by the Web UI

## Reference Links

- MCP TypeScript server guide: https://modelcontextprotocol.io/docs/develop/build-server
- MCP TypeScript SDK repository: https://github.com/modelcontextprotocol/typescript-sdk
- Next.js Route Handlers: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- Next.js Forms with Server Actions: https://nextjs.org/docs/app/guides/forms

## File Structure

Create these files in `/Users/ceilf6/Desktop/myrepos/open-memory-gateway`:

```text
.gitignore
README.md
package.json
pnpm-workspace.yaml
tsconfig.base.json
vitest.config.ts
packages/core/package.json
packages/core/src/errors.ts
packages/core/src/hash.ts
packages/core/src/ids.ts
packages/core/src/index.ts
packages/core/src/markdown-store.ts
packages/core/src/memory-service.ts
packages/core/src/paths.ts
packages/core/src/schema.ts
packages/core/src/sqlite-index.ts
packages/core/test/markdown-store.test.ts
packages/core/test/memory-service.test.ts
packages/core/test/schema.test.ts
packages/core/test/sqlite-index.test.ts
packages/cli/package.json
packages/cli/src/index.ts
packages/cli/test/cli.test.ts
packages/mcp-server/package.json
packages/mcp-server/src/index.ts
packages/mcp-server/test/tools.test.ts
packages/adapters/package.json
packages/adapters/src/index.ts
apps/web/package.json
apps/web/next.config.mjs
apps/web/tsconfig.json
apps/web/app/actions.ts
apps/web/app/globals.css
apps/web/app/inbox/page.tsx
apps/web/app/layout.tsx
apps/web/app/memories/[id]/page.tsx
apps/web/app/memories/page.tsx
apps/web/lib/memory.ts
docs/architecture.md
docs/mcp-tools.md
docs/feishu-adapter-notes.md
```

Modify these files in `/Users/ceilf6/Desktop/myrepos/Wiki` only after the new repository has a pushed `main` commit:

```text
.gitmodules
AI/2-AI-infra/open-memory-gateway
```

## Task 1: Bootstrap Repository And Workspace

**Files:**
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/.gitignore`
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/README.md`
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/package.json`
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/pnpm-workspace.yaml`
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/tsconfig.base.json`
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/vitest.config.ts`

- [ ] **Step 1: Clone the empty GitHub repository**

```bash
test ! -e /Users/ceilf6/Desktop/myrepos/open-memory-gateway
gh repo clone ceilf6/open-memory-gateway /Users/ceilf6/Desktop/myrepos/open-memory-gateway
cd /Users/ceilf6/Desktop/myrepos/open-memory-gateway
git switch -c main
```

Expected: clone succeeds. If `test ! -e` fails, stop and inspect the existing path before continuing.

- [ ] **Step 2: Create root workspace files**

Create `.gitignore`:

```gitignore
node_modules
dist
.next
coverage
memory/.index
*.sqlite
*.sqlite-shm
*.sqlite-wal
.DS_Store
```

Create `pnpm-workspace.yaml`:

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

Create `package.json`:

```json
{
  "name": "open-memory-gateway",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "description": "A gateway for editing and syncing long-term memory for agents.",
  "scripts": {
    "build": "pnpm --filter @open-memory-gateway/core build && pnpm --filter @open-memory-gateway/adapters build && pnpm --filter @open-memory-gateway/cli build && pnpm --filter @open-memory-gateway/mcp-server build && pnpm --filter @open-memory-gateway/web build",
    "dev:web": "pnpm --filter @open-memory-gateway/web dev",
    "test": "vitest run --passWithNoTests",
    "typecheck": "pnpm -r typecheck",
    "lint": "pnpm -r lint"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "tsx": "^4.20.0",
    "tsup": "^8.3.0",
    "typescript": "^5.6.0",
    "vitest": "^2.1.0"
  },
  "packageManager": "pnpm@9.12.0"
}
```

Create `tsconfig.base.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "noUncheckedIndexedAccess": true,
    "declaration": true,
    "sourceMap": true,
    "baseUrl": ".",
    "paths": {
      "@open-memory-gateway/core": ["packages/core/src/index.ts"]
    }
  }
}
```

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "node",
    include: ["packages/**/test/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@open-memory-gateway/core": path.resolve(__dirname, "packages/core/src/index.ts"),
    },
  },
});
```

Create `README.md`:

```md
# Open Memory Gateway

Open Memory Gateway is a local-first long-term memory gateway for agents.

It provides:

- Markdown files as the durable source of truth.
- A rebuildable SQLite index for search, status filtering, and duplicate hints.
- A CLI for local workflows.
- An MCP stdio server for agent integration.
- A small Next.js UI for inbox review and memory editing.

## Repository Shape

```text
apps/web
packages/core
packages/cli
packages/mcp-server
packages/adapters
docs
```

## MVP Storage Model

Each memory is one Markdown file with frontmatter metadata. SQLite is an index and can be rebuilt from Markdown at any time.
```

- [ ] **Step 3: Install root dependencies**

```bash
cd /Users/ceilf6/Desktop/myrepos/open-memory-gateway
pnpm install
```

Expected: `pnpm-lock.yaml` is created and install exits with code 0.

- [ ] **Step 4: Run the empty test command**

```bash
cd /Users/ceilf6/Desktop/myrepos/open-memory-gateway
pnpm test
```

Expected: Vitest exits successfully with no test files because the root `test` script includes `--passWithNoTests`.

- [ ] **Step 5: Commit bootstrap**

```bash
cd /Users/ceilf6/Desktop/myrepos/open-memory-gateway
git status --short
git add .gitignore README.md package.json pnpm-workspace.yaml pnpm-lock.yaml tsconfig.base.json vitest.config.ts
git commit -m "chore: bootstrap workspace"
```

Expected: commit succeeds and contains only root workspace files.

## Task 2: Core Schema, IDs, Hashing, And Errors

**Files:**
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/packages/core/package.json`
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/packages/core/src/schema.ts`
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/packages/core/src/ids.ts`
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/packages/core/src/hash.ts`
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/packages/core/src/errors.ts`
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/packages/core/src/index.ts`
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/packages/core/test/schema.test.ts`

- [ ] **Step 1: Add the core package manifest**

Create `packages/core/package.json`:

```json
{
  "name": "@open-memory-gateway/core",
  "version": "0.1.0",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    }
  },
  "scripts": {
    "build": "tsup src/index.ts --format esm --dts --clean",
    "lint": "tsc --noEmit -p tsconfig.json",
    "typecheck": "tsc --noEmit -p tsconfig.json",
    "test": "vitest run test"
  },
  "dependencies": {
    "better-sqlite3": "^11.5.0",
    "gray-matter": "^4.0.3",
    "zod": "^3.25.0"
  },
  "devDependencies": {
    "@types/better-sqlite3": "^7.6.11"
  }
}
```

Create `packages/core/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.base.json",
  "include": ["src/**/*.ts", "test/**/*.ts"]
}
```

- [ ] **Step 2: Write failing schema tests**

Create `packages/core/test/schema.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { MemoryFrontmatterSchema, normalizeTags } from "../src/schema";

describe("MemoryFrontmatterSchema", () => {
  it("accepts a valid active memory", () => {
    const parsed = MemoryFrontmatterSchema.parse({
      id: "mem_20260520_abc123",
      status: "active",
      scope: "personal",
      source: "manual",
      tags: ["preference", "work"],
      createdAt: "2026-05-20T10:00:00+08:00",
      updatedAt: "2026-05-20T10:05:00+08:00",
    });

    expect(parsed.status).toBe("active");
  });

  it("rejects unsupported statuses", () => {
    expect(() =>
      MemoryFrontmatterSchema.parse({
        id: "mem_bad",
        status: "pending",
        scope: "personal",
        source: "manual",
        tags: [],
        createdAt: "2026-05-20T10:00:00+08:00",
        updatedAt: "2026-05-20T10:00:00+08:00",
      }),
    ).toThrow();
  });

  it("normalizes tag casing, spacing, and duplicates", () => {
    expect(normalizeTags([" Work ", "work", "Preference"])).toEqual(["work", "preference"]);
  });
});
```

- [ ] **Step 3: Run the failing schema tests**

```bash
cd /Users/ceilf6/Desktop/myrepos/open-memory-gateway
pnpm test -- packages/core/test/schema.test.ts
```

Expected: FAIL because `../src/schema` does not exist.

- [ ] **Step 4: Implement schema, IDs, hash, and errors**

Create `packages/core/src/schema.ts`:

```ts
import { z } from "zod";

export const MemoryStatusSchema = z.enum(["draft", "active", "archived", "rejected"]);
export type MemoryStatus = z.infer<typeof MemoryStatusSchema>;

export const MemoryFrontmatterSchema = z.object({
  id: z.string().regex(/^mem_[0-9]{8}_[a-z0-9]+$/),
  status: MemoryStatusSchema,
  scope: z.string().min(1).default("personal"),
  source: z.string().min(1).default("manual"),
  tags: z.array(z.string()).default([]),
  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }),
});

export type MemoryFrontmatter = z.infer<typeof MemoryFrontmatterSchema>;

export const MemoryRecordSchema = z.object({
  frontmatter: MemoryFrontmatterSchema,
  content: z.string().min(1),
  path: z.string().optional(),
  contentHash: z.string().optional(),
  possibleDuplicate: z.boolean().optional(),
});

export type MemoryRecord = z.infer<typeof MemoryRecordSchema>;

export interface CaptureMemoryInput {
  content: string;
  source?: string;
  tags?: string[];
  scope?: string;
}

export interface UpdateMemoryInput {
  content?: string;
  status?: MemoryStatus;
  source?: string;
  tags?: string[];
  scope?: string;
}

export function normalizeTags(tags: string[] = []): string[] {
  return [...new Set(tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean))].sort();
}
```

Create `packages/core/src/ids.ts`:

```ts
import { randomBytes } from "node:crypto";

export function createMemoryId(now = new Date()): string {
  const yyyymmdd = now.toISOString().slice(0, 10).replaceAll("-", "");
  const suffix = randomBytes(4).toString("hex");
  return `mem_${yyyymmdd}_${suffix}`;
}
```

Create `packages/core/src/hash.ts`:

```ts
import { createHash } from "node:crypto";

export function normalizeContentForHash(content: string): string {
  return content.trim().replace(/\s+/g, " ");
}

export function hashMemoryContent(content: string): string {
  return createHash("sha256").update(normalizeContentForHash(content)).digest("hex");
}
```

Create `packages/core/src/errors.ts`:

```ts
export class MemoryError extends Error {
  constructor(
    message: string,
    readonly code: string,
  ) {
    super(message);
    this.name = "MemoryError";
  }
}

export class MemoryNotFoundError extends MemoryError {
  constructor(id: string) {
    super(`Memory not found: ${id}`, "MEMORY_NOT_FOUND");
  }
}

export class InvalidMemoryTransitionError extends MemoryError {
  constructor(from: string, to: string) {
    super(`Invalid memory status transition: ${from} -> ${to}`, "INVALID_MEMORY_TRANSITION");
  }
}
```

Create `packages/core/src/index.ts`:

```ts
export * from "./errors";
export * from "./hash";
export * from "./ids";
export * from "./schema";
```

- [ ] **Step 5: Run schema tests**

```bash
cd /Users/ceilf6/Desktop/myrepos/open-memory-gateway
pnpm test -- packages/core/test/schema.test.ts
```

Expected: PASS.

- [ ] **Step 6: Commit core schema**

```bash
cd /Users/ceilf6/Desktop/myrepos/open-memory-gateway
git add packages/core
git commit -m "feat: add memory schema"
```

Expected: commit succeeds and includes only `packages/core` files from this task.

## Task 3: Markdown Store

**Files:**
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/packages/core/src/paths.ts`
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/packages/core/src/markdown-store.ts`
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/packages/core/test/markdown-store.test.ts`
- Modify: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/packages/core/src/index.ts`

- [ ] **Step 1: Write failing Markdown store tests**

Create `packages/core/test/markdown-store.test.ts`:

```ts
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { MarkdownMemoryStore } from "../src/markdown-store";

let root: string;

beforeEach(async () => {
  root = await mkdtemp(path.join(tmpdir(), "omg-markdown-"));
});

afterEach(async () => {
  await rm(root, { recursive: true, force: true });
});

describe("MarkdownMemoryStore", () => {
  it("writes and reads one draft memory file", async () => {
    const store = new MarkdownMemoryStore({ rootDir: root });
    const record = await store.write({
      frontmatter: {
        id: "mem_20260520_abc123",
        status: "draft",
        scope: "personal",
        source: "manual",
        tags: ["work"],
        createdAt: "2026-05-20T10:00:00+08:00",
        updatedAt: "2026-05-20T10:00:00+08:00",
      },
      content: "Remember that I prefer concise implementation plans.",
    });

    expect(record.path).toContain("memory/inbox/mem_20260520_abc123.md");

    const loaded = await store.read("mem_20260520_abc123");
    expect(loaded.content).toBe("Remember that I prefer concise implementation plans.");
    expect(loaded.frontmatter.status).toBe("draft");
  });

  it("moves active memories into memory/active", async () => {
    const store = new MarkdownMemoryStore({ rootDir: root });
    await store.write({
      frontmatter: {
        id: "mem_20260520_def456",
        status: "active",
        scope: "personal",
        source: "manual",
        tags: [],
        createdAt: "2026-05-20T10:00:00+08:00",
        updatedAt: "2026-05-20T10:00:00+08:00",
      },
      content: "Ship Markdown as the source of truth.",
    });

    const loaded = await store.read("mem_20260520_def456");
    expect(loaded.path).toContain("memory/active/mem_20260520_def456.md");
  });
});
```

- [ ] **Step 2: Run failing Markdown tests**

```bash
cd /Users/ceilf6/Desktop/myrepos/open-memory-gateway
pnpm test -- packages/core/test/markdown-store.test.ts
```

Expected: FAIL because `../src/markdown-store` does not exist.

- [ ] **Step 3: Implement paths and Markdown store**

Create `packages/core/src/paths.ts`:

```ts
import path from "node:path";
import type { MemoryStatus } from "./schema";

export interface MemoryPaths {
  rootDir: string;
}

export function memoryBaseDir(rootDir: string): string {
  return path.join(rootDir, "memory");
}

export function statusDirName(status: MemoryStatus): string {
  if (status === "active") return "active";
  if (status === "archived") return "archived";
  return "inbox";
}

export function memoryFilePath(rootDir: string, status: MemoryStatus, id: string): string {
  return path.join(memoryBaseDir(rootDir), statusDirName(status), `${id}.md`);
}

export function memoryIndexPath(rootDir: string): string {
  return path.join(memoryBaseDir(rootDir), ".index", "memory.sqlite");
}
```

Create `packages/core/src/markdown-store.ts`:

```ts
import { mkdir, readdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { hashMemoryContent } from "./hash";
import { memoryBaseDir, memoryFilePath, statusDirName } from "./paths";
import { MemoryFrontmatterSchema, type MemoryRecord, type MemoryStatus } from "./schema";

export interface MarkdownMemoryStoreOptions {
  rootDir: string;
}

export class MarkdownMemoryStore {
  constructor(private readonly options: MarkdownMemoryStoreOptions) {}

  async write(record: MemoryRecord): Promise<MemoryRecord> {
    const parsedFrontmatter = MemoryFrontmatterSchema.parse(record.frontmatter);
    const filePath = memoryFilePath(this.options.rootDir, parsedFrontmatter.status, parsedFrontmatter.id);
    await mkdir(path.dirname(filePath), { recursive: true });

    const previous = await this.findPath(parsedFrontmatter.id);
    if (previous && previous !== filePath) {
      await rm(previous, { force: true });
    }

    const file = matter.stringify(record.content.trim() + "\n", parsedFrontmatter);
    await writeFile(filePath, file, "utf8");
    return {
      frontmatter: parsedFrontmatter,
      content: record.content.trim(),
      path: filePath,
      contentHash: hashMemoryContent(record.content),
      possibleDuplicate: record.possibleDuplicate,
    };
  }

  async read(id: string): Promise<MemoryRecord> {
    const filePath = await this.findPath(id);
    if (!filePath) {
      throw new Error(`Memory not found: ${id}`);
    }

    const raw = await readFile(filePath, "utf8");
    const parsed = matter(raw);
    const frontmatter = MemoryFrontmatterSchema.parse(parsed.data);
    return {
      frontmatter,
      content: parsed.content.trim(),
      path: filePath,
      contentHash: hashMemoryContent(parsed.content),
    };
  }

  async list(status?: MemoryStatus): Promise<MemoryRecord[]> {
    const statuses: MemoryStatus[] = status ? [status] : ["draft", "active", "archived", "rejected"];
    const records: MemoryRecord[] = [];

    for (const currentStatus of statuses) {
      const dir = path.join(memoryBaseDir(this.options.rootDir), statusDirName(currentStatus));
      const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);
      for (const entry of entries) {
        if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
        const id = entry.name.slice(0, -3);
        const record = await this.read(id);
        if (record.frontmatter.status === currentStatus) {
          records.push(record);
        }
      }
    }

    return records.sort((a, b) => b.frontmatter.updatedAt.localeCompare(a.frontmatter.updatedAt));
  }

  private async findPath(id: string): Promise<string | undefined> {
    const dirs = ["inbox", "active", "archived"];
    for (const dir of dirs) {
      const filePath = path.join(memoryBaseDir(this.options.rootDir), dir, `${id}.md`);
      try {
        await readFile(filePath, "utf8");
        return filePath;
      } catch {
        continue;
      }
    }
    return undefined;
  }
}
```

Modify `packages/core/src/index.ts`:

```ts
export * from "./errors";
export * from "./hash";
export * from "./ids";
export * from "./markdown-store";
export * from "./paths";
export * from "./schema";
```

- [ ] **Step 4: Run Markdown store tests**

```bash
cd /Users/ceilf6/Desktop/myrepos/open-memory-gateway
pnpm test -- packages/core/test/markdown-store.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit Markdown store**

```bash
cd /Users/ceilf6/Desktop/myrepos/open-memory-gateway
git add packages/core/src packages/core/test
git commit -m "feat: add markdown memory store"
```

Expected: commit succeeds.

## Task 4: SQLite Index

**Files:**
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/packages/core/src/sqlite-index.ts`
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/packages/core/test/sqlite-index.test.ts`
- Modify: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/packages/core/src/index.ts`

- [ ] **Step 1: Write failing SQLite index tests**

Create `packages/core/test/sqlite-index.test.ts`:

```ts
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { SQLiteMemoryIndex } from "../src/sqlite-index";

let root: string;

beforeEach(async () => {
  root = await mkdtemp(path.join(tmpdir(), "omg-sqlite-"));
});

afterEach(async () => {
  await rm(root, { recursive: true, force: true });
});

describe("SQLiteMemoryIndex", () => {
  it("indexes and searches memory records", () => {
    const index = new SQLiteMemoryIndex({ rootDir: root });
    index.upsert({
      frontmatter: {
        id: "mem_20260520_abc123",
        status: "active",
        scope: "personal",
        source: "manual",
        tags: ["work"],
        createdAt: "2026-05-20T10:00:00+08:00",
        updatedAt: "2026-05-20T10:00:00+08:00",
      },
      content: "I prefer concise implementation plans.",
      path: "/tmp/mem.md",
      contentHash: "hash1",
    });

    const results = index.search("concise");
    expect(results).toHaveLength(1);
    expect(results[0]?.id).toBe("mem_20260520_abc123");
  });

  it("marks possible duplicates by content hash", () => {
    const index = new SQLiteMemoryIndex({ rootDir: root });
    expect(index.hasContentHash("hash1")).toBe(false);
    index.upsert({
      frontmatter: {
        id: "mem_20260520_abc123",
        status: "draft",
        scope: "personal",
        source: "manual",
        tags: [],
        createdAt: "2026-05-20T10:00:00+08:00",
        updatedAt: "2026-05-20T10:00:00+08:00",
      },
      content: "duplicate text",
      path: "/tmp/mem.md",
      contentHash: "hash1",
    });
    expect(index.hasContentHash("hash1")).toBe(true);
  });
});
```

- [ ] **Step 2: Run failing SQLite tests**

```bash
cd /Users/ceilf6/Desktop/myrepos/open-memory-gateway
pnpm test -- packages/core/test/sqlite-index.test.ts
```

Expected: FAIL because `../src/sqlite-index` does not exist.

- [ ] **Step 3: Implement SQLite index**

Create `packages/core/src/sqlite-index.ts`:

```ts
import { mkdirSync } from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import { memoryIndexPath } from "./paths";
import type { MemoryRecord, MemoryStatus } from "./schema";

export interface SQLiteMemoryIndexOptions {
  rootDir: string;
}

export interface IndexedMemoryRow {
  id: string;
  status: MemoryStatus;
  scope: string;
  source: string;
  tags: string[];
  contentHash: string;
  possibleDuplicate: boolean;
  createdAt: string;
  updatedAt: string;
  path: string;
  searchText: string;
}

type RawMemoryRow = Omit<IndexedMemoryRow, "tags" | "possibleDuplicate"> & {
  tags: string;
  possibleDuplicate: 0 | 1;
};

export class SQLiteMemoryIndex {
  private readonly db: Database.Database;

  constructor(options: SQLiteMemoryIndexOptions) {
    const sqlitePath = memoryIndexPath(options.rootDir);
    mkdirSync(path.dirname(sqlitePath), { recursive: true });
    this.db = new Database(sqlitePath);
    this.db.pragma("journal_mode = WAL");
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS memories (
        id TEXT PRIMARY KEY,
        status TEXT NOT NULL,
        scope TEXT NOT NULL,
        source TEXT NOT NULL,
        tags TEXT NOT NULL,
        content_hash TEXT NOT NULL,
        possible_duplicate INTEGER NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        path TEXT NOT NULL,
        search_text TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_memories_status ON memories(status);
      CREATE INDEX IF NOT EXISTS idx_memories_content_hash ON memories(content_hash);
    `);
  }

  upsert(record: MemoryRecord): IndexedMemoryRow {
    if (!record.path || !record.contentHash) {
      throw new Error("Indexed memory records require path and contentHash");
    }

    const row: IndexedMemoryRow = {
      id: record.frontmatter.id,
      status: record.frontmatter.status,
      scope: record.frontmatter.scope,
      source: record.frontmatter.source,
      tags: record.frontmatter.tags,
      contentHash: record.contentHash,
      possibleDuplicate: Boolean(record.possibleDuplicate),
      createdAt: record.frontmatter.createdAt,
      updatedAt: record.frontmatter.updatedAt,
      path: record.path,
      searchText: `${record.content}\n${record.frontmatter.tags.join(" ")}`,
    };

    this.db
      .prepare(`
        INSERT INTO memories (
          id, status, scope, source, tags, content_hash, possible_duplicate,
          created_at, updated_at, path, search_text
        )
        VALUES (
          @id, @status, @scope, @source, @tags, @contentHash, @possibleDuplicate,
          @createdAt, @updatedAt, @path, @searchText
        )
        ON CONFLICT(id) DO UPDATE SET
          status = excluded.status,
          scope = excluded.scope,
          source = excluded.source,
          tags = excluded.tags,
          content_hash = excluded.content_hash,
          possible_duplicate = excluded.possible_duplicate,
          created_at = excluded.created_at,
          updated_at = excluded.updated_at,
          path = excluded.path,
          search_text = excluded.search_text
      `)
      .run({ ...row, tags: JSON.stringify(row.tags), possibleDuplicate: row.possibleDuplicate ? 1 : 0 });

    return row;
  }

  list(status?: MemoryStatus): IndexedMemoryRow[] {
    const stmt = status
      ? this.db.prepare("SELECT * FROM memories WHERE status = ? ORDER BY updated_at DESC")
      : this.db.prepare("SELECT * FROM memories ORDER BY updated_at DESC");
    const rows = status ? stmt.all(status) : stmt.all();
    return rows.map((row) => this.mapRow(row as RawMemoryRow));
  }

  search(query: string, status?: MemoryStatus): IndexedMemoryRow[] {
    const normalized = `%${query.trim().toLowerCase()}%`;
    const stmt = status
      ? this.db.prepare(
          "SELECT * FROM memories WHERE status = ? AND lower(search_text) LIKE ? ORDER BY updated_at DESC",
        )
      : this.db.prepare("SELECT * FROM memories WHERE lower(search_text) LIKE ? ORDER BY updated_at DESC");
    const rows = status ? stmt.all(status, normalized) : stmt.all(normalized);
    return rows.map((row) => this.mapRow(row as RawMemoryRow));
  }

  hasContentHash(contentHash: string): boolean {
    const row = this.db.prepare("SELECT id FROM memories WHERE content_hash = ? LIMIT 1").get(contentHash);
    return Boolean(row);
  }

  clear(): void {
    this.db.prepare("DELETE FROM memories").run();
  }

  close(): void {
    this.db.close();
  }

  private mapRow(row: RawMemoryRow): IndexedMemoryRow {
    return {
      id: row.id,
      status: row.status,
      scope: row.scope,
      source: row.source,
      tags: JSON.parse(row.tags) as string[],
      contentHash: row.contentHash,
      possibleDuplicate: Boolean(row.possibleDuplicate),
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      path: row.path,
      searchText: row.searchText,
    };
  }
}
```

Modify `packages/core/src/index.ts`:

```ts
export * from "./errors";
export * from "./hash";
export * from "./ids";
export * from "./markdown-store";
export * from "./paths";
export * from "./schema";
export * from "./sqlite-index";
```

- [ ] **Step 4: Run SQLite index tests**

```bash
cd /Users/ceilf6/Desktop/myrepos/open-memory-gateway
pnpm test -- packages/core/test/sqlite-index.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit SQLite index**

```bash
cd /Users/ceilf6/Desktop/myrepos/open-memory-gateway
git add packages/core/src packages/core/test
git commit -m "feat: add sqlite memory index"
```

Expected: commit succeeds.

## Task 5: Memory Service

**Files:**
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/packages/core/src/memory-service.ts`
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/packages/core/test/memory-service.test.ts`
- Modify: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/packages/core/src/index.ts`

- [ ] **Step 1: Write failing memory service tests**

Create `packages/core/test/memory-service.test.ts`:

```ts
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { MemoryService } from "../src/memory-service";

let root: string;

beforeEach(async () => {
  root = await mkdtemp(path.join(tmpdir(), "omg-service-"));
});

afterEach(async () => {
  await rm(root, { recursive: true, force: true });
});

describe("MemoryService", () => {
  it("captures draft memory and approves it", async () => {
    const service = new MemoryService({ rootDir: root, now: () => new Date("2026-05-20T10:00:00+08:00") });
    const draft = await service.capture({ content: "I prefer concise plans.", tags: ["Work"] });

    expect(draft.frontmatter.status).toBe("draft");
    expect(draft.frontmatter.tags).toEqual(["work"]);

    const active = await service.approve(draft.frontmatter.id);
    expect(active.frontmatter.status).toBe("active");
    expect(active.path).toContain("memory/active");
  });

  it("marks duplicate draft memories", async () => {
    const service = new MemoryService({ rootDir: root, now: () => new Date("2026-05-20T10:00:00+08:00") });
    await service.capture({ content: "Duplicate memory" });
    const second = await service.capture({ content: " Duplicate   memory " });

    expect(second.possibleDuplicate).toBe(true);
  });

  it("searches active memories", async () => {
    const service = new MemoryService({ rootDir: root, now: () => new Date("2026-05-20T10:00:00+08:00") });
    const draft = await service.capture({ content: "Remember the OpenClaw memory workflow." });
    await service.approve(draft.frontmatter.id);

    const results = await service.search("OpenClaw", "active");
    expect(results).toHaveLength(1);
  });
});
```

- [ ] **Step 2: Run failing service tests**

```bash
cd /Users/ceilf6/Desktop/myrepos/open-memory-gateway
pnpm test -- packages/core/test/memory-service.test.ts
```

Expected: FAIL because `../src/memory-service` does not exist.

- [ ] **Step 3: Implement MemoryService**

Create `packages/core/src/memory-service.ts`:

```ts
import { createMemoryId } from "./ids";
import { MarkdownMemoryStore } from "./markdown-store";
import { SQLiteMemoryIndex, type IndexedMemoryRow } from "./sqlite-index";
import { hashMemoryContent } from "./hash";
import {
  normalizeTags,
  type CaptureMemoryInput,
  type MemoryRecord,
  type MemoryStatus,
  type UpdateMemoryInput,
} from "./schema";

export interface MemoryServiceOptions {
  rootDir: string;
  now?: () => Date;
}

export class MemoryService {
  private readonly store: MarkdownMemoryStore;
  private readonly index: SQLiteMemoryIndex;
  private readonly now: () => Date;

  constructor(private readonly options: MemoryServiceOptions) {
    this.store = new MarkdownMemoryStore({ rootDir: options.rootDir });
    this.index = new SQLiteMemoryIndex({ rootDir: options.rootDir });
    this.now = options.now ?? (() => new Date());
  }

  async capture(input: CaptureMemoryInput): Promise<MemoryRecord> {
    const content = input.content.trim();
    if (!content) {
      throw new Error("Memory content is required");
    }

    const now = this.now().toISOString();
    const contentHash = hashMemoryContent(content);
    const possibleDuplicate = this.index.hasContentHash(contentHash);
    const record = await this.store.write({
      frontmatter: {
        id: createMemoryId(this.now()),
        status: "draft",
        scope: input.scope ?? "personal",
        source: input.source ?? "manual",
        tags: normalizeTags(input.tags),
        createdAt: now,
        updatedAt: now,
      },
      content,
      contentHash,
      possibleDuplicate,
    });
    const indexed = { ...record, possibleDuplicate, contentHash };
    this.index.upsert(indexed);
    return indexed;
  }

  async update(id: string, input: UpdateMemoryInput): Promise<MemoryRecord> {
    const existing = await this.store.read(id);
    const nextStatus = input.status ?? existing.frontmatter.status;
    const content = input.content?.trim() ?? existing.content;
    const updated: MemoryRecord = {
      frontmatter: {
        ...existing.frontmatter,
        status: nextStatus,
        scope: input.scope ?? existing.frontmatter.scope,
        source: input.source ?? existing.frontmatter.source,
        tags: input.tags ? normalizeTags(input.tags) : existing.frontmatter.tags,
        updatedAt: this.now().toISOString(),
      },
      content,
      contentHash: hashMemoryContent(content),
    };

    const record = await this.store.write(updated);
    this.index.upsert(record);
    return record;
  }

  async approve(id: string): Promise<MemoryRecord> {
    return this.update(id, { status: "active" });
  }

  async reject(id: string): Promise<MemoryRecord> {
    return this.update(id, { status: "rejected" });
  }

  async archive(id: string): Promise<MemoryRecord> {
    return this.update(id, { status: "archived" });
  }

  async list(status?: MemoryStatus): Promise<IndexedMemoryRow[]> {
    return this.index.list(status);
  }

  async search(query: string, status?: MemoryStatus): Promise<IndexedMemoryRow[]> {
    return this.index.search(query, status);
  }

  async rebuildIndex(): Promise<number> {
    this.index.clear();
    const records = await this.store.list();
    for (const record of records) {
      this.index.upsert(record);
    }
    return records.length;
  }
}
```

Modify `packages/core/src/index.ts`:

```ts
export * from "./errors";
export * from "./hash";
export * from "./ids";
export * from "./markdown-store";
export * from "./memory-service";
export * from "./paths";
export * from "./schema";
export * from "./sqlite-index";
```

- [ ] **Step 4: Run service and full core tests**

```bash
cd /Users/ceilf6/Desktop/myrepos/open-memory-gateway
pnpm test -- packages/core/test
pnpm --filter @open-memory-gateway/core build
```

Expected: all core tests pass and `packages/core/dist` is created.

- [ ] **Step 5: Commit MemoryService**

```bash
cd /Users/ceilf6/Desktop/myrepos/open-memory-gateway
git add packages/core/src packages/core/test
git commit -m "feat: add memory service"
```

Expected: commit succeeds.

## Task 6: CLI Package

**Files:**
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/packages/cli/package.json`
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/packages/cli/src/index.ts`
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/packages/cli/test/cli.test.ts`

- [ ] **Step 1: Add CLI package manifest**

Create `packages/cli/package.json`:

```json
{
  "name": "@open-memory-gateway/cli",
  "version": "0.1.0",
  "type": "module",
  "bin": {
    "memory": "./dist/index.js"
  },
  "scripts": {
    "build": "tsup src/index.ts --format esm --dts --clean --banner.js \"#!/usr/bin/env node\"",
    "lint": "tsc --noEmit -p tsconfig.json",
    "typecheck": "tsc --noEmit -p tsconfig.json",
    "test": "vitest run test"
  },
  "dependencies": {
    "@open-memory-gateway/core": "workspace:*",
    "commander": "^12.1.0"
  },
  "devDependencies": {
    "execa": "^9.5.0"
  }
}
```

Create `packages/cli/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.base.json",
  "include": ["src/**/*.ts", "test/**/*.ts"]
}
```

- [ ] **Step 2: Write failing CLI smoke test**

Create `packages/cli/test/cli.test.ts`:

```ts
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { execa } from "execa";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

let root: string;

beforeEach(async () => {
  root = await mkdtemp(path.join(tmpdir(), "omg-cli-"));
});

afterEach(async () => {
  await rm(root, { recursive: true, force: true });
});

describe("memory CLI", () => {
  it("captures, lists, approves, and searches memory", async () => {
    const cli = path.resolve("packages/cli/src/index.ts");
    const env = { ...process.env, OPEN_MEMORY_ROOT: root };

    const capture = await execa("pnpm", ["tsx", cli, "capture", "CLI captured memory", "--tag", "cli"], { env });
    expect(capture.stdout).toContain("draft");

    const listDrafts = await execa("pnpm", ["tsx", cli, "list", "--status", "draft"], { env });
    expect(listDrafts.stdout).toContain("CLI captured memory");

    const id = /mem_[0-9]{8}_[a-z0-9]+/.exec(listDrafts.stdout)?.[0];
    expect(id).toBeTruthy();

    await execa("pnpm", ["tsx", cli, "approve", id as string], { env });
    const search = await execa("pnpm", ["tsx", cli, "search", "captured", "--status", "active"], { env });
    expect(search.stdout).toContain(id);
  });
});
```

- [ ] **Step 3: Run failing CLI test**

```bash
cd /Users/ceilf6/Desktop/myrepos/open-memory-gateway
pnpm install
pnpm test -- packages/cli/test/cli.test.ts
```

Expected: FAIL because `packages/cli/src/index.ts` does not exist.

- [ ] **Step 4: Implement CLI commands**

Create `packages/cli/src/index.ts`:

```ts
#!/usr/bin/env node
import { Command } from "commander";
import { MemoryService, MemoryStatusSchema } from "@open-memory-gateway/core";

const program = new Command();

function service(): MemoryService {
  return new MemoryService({ rootDir: process.env.OPEN_MEMORY_ROOT ?? process.cwd() });
}

function print(value: unknown): void {
  console.log(JSON.stringify(value, null, 2));
}

program.name("memory").description("Open Memory Gateway CLI").version("0.1.0");

program
  .command("capture")
  .argument("<content>")
  .option("-t, --tag <tag>", "Tag to attach", (tag, tags: string[]) => [...tags, tag], [])
  .option("-s, --source <source>", "Memory source", "manual")
  .action(async (content: string, options: { tag: string[]; source: string }) => {
    print(await service().capture({ content, source: options.source, tags: options.tag }));
  });

program
  .command("list")
  .option("--status <status>", "Filter by memory status")
  .action(async (options: { status?: string }) => {
    const status = options.status ? MemoryStatusSchema.parse(options.status) : undefined;
    print(await service().list(status));
  });

program
  .command("approve")
  .argument("<id>")
  .action(async (id: string) => {
    print(await service().approve(id));
  });

program
  .command("reject")
  .argument("<id>")
  .action(async (id: string) => {
    print(await service().reject(id));
  });

program
  .command("archive")
  .argument("<id>")
  .action(async (id: string) => {
    print(await service().archive(id));
  });

program
  .command("search")
  .argument("<query>")
  .option("--status <status>", "Filter by memory status")
  .action(async (query: string, options: { status?: string }) => {
    const status = options.status ? MemoryStatusSchema.parse(options.status) : undefined;
    print(await service().search(query, status));
  });

program
  .command("index")
  .argument("<action>")
  .action(async (action: string) => {
    if (action !== "rebuild") {
      throw new Error(`Unsupported index action: ${action}`);
    }
    print({ indexed: await service().rebuildIndex() });
  });

await program.parseAsync(process.argv);
```

- [ ] **Step 5: Run CLI tests and build**

```bash
cd /Users/ceilf6/Desktop/myrepos/open-memory-gateway
pnpm test -- packages/cli/test/cli.test.ts
pnpm --filter @open-memory-gateway/cli build
```

Expected: CLI test passes and `packages/cli/dist/index.js` exists.

- [ ] **Step 6: Commit CLI**

```bash
cd /Users/ceilf6/Desktop/myrepos/open-memory-gateway
git add package.json pnpm-lock.yaml packages/cli
git commit -m "feat: add memory cli"
```

Expected: commit succeeds.

## Task 7: MCP Stdio Server

**Files:**
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/packages/mcp-server/package.json`
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/packages/mcp-server/src/index.ts`
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/packages/mcp-server/test/tools.test.ts`

- [ ] **Step 1: Add MCP package manifest**

Create `packages/mcp-server/package.json`:

```json
{
  "name": "@open-memory-gateway/mcp-server",
  "version": "0.1.0",
  "type": "module",
  "bin": {
    "open-memory-gateway-mcp": "./dist/index.js"
  },
  "scripts": {
    "build": "tsup src/index.ts --format esm --dts --clean --banner.js \"#!/usr/bin/env node\"",
    "lint": "tsc --noEmit -p tsconfig.json",
    "typecheck": "tsc --noEmit -p tsconfig.json",
    "test": "vitest run test"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.17.0",
    "@open-memory-gateway/core": "workspace:*",
    "zod": "^3.25.0"
  }
}
```

Create `packages/mcp-server/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.base.json",
  "include": ["src/**/*.ts", "test/**/*.ts"]
}
```

- [ ] **Step 2: Write tool registry tests**

Create `packages/mcp-server/test/tools.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { createToolHandlers } from "../src/index";

describe("MCP tool handlers", () => {
  it("exposes stable tool names", () => {
    const handlers = createToolHandlers({ rootDir: "/tmp/open-memory-gateway-test" });
    expect(Object.keys(handlers).sort()).toEqual([
      "approve_memory",
      "capture_memory",
      "list_memories",
      "search_memories",
      "update_memory",
    ]);
  });
});
```

- [ ] **Step 3: Run failing MCP tests**

```bash
cd /Users/ceilf6/Desktop/myrepos/open-memory-gateway
pnpm install
pnpm test -- packages/mcp-server/test/tools.test.ts
```

Expected: FAIL because `packages/mcp-server/src/index.ts` does not exist.

- [ ] **Step 4: Implement MCP server and testable handlers**

Create `packages/mcp-server/src/index.ts`:

```ts
#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { MemoryService, MemoryStatusSchema } from "@open-memory-gateway/core";
import { z } from "zod";

export interface ToolHandlerOptions {
  rootDir: string;
}

export function createToolHandlers(options: ToolHandlerOptions) {
  const service = new MemoryService({ rootDir: options.rootDir });

  return {
    capture_memory: async (input: { content: string; source?: string; tags?: string[] }) =>
      service.capture(input),
    list_memories: async (input: { status?: string }) =>
      service.list(input.status ? MemoryStatusSchema.parse(input.status) : undefined),
    search_memories: async (input: { query: string; status?: string }) =>
      service.search(input.query, input.status ? MemoryStatusSchema.parse(input.status) : undefined),
    update_memory: async (input: {
      id: string;
      content?: string;
      tags?: string[];
      status?: string;
      source?: string;
      scope?: string;
    }) =>
      service.update(input.id, {
        content: input.content,
        tags: input.tags,
        status: input.status ? MemoryStatusSchema.parse(input.status) : undefined,
        source: input.source,
        scope: input.scope,
      }),
    approve_memory: async (input: { id: string }) => service.approve(input.id),
  };
}

export async function startServer(rootDir = process.env.OPEN_MEMORY_ROOT ?? process.cwd()): Promise<void> {
  const server = new McpServer({ name: "open-memory-gateway", version: "0.1.0" });
  const handlers = createToolHandlers({ rootDir });

  server.registerTool(
    "capture_memory",
    {
      title: "Capture memory",
      description: "Create a draft long-term memory.",
      inputSchema: {
        content: z.string().min(1),
        source: z.string().optional(),
        tags: z.array(z.string()).optional(),
      },
    },
    async (input) => ({ content: [{ type: "text", text: JSON.stringify(await handlers.capture_memory(input)) }] }),
  );

  server.registerTool(
    "list_memories",
    {
      title: "List memories",
      description: "List memories by optional status.",
      inputSchema: { status: MemoryStatusSchema.optional() },
    },
    async (input) => ({ content: [{ type: "text", text: JSON.stringify(await handlers.list_memories(input)) }] }),
  );

  server.registerTool(
    "search_memories",
    {
      title: "Search memories",
      description: "Search indexed memories by keyword.",
      inputSchema: { query: z.string().min(1), status: MemoryStatusSchema.optional() },
    },
    async (input) => ({ content: [{ type: "text", text: JSON.stringify(await handlers.search_memories(input)) }] }),
  );

  server.registerTool(
    "update_memory",
    {
      title: "Update memory",
      description: "Update content, tags, source, scope, or status for one memory.",
      inputSchema: {
        id: z.string().min(1),
        content: z.string().optional(),
        tags: z.array(z.string()).optional(),
        status: MemoryStatusSchema.optional(),
        source: z.string().optional(),
        scope: z.string().optional(),
      },
    },
    async (input) => ({ content: [{ type: "text", text: JSON.stringify(await handlers.update_memory(input)) }] }),
  );

  server.registerTool(
    "approve_memory",
    {
      title: "Approve memory",
      description: "Promote a memory to active status.",
      inputSchema: { id: z.string().min(1) },
    },
    async (input) => ({ content: [{ type: "text", text: JSON.stringify(await handlers.approve_memory(input)) }] }),
  );

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await startServer();
}
```

- [ ] **Step 5: Run MCP tests and build**

```bash
cd /Users/ceilf6/Desktop/myrepos/open-memory-gateway
pnpm test -- packages/mcp-server/test/tools.test.ts
pnpm --filter @open-memory-gateway/mcp-server build
```

Expected: MCP tests pass and `packages/mcp-server/dist/index.js` exists.

- [ ] **Step 6: Commit MCP server**

```bash
cd /Users/ceilf6/Desktop/myrepos/open-memory-gateway
git add package.json pnpm-lock.yaml packages/mcp-server
git commit -m "feat: add mcp stdio server"
```

Expected: commit succeeds.

## Task 8: Next.js Web UI

**Files:**
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/apps/web/package.json`
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/apps/web/next.config.mjs`
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/apps/web/tsconfig.json`
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/apps/web/app/actions.ts`
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/apps/web/app/globals.css`
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/apps/web/app/inbox/page.tsx`
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/apps/web/app/layout.tsx`
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/apps/web/app/memories/[id]/page.tsx`
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/apps/web/app/memories/page.tsx`
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/apps/web/lib/memory.ts`

- [ ] **Step 1: Add Web package manifest and Next config**

Create `apps/web/package.json`:

```json
{
  "name": "@open-memory-gateway/web",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "next build",
    "dev": "next dev -p 3020",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@open-memory-gateway/core": "workspace:*",
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0"
  }
}
```

Create `apps/web/next.config.mjs`:

```js
const nextConfig = {
  transpilePackages: ["@open-memory-gateway/core"],
  serverExternalPackages: ["better-sqlite3"],
};

export default nextConfig;
```

Create `apps/web/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "jsx": "preserve",
    "allowJs": true,
    "incremental": true,
    "plugins": [{ "name": "next" }]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 2: Implement shared Web service accessor**

Create `apps/web/lib/memory.ts`:

```ts
import { MemoryService } from "@open-memory-gateway/core";

export function getMemoryService(): MemoryService {
  return new MemoryService({ rootDir: process.env.OPEN_MEMORY_ROOT ?? process.cwd() });
}
```

- [ ] **Step 3: Implement server actions**

Create `apps/web/app/actions.ts`:

```ts
"use server";

import { redirect } from "next/navigation";
import { getMemoryService } from "../lib/memory";

export async function captureMemory(formData: FormData): Promise<void> {
  const content = String(formData.get("content") ?? "");
  const tags = String(formData.get("tags") ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  await getMemoryService().capture({ content, tags, source: "web" });
  redirect("/inbox");
}

export async function updateMemory(formData: FormData): Promise<void> {
  const id = String(formData.get("id"));
  const content = String(formData.get("content") ?? "");
  const tags = String(formData.get("tags") ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  await getMemoryService().update(id, { content, tags });
  redirect(`/memories/${id}`);
}

export async function approveMemory(formData: FormData): Promise<void> {
  const id = String(formData.get("id"));
  await getMemoryService().approve(id);
  redirect("/memories");
}

export async function rejectMemory(formData: FormData): Promise<void> {
  const id = String(formData.get("id"));
  await getMemoryService().reject(id);
  redirect("/inbox");
}

export async function archiveMemory(formData: FormData): Promise<void> {
  const id = String(formData.get("id"));
  await getMemoryService().archive(id);
  redirect("/memories");
}
```

- [ ] **Step 4: Implement layout and styles**

Create `apps/web/app/layout.tsx`:

```tsx
import "./globals.css";
import Link from "next/link";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="topbar">
          <Link href="/inbox">Inbox</Link>
          <Link href="/memories">Memories</Link>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
```

Create `apps/web/app/globals.css`:

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  color: #1f2937;
  background: #f7f8fa;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.topbar {
  display: flex;
  gap: 16px;
  align-items: center;
  min-height: 52px;
  padding: 0 24px;
  border-bottom: 1px solid #d7dce2;
  background: #ffffff;
}

.topbar a {
  color: #0f172a;
  text-decoration: none;
  font-weight: 600;
}

main {
  max-width: 1040px;
  margin: 0 auto;
  padding: 24px;
}

.toolbar {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.list {
  display: grid;
  gap: 12px;
}

.item {
  border: 1px solid #d7dce2;
  border-radius: 8px;
  padding: 16px;
  background: #ffffff;
}

.meta {
  color: #64748b;
  font-size: 13px;
}

textarea,
input {
  width: 100%;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 10px 12px;
  font: inherit;
}

textarea {
  min-height: 180px;
}

button,
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 36px;
  border: 1px solid #0f172a;
  border-radius: 8px;
  padding: 0 12px;
  color: #ffffff;
  background: #0f172a;
  font: inherit;
  text-decoration: none;
  cursor: pointer;
}

.secondary {
  color: #0f172a;
  background: #ffffff;
}
```

- [ ] **Step 5: Implement inbox page**

Create `apps/web/app/inbox/page.tsx`:

```tsx
import Link from "next/link";
import { approveMemory, captureMemory, rejectMemory } from "../actions";
import { getMemoryService } from "../../lib/memory";

export default async function InboxPage() {
  const drafts = await getMemoryService().list("draft");

  return (
    <>
      <div className="toolbar">
        <h1>Inbox</h1>
      </div>

      <form action={captureMemory} className="item">
        <label>
          New memory
          <textarea name="content" required />
        </label>
        <label>
          Tags
          <input name="tags" aria-label="Tags separated by commas" />
        </label>
        <button type="submit">Capture</button>
      </form>

      <section className="list">
        {drafts.map((memory) => (
          <article className="item" key={memory.id}>
            <p>{memory.searchText.split("\n")[0]}</p>
            <p className="meta">{memory.id}</p>
            <Link className="button secondary" href={`/memories/${memory.id}`}>
              Edit
            </Link>
            <form action={approveMemory}>
              <input type="hidden" name="id" value={memory.id} />
              <button type="submit">Approve</button>
            </form>
            <form action={rejectMemory}>
              <input type="hidden" name="id" value={memory.id} />
              <button className="secondary" type="submit">
                Reject
              </button>
            </form>
          </article>
        ))}
      </section>
    </>
  );
}
```

- [ ] **Step 6: Implement memories pages**

Create `apps/web/app/memories/page.tsx`:

```tsx
import Link from "next/link";
import { getMemoryService } from "../../lib/memory";

export default async function MemoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const service = getMemoryService();
  const memories = q ? await service.search(q, "active") : await service.list("active");

  return (
    <>
      <div className="toolbar">
        <h1>Memories</h1>
        <form>
          <input name="q" defaultValue={q ?? ""} aria-label="Search memories" />
        </form>
      </div>
      <section className="list">
        {memories.map((memory) => (
          <article className="item" key={memory.id}>
            <p>{memory.searchText.split("\n")[0]}</p>
            <p className="meta">{memory.id}</p>
            <Link className="button secondary" href={`/memories/${memory.id}`}>
              Edit
            </Link>
          </article>
        ))}
      </section>
    </>
  );
}
```

Create `apps/web/app/memories/[id]/page.tsx`:

```tsx
import { archiveMemory, approveMemory, rejectMemory, updateMemory } from "../../actions";
import { MarkdownMemoryStore } from "@open-memory-gateway/core";

export default async function MemoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const store = new MarkdownMemoryStore({ rootDir: process.env.OPEN_MEMORY_ROOT ?? process.cwd() });
  const memory = await store.read(id);

  return (
    <>
      <h1>{id}</h1>
      <form action={updateMemory} className="item">
        <input type="hidden" name="id" value={id} />
        <label>
          Content
          <textarea name="content" defaultValue={memory.content} required />
        </label>
        <label>
          Tags
          <input name="tags" defaultValue={memory.frontmatter.tags.join(", ")} />
        </label>
        <button type="submit">Save</button>
      </form>
      <form action={approveMemory}>
        <input type="hidden" name="id" value={id} />
        <button type="submit">Approve</button>
      </form>
      <form action={archiveMemory}>
        <input type="hidden" name="id" value={id} />
        <button className="secondary" type="submit">
          Archive
        </button>
      </form>
      <form action={rejectMemory}>
        <input type="hidden" name="id" value={id} />
        <button className="secondary" type="submit">
          Reject
        </button>
      </form>
    </>
  );
}
```

- [ ] **Step 7: Build Web UI**

```bash
cd /Users/ceilf6/Desktop/myrepos/open-memory-gateway
pnpm install
pnpm --filter @open-memory-gateway/web typecheck
pnpm --filter @open-memory-gateway/web build
```

Expected: typecheck and Next.js build pass.

- [ ] **Step 8: Commit Web UI**

```bash
cd /Users/ceilf6/Desktop/myrepos/open-memory-gateway
git add package.json pnpm-lock.yaml apps/web
git commit -m "feat: add memory inbox web ui"
```

Expected: commit succeeds.

## Task 9: Adapter Boundary And Documentation

**Files:**
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/packages/adapters/package.json`
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/packages/adapters/src/index.ts`
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/docs/architecture.md`
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/docs/mcp-tools.md`
- Create: `/Users/ceilf6/Desktop/myrepos/open-memory-gateway/docs/feishu-adapter-notes.md`

- [ ] **Step 1: Create adapter boundary package**

Create `packages/adapters/package.json`:

```json
{
  "name": "@open-memory-gateway/adapters",
  "version": "0.1.0",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    }
  },
  "scripts": {
    "build": "tsup src/index.ts --format esm --dts --clean",
    "lint": "tsc --noEmit -p tsconfig.json",
    "typecheck": "tsc --noEmit -p tsconfig.json",
    "test": "vitest run test --passWithNoTests"
  },
  "dependencies": {
    "@open-memory-gateway/core": "workspace:*"
  }
}
```

Create `packages/adapters/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.base.json",
  "include": ["src/**/*.ts"]
}
```

Create `packages/adapters/src/index.ts`:

```ts
import type { CaptureMemoryInput } from "@open-memory-gateway/core";

export interface MemoryCaptureAdapter {
  readonly name: string;
  capture(input: CaptureMemoryInput): Promise<{ id: string; status: string }>;
}
```

- [ ] **Step 2: Create architecture docs**

Create `docs/architecture.md`:

```md
# Architecture

Open Memory Gateway is local-first.

## Source Of Truth

Markdown files under `memory/` are the durable source of truth. Each memory is one `.md` file with frontmatter metadata and body content.

## Rebuildable Index

SQLite under `memory/.index/memory.sqlite` stores query data only. It can be rebuilt from Markdown by running:

```bash
memory index rebuild
```

## Entry Points

- CLI invokes `MemoryService`.
- MCP stdio server invokes `MemoryService`.
- Next.js UI invokes `MemoryService` from server actions.
- Adapters should transform external events into `CaptureMemoryInput`.
```

Create `docs/mcp-tools.md`:

```md
# MCP Tools

The MVP server uses stdio transport.

## capture_memory

Creates a `draft` memory.

Input:

```json
{
  "content": "Remember this preference.",
  "source": "manual",
  "tags": ["preference"]
}
```

## list_memories

Lists memories by optional status.

## search_memories

Searches indexed memory text by keyword.

## update_memory

Updates content, tags, source, scope, or status for one memory.

## approve_memory

Moves a memory to `active`.
```

Create `docs/feishu-adapter-notes.md`:

```md
# Feishu Adapter Notes

The first Feishu integration should preserve the same capture and review flow:

1. User sends or forwards content from Feishu.
2. Adapter calls `capture_memory`.
3. Memory enters `draft`.
4. User reviews in Web UI or via a Feishu confirmation surface.
5. Approved memory becomes `active`.

Client and mobile support should prefer message-level actions, Bot forwarding, or an in-Feishu web form. The MVP does not assume arbitrary selected text can open a custom native menu in Feishu clients.
```

- [ ] **Step 3: Build adapter package and commit docs**

```bash
cd /Users/ceilf6/Desktop/myrepos/open-memory-gateway
pnpm --filter @open-memory-gateway/adapters build
git add packages/adapters docs
git commit -m "docs: add adapter and protocol notes"
```

Expected: build passes and commit succeeds.

## Task 10: Full Verification, Push, And Wiki Submodule

**Files:**
- Modify: `/Users/ceilf6/Desktop/myrepos/Wiki/.gitmodules`
- Add submodule entry: `/Users/ceilf6/Desktop/myrepos/Wiki/AI/2-AI-infra/open-memory-gateway`

- [ ] **Step 1: Run full new-repo verification**

```bash
cd /Users/ceilf6/Desktop/myrepos/open-memory-gateway
pnpm test
pnpm build
pnpm typecheck
git status --short
```

Expected:

```text
pnpm test exits 0
pnpm build exits 0
pnpm typecheck exits 0
git status --short has no tracked modifications
```

- [ ] **Step 2: Push the new repository**

```bash
cd /Users/ceilf6/Desktop/myrepos/open-memory-gateway
git push -u origin main
gh repo view ceilf6/open-memory-gateway --json nameWithOwner,url,visibility,defaultBranchRef
```

Expected: GitHub reports `ceilf6/open-memory-gateway`, `PUBLIC`, and default branch `main`.

- [ ] **Step 3: Add the repository as a Wiki submodule**

```bash
cd /Users/ceilf6/Desktop/myrepos/Wiki
git submodule add https://github.com/ceilf6/open-memory-gateway.git AI/2-AI-infra/open-memory-gateway
git status --short
```

Expected: `.gitmodules` is modified and `AI/2-AI-infra/open-memory-gateway` appears as a new submodule path.

- [ ] **Step 4: Run GitNexus change detection before committing Wiki changes**

Use the GitNexus MCP tool:

```text
mcp__gitnexus__.detect_changes({ "repo": "Wiki", "scope": "all" })
```

Expected: only `.gitmodules` and the submodule pointer are affected. If GitNexus reports HIGH or CRITICAL risk, stop and report the blast radius before committing.

- [ ] **Step 5: Commit the Wiki submodule change**

```bash
cd /Users/ceilf6/Desktop/myrepos/Wiki
git add .gitmodules AI/2-AI-infra/open-memory-gateway
git commit -m "chore: add open-memory-gateway submodule"
```

Expected: commit succeeds and contains only the submodule addition.

- [ ] **Step 6: Final smoke commands**

```bash
cd /Users/ceilf6/Desktop/myrepos/Wiki/AI/2-AI-infra/open-memory-gateway
pnpm test
pnpm build
OPEN_MEMORY_ROOT=/tmp/open-memory-gateway-smoke pnpm --filter @open-memory-gateway/cli tsx src/index.ts capture "Smoke memory"
```

Expected: tests and build pass, and the CLI prints a JSON draft memory.
