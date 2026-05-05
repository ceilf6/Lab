#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

if [[ -n "${PORT+x}" ]]; then
  port_was_provided=1
else
  PORT=3000
  port_was_provided=0
fi
PID_FILE="$SCRIPT_DIR/logs/proxy-server.pid"
stopped=0

if [[ -f "$SCRIPT_DIR/.env" ]]; then
  env_port="$(awk -F= '/^[[:space:]]*PORT=/ {print $2}' "$SCRIPT_DIR/.env" | tail -n 1 | tr -d '[:space:]"')"
  if [[ -n "$env_port" && "$port_was_provided" -eq 0 ]]; then
    PORT="$env_port"
  fi
fi

process_cwd() {
  lsof -a -p "$1" -d cwd -Fn 2>/dev/null | sed -n 's/^n//p' | head -n 1 || true
}

process_command() {
  ps -p "$1" -o command= 2>/dev/null || true
}

is_proxy_server_pid() {
  local pid="$1"
  local cwd
  local command

  cwd="$(process_cwd "$pid")"
  command="$(process_command "$pid")"

  [[ "$cwd" == "$SCRIPT_DIR" || "$command" == *"$SCRIPT_DIR/index.js"* ]]
}

wait_for_exit() {
  local pid="$1"

  for _ in $(seq 1 30); do
    if ! kill -0 "$pid" 2>/dev/null; then
      return 0
    fi
    sleep 0.1
  done

  return 1
}

stop_pid() {
  local pid="$1"
  local label="$2"

  if [[ ! "$pid" =~ ^[0-9]+$ ]] || ! kill -0 "$pid" 2>/dev/null; then
    return 1
  fi

  if ! is_proxy_server_pid "$pid"; then
    echo "跳过非本项目 proxy-server 进程: pid=$pid"
    return 1
  fi

  kill "$pid" 2>/dev/null || true
  if ! wait_for_exit "$pid"; then
    kill -KILL "$pid" 2>/dev/null || true
  fi

  echo "已停止 $label: pid=$pid"
  stopped=1
}

if [[ -f "$PID_FILE" ]]; then
  pid="$(tr -d '[:space:]' < "$PID_FILE")"
  stop_pid "$pid" "pid 文件中的 proxy-server" || true
  rm -f "$PID_FILE"
fi

if command -v lsof >/dev/null 2>&1; then
  while IFS= read -r pid; do
    [[ -z "$pid" ]] && continue
    stop_pid "$pid" "监听 $PORT 的 proxy-server" || true
  done < <(lsof -tiTCP:"$PORT" -sTCP:LISTEN 2>/dev/null || true)
else
  echo "警告: 未找到 lsof，无法检查端口 $PORT 是否仍被占用。"
fi

if [[ "$stopped" -eq 0 ]]; then
  echo "未发现需要停止的 proxy-server。"
fi
