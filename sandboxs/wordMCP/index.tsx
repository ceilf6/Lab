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

// 消息类型：用户消息、助手回复、系统日志
interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  logType?: 'info' | 'success' | 'error' | 'working';
}

// 主组件
export default function WordMCPClient() {
  const [connected, setConnected] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [tools, setTools] = useState<Record<string, Tool>>({});
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');

  const eventSourceRef = useRef<EventSource | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 滚动消息到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 添加消息（支持用户、助手、系统日志）
  const addMessage = useCallback((
    role: 'user' | 'assistant' | 'system',
    content: string,
    logType?: 'info' | 'success' | 'error' | 'working'
  ) => {
    setMessages(prev => [...prev, {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      role,
      content,
      timestamp: new Date(),
      logType
    }]);
  }, []);

  // 添加系统日志（显示在对话中）
  const addLog = useCallback((message: string, type: 'info' | 'success' | 'error' | 'working' = 'info') => {
    addMessage('system', message, type);
  }, [addMessage]);

  // 建立 SSE 连接
  const connectSSE = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const es = new EventSource(`${MCP_SERVER}/sse`);

    es.onopen = () => {
      setConnected(true);
    };

    es.onmessage = (event) => {
      try {
        const data: SSEMessage = JSON.parse(event.data);
        switch (data.type) {
          case 'connected':
            // 静默处理
            break;
          case 'tools':
            // 静默处理
            break;
          case 'heartbeat':
            break;
        }
      } catch (e) {
        console.error('解析 SSE 消息失败:', e);
      }
    };

    es.onerror = () => {
      setConnected(false);
      es.close();
    };

    eventSourceRef.current = es;
  }, []);

  // 获取工具列表
  const fetchTools = useCallback(async () => {
    try {
      const res = await fetch(`${MCP_SERVER}/tools`);
      const data = await res.json();
      setTools(data.tools || {});
    } catch (e) {
      // 静默处理
    }
  }, []);

  // 获取文档列表
  const fetchDocuments = useCallback(async () => {
    try {
      const res = await fetch(`${MCP_SERVER}/documents`);
      const data = await res.json();
      if (data.success) {
        setDocuments(data.documents || []);
      }
    } catch (e) {
      // 静默处理
    }
  }, []);

  // 调用工具 (SSE 方式)
  const callTool = useCallback(async (tool: string, params: Record<string, any>) => {
    setLoading(true);
    
    // 显示正在执行的工具
    const toolNames: Record<string, string> = {
      'list_documents': '列出文档',
      'read_document': '读取文档',
      'create_document': '创建文档',
      'delete_document': '删除文档'
    };
    addLog(`正在调用工具: ${toolNames[tool] || tool}`, 'working');

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

      let resultContent = '';

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
                  addLog('开始执行...', 'info');
                  break;
                case 'result':
                  if (data.data?.success) {
                    addLog('执行成功', 'success');
                    resultContent = data.data?.message || JSON.stringify(data.data, null, 2);
                  } else {
                    addLog(`执行失败: ${data.data?.error || '未知错误'}`, 'error');
                    resultContent = `错误: ${data.data?.error || '未知错误'}`;
                  }
                  break;
                case 'error':
                  addLog(`错误: ${data.error}`, 'error');
                  resultContent = `错误: ${data.error}`;
                  break;
                case 'done':
                  // 静默处理
                  break;
              }
            } catch (e) {
              // 忽略解析错误
            }
          }
        }
      }

      if (resultContent) {
        addMessage('assistant', resultContent);
      }

      await fetchDocuments();
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : String(e);
      addLog(`调用失败: ${errorMsg}`, 'error');
      addMessage('assistant', `抱歉，执行出错: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  }, [addLog, addMessage, fetchDocuments]);

  // 处理聊天输入
  const handleChat = async () => {
    if (!userInput.trim() || loading) return;

    const query = userInput.trim();
    setUserInput('');
    addMessage('user', query);

    // 简单的关键词匹配
    if (query.toLowerCase().includes('列出') || query.toLowerCase().includes('list')) {
      await callTool('list_documents', {});
    } else if (query.toLowerCase().startsWith('读取') || query.toLowerCase().startsWith('read')) {
      const filename = query.split(' ')[1];
      if (filename) {
        await callTool('read_document', { filename });
      } else {
        addMessage('assistant', '请指定文件名，例如: 读取 my_doc');
      }
    } else if (query.toLowerCase().startsWith('删除') || query.toLowerCase().startsWith('delete')) {
      const filename = query.split(' ')[1];
      if (filename) {
        await callTool('delete_document', { filename });
      } else {
        addMessage('assistant', '请指定文件名，例如: 删除 my_doc');
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
      addMessage('assistant', '支持的指令:\n• 列出 - 查看所有文档\n• 读取 [文件名] - 读取文档内容\n• 创建 [文件名] [内容] - 创建新文档\n• 删除 [文件名] - 删除文档');
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

  // 渲染消息
  const renderMessage = (msg: Message) => {
    // 系统日志消息
    if (msg.role === 'system') {
      const icons: Record<string, string> = {
        info: '○',
        success: '✓',
        error: '✗',
        working: '◎'
      };
      const colors: Record<string, string> = {
        info: '#6b7280',
        success: '#10b981',
        error: '#ef4444',
        working: '#f59e0b'
      };
      
      return (
        <div key={msg.id} style={styles.systemMessage}>
          <span style={{ 
            ...styles.systemIcon, 
            color: colors[msg.logType || 'info'],
            animation: msg.logType === 'working' ? 'pulse 1.5s infinite' : 'none'
          }}>
            {icons[msg.logType || 'info']}
          </span>
          <span style={{ ...styles.systemText, color: colors[msg.logType || 'info'] }}>
            {msg.content}
          </span>
        </div>
      );
    }

    // 用户/助手消息
    return (
      <div
        key={msg.id}
        style={{
          ...styles.messageRow,
          justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
        }}
      >
        <div
          style={{
            ...styles.messageBubble,
            ...(msg.role === 'user' ? styles.userBubble : styles.assistantBubble)
          }}
        >
          <div style={styles.messageContent}>{msg.content}</div>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      {/* 主内容区 */}
      <div style={styles.main}>
        {/* 头部标题 */}
        <div style={styles.header}>
          <h1 style={styles.title}>Word Agent</h1>
          <div style={styles.status}>
            <span style={{
              ...styles.statusDot,
              backgroundColor: connected ? '#10b981' : '#ef4444',
              boxShadow: connected ? '0 0 8px #10b981' : '0 0 8px #ef4444'
            }} />
            <span style={styles.statusText}>{connected ? '已连接' : '未连接'}</span>
          </div>
        </div>

        {/* 对话区域 */}
        <div style={styles.chatContainer}>
          <div style={styles.messagesWrapper} className="messages-scroll">
            {messages.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>📄</div>
                <p style={styles.emptyTitle}>Word 文档助手</p>
                <p style={styles.emptySubtitle}>输入指令来管理你的 Word 文档</p>
                <div style={styles.suggestions}>
                  {['列出文档', '创建 test 测试内容', '读取 my_intro'].map((cmd) => (
                    <button
                      key={cmd}
                      onClick={() => setUserInput(cmd)}
                      style={styles.suggestionBtn}
                    >
                      {cmd}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div style={styles.messagesList}>
                {messages.map(renderMessage)}
                {loading && (
                  <div style={styles.systemMessage}>
                    <span style={{ ...styles.systemIcon, color: '#f59e0b', animation: 'pulse 1.5s infinite' }}>◎</span>
                    <span style={{ ...styles.systemText, color: '#f59e0b' }}>思考中...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* 输入框 */}
          <div style={styles.inputWrapper}>
            <div style={styles.inputContainer}>
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleChat();
                  }
                }}
                placeholder="输入指令..."
                style={styles.textarea}
                rows={1}
              />
              <button
                onClick={handleChat}
                disabled={!userInput.trim() || loading}
                style={{
                  ...styles.sendBtn,
                  opacity: (!userInput.trim() || loading) ? 0.5 : 1,
                  cursor: (!userInput.trim() || loading) ? 'not-allowed' : 'pointer'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 全局样式 */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes typing {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-4px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        
        .messages-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .messages-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .messages-scroll::-webkit-scrollbar-thumb {
          background: #374151;
          border-radius: 6px;
        }
        
        textarea:focus {
          outline: none;
        }
        
        button:hover:not(:disabled) {
          filter: brightness(1.1);
        }
      `}} />
    </div>
  );
}

