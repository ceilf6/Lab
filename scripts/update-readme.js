const fs = require('fs');
const path = require('path');

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
