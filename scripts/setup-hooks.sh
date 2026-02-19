#!/bin/sh
# 初始化本地 git hooks 配置
# 克隆仓库后执行一次: sh scripts/setup-hooks.sh
#
# 注意：git 没有 post-push 钩子，因此改用 git alias.push 实现：
#   git push 成功后自动调用 .githooks/submodule/post-push 同步父仓库指针。

set -e

REPO_ROOT=$(cd "$(dirname "$0")/.." && pwd)

echo ">>> 配置子模块 React/source 的 git alias.push..."

cd "$REPO_ROOT/React/source"

# alias.push: 用 git -c alias.push="" 避免递归，push 成功后执行同步脚本
git config --local alias.push \
  '!f() { git -c alias.push="" push "$@" && sh "$(git rev-parse --show-toplevel)/../../.githooks/submodule/post-push"; }; f'

# 确保同步脚本有执行权限
chmod +x "$REPO_ROOT/.githooks/submodule/post-push"

echo ">>> 完成！后续在 React/source 执行 git push 会自动同步 Lab 父仓库。"
