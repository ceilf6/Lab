import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// 获取 __dirname 的 ES Module 等价物
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 获取推送中所有包含 [ptr] 的提交
 */
function getPtrCommits() {
    const commitSha = process.env.COMMIT_SHA;
    const beforeSha = process.env.BEFORE_SHA;
    const repoUrl = process.env.REPO_URL;

    if (!commitSha || !repoUrl) {
        console.error('缺少必要的环境变量');
        process.exit(1);
    }

    // 获取提交范围
    const range = beforeSha && beforeSha !== '0000000000000000000000000000000000000000'
        ? `${beforeSha}..${commitSha}`
        : '-1';

    console.log('Checking commits in range:', range);

    // 获取所有提交的消息和 SHA
    let commits;
    try {
        const output = execSync(`git log --format=%H|%s ${range}`, { encoding: 'utf-8' });
        commits = output.trim().split('\n').filter(Boolean);
    } catch (error) {
        console.error('获取提交失败:', error.message);
        return [];
    }

    // 筛选出包含 [ptr] 的提交
    const ptrCommits = [];
    for (const line of commits) {
        const [sha, message] = line.split('|');
        const content = extractContent(message);
        if (content) {
            ptrCommits.push({ sha, message, content });
            console.log('Found [ptr] commit:', message);
        }
    }

    return ptrCommits;
}

/**
 * 更新 README.md
 */
function updateReadme() {
    const repoUrl = process.env.REPO_URL;
    const ptrCommits = getPtrCommits();

    if (ptrCommits.length === 0) {
        console.log('未找到包含 [ptr] 的提交，跳过更新');
        return;
    }

    console.log(`找到 ${ptrCommits.length} 个 [ptr] 提交`);

    // 读取 README.md
    const readmePath = path.join(__dirname, '../README.md');
    let readmeContent = fs.readFileSync(readmePath, 'utf-8');

    // 为每个提交生成新行
    const newLines = ptrCommits.map(({ sha, content }) => {
        const commitLink = `${repoUrl}/commit/${sha}`;
        return `- [${content}](${commitLink})`;
    });

    // 在文件末尾追加新行
    if (!readmeContent.endsWith('\n')) {
        readmeContent += '\n';
    }
    readmeContent += newLines.join('\n') + '\n';

    // 写回文件
    fs.writeFileSync(readmePath, readmeContent, 'utf-8');

    console.log('✅ README.md 已更新');
    console.log('新增内容:');
    newLines.forEach(line => console.log(line));
}

/**
 * 从 commit message 中提取内容
 * 支持格式: feat[ptr]: xxx, fix[ptr]: xxx, chore[ptr]: xxx 等
 */
function extractContent(commitMessage) {
    // 匹配 xxx[ptr]: 后面的内容
    const match = commitMessage.match(/\w+\[ptr\]:\s*(.+)/);
    if (match && match[1]) {
        return match[1].trim();
    }
    return null;
}

/**
 * 更新 README.md
 */
function updateReadme() {
    const commitMessage = process.env.COMMIT_MESSAGE;
    const commitSha = process.env.COMMIT_SHA;
    const repoUrl = process.env.REPO_URL;

    if (!commitMessage || !commitSha || !repoUrl) {
        console.error('缺少必要的环境变量');
        process.exit(1);
    }

    console.log('Commit Message:', commitMessage);
    console.log('Commit SHA:', commitSha);

    // 提取内容
    const content = extractContent(commitMessage);
    if (!content) {
        console.log('未找到符合格式的内容，跳过更新');
        return;
    }

    console.log('提取的内容:', content);

    // 生成 commit 链接
    const commitLink = `${repoUrl}/commit/${commitSha}`;

    // 生成新的一行
    const newLine = `- [${content}](${commitLink})`;

    // 读取 README.md
    const readmePath = path.join(__dirname, '../README.md');
    let readmeContent = fs.readFileSync(readmePath, 'utf-8');

    // 在文件末尾追加新行
    if (!readmeContent.endsWith('\n')) {
        readmeContent += '\n';
    }
    readmeContent += newLine + '\n';

    // 写回文件
    fs.writeFileSync(readmePath, readmeContent, 'utf-8');

    console.log('✅ README.md 已更新');
    console.log('新增内容:', newLine);
}

// 执行更新
updateReadme();