// 样式定义
const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100dvh',
    backgroundColor: '#212121',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  
  main: {
    width: '100%',
    maxWidth: '680px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 4px',
  },
  
  title: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#ffffff',
    margin: 0,
    letterSpacing: '-0.02em',
  },
  
  status: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  
  statusDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
  },
  
  statusText: {
    fontSize: '13px',
    color: '#9ca3af',
  },
  
  chatContainer: {
    backgroundColor: '#2f2f2f',
    borderRadius: '16px',
    border: '1px solid #424242',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  
  messagesWrapper: {
    height: '520px',
    overflowY: 'auto',
    padding: '24px',
  },
  
  emptyState: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  
  emptyIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  
  emptyTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#ffffff',
    margin: '0 0 8px 0',
  },
  
  emptySubtitle: {
    fontSize: '14px',
    color: '#9ca3af',
    margin: '0 0 24px 0',
  },
  
  suggestions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    justifyContent: 'center',
  },
  
  suggestionBtn: {
    padding: '8px 16px',
    fontSize: '13px',
    color: '#d1d5db',
    backgroundColor: '#424242',
    border: '1px solid #525252',
    borderRadius: '20px',
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
  
  messagesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  
  messageRow: {
    display: 'flex',
    width: '100%',
  },
  
  messageBubble: {
    maxWidth: '85%',
    padding: '12px 16px',
    borderRadius: '18px',
    fontSize: '14px',
    lineHeight: 1.5,
  },
  
  userBubble: {
    backgroundColor: '#10a37f',
    color: '#ffffff',
    borderBottomRightRadius: '4px',
  },
  
  assistantBubble: {
    backgroundColor: '#424242',
    color: '#ececec',
    borderBottomLeftRadius: '4px',
  },
  
  messageContent: {
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
  
  // 系统日志样式
  systemMessage: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 12px',
    marginLeft: '8px',
  },
  
  systemIcon: {
    fontSize: '12px',
    fontWeight: 700,
  },
  
  systemText: {
    fontSize: '12px',
    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
  },
  
  inputWrapper: {
    padding: '16px',
    borderTop: '1px solid #424242',
    backgroundColor: '#2f2f2f',
  },
  
  inputContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '12px',
    backgroundColor: '#424242',
    borderRadius: '12px',
    padding: '12px 16px',
    border: '1px solid #525252',
  },
  
  textarea: {
    flex: 1,
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ffffff',
    fontSize: '14px',
    lineHeight: 1.5,
    resize: 'none',
    minHeight: '24px',
    maxHeight: '120px',
  },
  
  sendBtn: {
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10a37f',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    transition: 'all 0.15s',
    flexShrink: 0,
  },
};
