---
name: deepwiki-usage
description: "Use when researching external open-source projects, understanding unfamiliar libraries, or getting high-level architecture overviews of public repos. Examples: 'How does Next.js routing work?', 'Explain the architecture of langchain', 'What does this repo do?'"
---

# DeepWiki — External Repo Research

## When to Use

- "How does [external library] work?"
- "Explain the architecture of [public repo]"
- "What are the main components of [framework]?"
- Researching a new dependency before adopting it
- Getting oriented in an unfamiliar open-source project

## When NOT to Use

- Questions about the local Lab repository (use OpenViking + GitNexus)
- Symbol-level analysis (use GitNexus after cloning)
- Code quality metrics (use CGC)

## MCP Tools

**read_wiki_structure** — get the documentation topic tree:
```
mcp__deepwiki__read_wiki_structure({repo: "owner/repo"})
→ Returns structured topic tree with sections and pages
```

**read_wiki_contents** — get documentation content:
```
mcp__deepwiki__read_wiki_contents({repo: "owner/repo"})
→ Returns markdown documentation with Mermaid diagrams
```

**ask_question** — conversational Q&A:
```
mcp__deepwiki__ask_question({
  repo: "owner/repo",
  question: "How does the middleware system work?"
})
→ Returns answer grounded in the repo's actual code
```

## Workflow: Researching a New Library

```
1. read_wiki_structure → Understand what topics are documented
2. ask_question → Ask specific questions about architecture/design
3. read_wiki_contents → Read detailed documentation on specific topics
4. If deeper analysis needed:
   - Clone the repo locally
   - Index with GitNexus: `npx gitnexus analyze`
   - Use gitnexus_query/context for symbol-level analysis
```

## Checklist

```
- [ ] Confirm the target is a public repository (DeepWiki only works with public repos)
- [ ] Use read_wiki_structure first to understand available documentation
- [ ] Ask focused questions — one concept at a time
- [ ] Cross-reference with actual source code for implementation details
- [ ] If you need precise call graphs or impact analysis, clone and use GitNexus
```

## Supported Platforms

- GitHub: `owner/repo` (e.g., `vercel/next.js`)
- GitLab: `gitlab:owner/repo`
- Bitbucket: `bitbucket:owner/repo`
