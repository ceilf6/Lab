import { useState, useEffect, useCallback, useRef } from 'react';

// MCP 服务器地址
const MCP_SERVER = 'http://localhost:8080';

// 工具类型定义
interface Tool {
  description: string;
  parameters: Record<string, any>;
}

interface Document {
  name: string;
  path: string;
  size: number;
  modified: string;
}

interface SSEMessage {
  type: 'connected' | 'tools' | 'heartbeat' | 'start' | 'result' | 'done' | 'error';
  message?: string;
  tools?: string[];
  data?: any;
  error?: string;
  time?: string;
}

// 主组件
export default function WordMCPClient() {
  const [connected, setConnected] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [logsCollapsed, setLogsCollapsed] = useState(false);

  const [userInput, setUserInput] = useState('');

  const eventSourceRef = useRef<EventSource | null>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // 滚动日志到底部
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // 添加日志
  const addLog = useCallback((message: string, type: 'info' | 'success' | 'error' | 'agent' = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    const logPrefix = {
      info: 'ℹ️',
      success: '✅',
      error: '❌',
      agent: '🤖'
    }[type];
    setLogs(prev => [...prev.slice(-99), `${logPrefix} [${timestamp}] ${message}`]);
  }, []);

  // 清空日志
  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  // 复制日志到剪贴板
  const copyLogs = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(logs.join('\n'));
      addLog('日志已复制到剪贴板', 'success');
    } catch (e) {
      addLog('复制失败', 'error');
    }
  }, [logs, addLog]);

  // 建立 SSE 连接
  const connectSSE = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    addLog('正在连接 SSE...');
    const es = new EventSource(`${MCP_SERVER}/sse`);

    es.onopen = () => {
      setConnected(true);
      addLog('SSE 连接已建立');
    };

    es.onmessage = (event) => {
      try {
        const data: SSEMessage = JSON.parse(event.data);

        switch (data.type) {
          case 'connected':
            addLog(`服务器: ${data.message}`);
            break;
          case 'tools':
            addLog(`可用工具: ${data.tools?.join(', ')}`);
            break;
          case 'heartbeat':
            // 静默处理心跳
            break;
        }
      } catch (e) {
        console.error('解析 SSE 消息失败:', e);
      }
    };

    es.onerror = () => {
      setConnected(false);
      addLog('SSE 连接断开');
      es.close();
    };

    eventSourceRef.current = es;
  }, [addLog]);

  // 获取工具列表
  const fetchTools = useCallback(async () => {
    try {
      const res = await fetch(`${MCP_SERVER}/tools`);
      const data = await res.json();
      setTools(data.tools || {});
      addLog(`获取到 ${Object.keys(data.tools || {}).length} 个工具`, 'info');
    } catch (e) {
      addLog(`获取工具列表失败: ${e}`, 'error');
    }
  }, [addLog]);

  // 获取文档列表
  const fetchDocuments = useCallback(async () => {
    try {
      const res = await fetch(`${MCP_SERVER}/documents`);
      const data = await res.json();
      if (data.success) {
        setDocuments(data.documents || []);
        addLog(`获取到 ${data.count} 个文档`, 'info');
      }
    } catch (e) {
      addLog(`获取文档列表失败: ${e}`, 'error');
    }
  }, [addLog]);

  // 调用工具 (SSE 方式)
  const callTool = useCallback(async (tool: string, params: Record<string, any>) => {
    setLoading(true);
    setResult(null);
    addLog(`Agent 正在执行: ${tool}...`, 'agent');

    try {
      const res = await fetch(`${MCP_SERVER}/sse/call`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool, params })
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('无法读取响应流');
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value);
        const lines = text.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data: SSEMessage = JSON.parse(line.slice(6));

              switch (data.type) {
                case 'start':
                  addLog(`开始执行工具: ${tool}`, 'info');
                  break;
                case 'result':
                  setResult(data.data);
                  if (data.data?.success) {
                    addLog(`执行成功: ${data.data?.message || '操作完成'}`, 'success');
                  } else {
                    addLog(`执行失败: ${data.data?.error || '未知错误'}`, 'error');
                  }
                  break;
                case 'error':
                  addLog(`Agent 报错: ${data.error}`, 'error');
                  break;
                case 'done':
                  addLog('工具执行结束', 'info');
                  break;
              }
            } catch (e) {
              // 忽略解析错误
            }
          }
        }
      }

      // 刷新文档列表
      await fetchDocuments();
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : String(e);
      addLog(`调用失败: ${errorMsg}`, 'error');
    } finally {
      setLoading(false);
    }
  }, [addLog, fetchDocuments]);

  // 处理聊天输入
  const handleChat = async () => {
    if (!userInput.trim() || loading) return;

    const query = userInput.trim();
    setUserInput('');
    addLog(`用户: ${query}`, 'info');

    // 简单的关键词匹配 (作为临时 Agent 逻辑)
    if (query.toLowerCase().includes('列出') || query.toLowerCase().includes('list')) {
      await callTool('list_documents', {});
    } else if (query.toLowerCase().startsWith('读取') || query.toLowerCase().startsWith('read')) {
      const filename = query.split(' ')[1];
      if (filename) {
        await callTool('read_document', { filename });
      } else {
        addLog('请指定文件名，例如: 读取 my_doc', 'error');
      }
    } else if (query.toLowerCase().startsWith('删除') || query.toLowerCase().startsWith('delete')) {
      const filename = query.split(' ')[1];
      if (filename) {
        await callTool('delete_document', { filename });
      } else {
        addLog('请指定文件名，例如: 删除 my_doc', 'error');
      }
    } else if (query.toLowerCase().startsWith('创建') || query.toLowerCase().startsWith('create')) {
      const parts = query.split(' ');
      const filename = parts[1];
      const content = parts.slice(2).join(' ');
      await callTool('create_document', {
        filename: filename || `doc_${Date.now()}`,
        content: content || '新文档内容'
      });
    } else {
      addLog('目前支持指令: [列出], [读取 文件名], [创建 文件名 内容], [删除 文件名]', 'info');
    }
  };

  // 初始化
  useEffect(() => {
    connectSSE();
    fetchTools();
    fetchDocuments();

    return () => {
      eventSourceRef.current?.close();
    };
  }, [connectSSE, fetchTools, fetchDocuments]);

  return (
    <div className="min-h-dvh bg-[#0a0a0a] text-slate-200 selection:bg-blue-500/30">
      {/* 顶部状态栏 */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 shadow-lg shadow-blue-500/20">
              <span className="text-sm font-bold text-white">W</span>
            </div>
            <div>
              <h1 className="text-sm font-semibold tracking-tight text-slate-100">Word Agent</h1>
              <div className="flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${connected ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]'}`} />
                <span className="text-[10px] uppercase tracking-wider text-slate-500">{connected ? 'Online' : 'Offline'}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={connectSSE}
              className="rounded-full bg-white/5 px-3 py-1 text-[11px] font-medium text-slate-400 transition hover:bg-white/10 hover:text-slate-200"
            >
              重连
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl">
        {/* 主交互区 */}
        <main className="flex-1 px-4 py-6 sm:px-6">
          <div className="flex flex-col gap-6">

            {/* 交互输入框 (ChatGPT 风格) */}
            <div className="relative z-10 mx-auto w-full max-w-3xl">
              <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/5 p-1 shadow-2xl transition-all focus-within:border-blue-500/50 focus-within:ring-4 focus-within:ring-blue-500/10">
                <div className="flex items-end gap-2 p-2">
                  <label className="sr-only">输入指令</label>
                  <textarea
                    rows={1}
                    aria-label="输入指令"
                    value={userInput}
                    onChange={(e) => {
                      setUserInput(e.target.value);
                      e.target.style.height = 'auto';
                      e.target.style.height = e.target.scrollHeight + 'px';
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleChat();
                      }
                    }}
                    placeholder="问问 Agent 想要做什么？ 例如：列出文档、创建 doc1 内容..."
                    className="max-h-60 w-full resize-none rounded-xl border border-transparent bg-transparent px-3 py-2 text-base text-slate-100 placeholder:text-slate-500 focus:border-blue-400 focus:bg-white/2 focus:outline-none"
                  />
                  <button
                    onClick={handleChat}
                    disabled={!userInput.trim() || loading}
                    title="发送"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600"
                  >
                    {loading ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                    ) : (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* 快捷标签 */}
              <div className="mt-3 flex flex-wrap gap-2 px-2">
                {['列出文档', '创建测试文档', '读取 my_intro'].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => {
                      setUserInput(cmd === '创建测试文档' ? '创建 test_doc 这里是文档内容' : cmd);
                    }}
                    className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-[11px] text-slate-400 transition hover:border-white/20 hover:bg-white/10 hover:text-slate-200"
                  >
                    {cmd}
                  </button>
                ))}
              </div>
            </div>

            {/* Agent 日志框 */}
            <div className="mx-auto w-full max-w-3xl">
              <div className="flex items-center justify-between px-2 py-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium uppercase tracking-wider text-slate-500">Agent Operations</span>
                  <span className="text-[10px] text-slate-600">{logs.length} events</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={copyLogs} className="rounded-md bg-white/5 px-2 py-1 text-[11px] text-slate-300 hover:bg-white/10">复制</button>
                  <button onClick={() => setLogsCollapsed(!logsCollapsed)} className="rounded-md bg-white/5 px-2 py-1 text-[11px] text-slate-300 hover:bg-white/10">{logsCollapsed ? '展开' : '收起'}</button>
                  <button onClick={clearLogs} className="rounded-md bg-rose-600/10 px-2 py-1 text-[11px] text-rose-300 hover:bg-rose-600/20">清空</button>
                </div>
              </div>
              {!logsCollapsed && (
                <div className="h-[420px] overflow-y-auto rounded-2xl border border-white/5 bg-[#0d0d0d] p-4 shadow-inner custom-scrollbar" role="log" aria-live="polite">
                  <div className="space-y-4">
                    {logs.length === 0 ? (
                      <div className="flex h-[260px] flex-col items-center justify-center text-center opacity-40">
                        <div className="mb-4 rounded-full bg-white/5 p-4 text-3xl">🤖</div>
                        <p className="text-sm">Agent 等待指令中...</p>
                      </div>
                    ) : (
                      logs.map((log, i) => {
                        const isUser = log.includes('ℹ️ [') && log.includes('用户:');
                        const iconMatch = log.match(/^(.+?)\s/);
                        const icon = iconMatch ? iconMatch[1] : '';
                        const time = log.match(/\[(.*?)\]/)?.[1];
                        const message = log.split('] ').slice(1).join('] ');
                        return (
                          <div key={i} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                            <div
                              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm flex flex-col ${isUser
                                  ? 'bg-blue-600 text-white'
                                  : log.includes('❌')
                                    ? 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                                    : log.includes('✅')
                                      ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                                      : 'bg-white/5 text-slate-300 border border-white/5'
                                }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className="text-lg leading-none">{icon}</div>
                                <div className="whitespace-pre-wrap leading-relaxed">{message}</div>
                              </div>
                              <div className={`mt-1 text-[9px] ${isUser ? 'text-blue-200' : 'text-slate-500'}`}>
                                {time}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                    <div ref={logsEndRef} />
                  </div>
                </div>
              )}

              {/* 执行结果卡片 (如果是 JSON 对象且存在时显示) */}
              {result && (
                <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50">
                  <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-4 py-2">
                    <span className="text-xs font-medium text-slate-400">执行详情 (JSON)</span>
                    <button onClick={() => setResult(null)} className="text-slate-500 hover:text-white">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <pre className="max-h-60 overflow-auto p-4 text-[11px] leading-relaxed text-blue-300 custom-scrollbar">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* 右侧文档侧边栏 */}
        <aside className="hidden w-80 shrink-0 border-l border-white/5 bg-[#0a0a0a] py-6 lg:block">
          <div className="px-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Documents</h2>
              <button
                onClick={fetchDocuments}
                className="rounded-lg p-1 text-slate-500 transition hover:bg-white/5 hover:text-slate-300"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>

            <div className="space-y-2">
              {documents.length === 0 ? (
                <div className="rounded-xl border border-dashed border-white/10 p-8 text-center">
                  <p className="text-xs text-slate-600">No documents found</p>
                </div>
              ) : (
                documents.map((doc) => (
                  <button
                    key={doc.path}
                    onClick={() => {
                      setUserInput(`读取 ${doc.name.replace('.docx', '')}`);
                    }}
                    className="group flex w-full flex-col gap-1 rounded-xl border border-transparent bg-white/5 p-3 text-left transition hover:border-white/10 hover:bg-white/10"
                  >
                    <span className="truncate text-sm font-medium text-slate-300 group-hover:text-white">{doc.name}</span>
                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span>{(doc.size / 1024).toFixed(1)} KB</span>
                      <span>{new Date(doc.modified).toLocaleDateString()}</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </aside>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #222;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #333;
        }
      ` }} />
    </div>
  );
}

