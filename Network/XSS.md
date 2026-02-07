## 客户端

虽然可以对用户输入可以过滤，但是攻击者可以直接改请求、抓包、注入恶意数据

所以关键点在于不相信用户的输入，重点要避免危险的DOM API，例如

1. 不要用 innerHTML
    
    而是用 textContent 只进行文本渲染: element.textContent = userInput;
    
2. 不要用 document.write
3. 通过实体字符进行编码
    
    ```jsx
    function escapeHTML(str) {
      return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    }
    ```
    
4. 成熟库 DOMPurify
    
    ```jsx
    import DOMPurify from "dompurify";
    
    const clean = DOMPurify.sanitize(dirtyHTML);
    element.innerHTML = clean;
    ```
    
5. 前端配合后端设置 CSP 内容安全策略
    
    ```jsx
    Content-Security-Policy:
      default-src 'self';
      script-src 'self';
    ```
    

还有例如 Vue 框架的大胡子语法、以及 React库的 { } 注入语法都会自动对内容进行识别和防范处理

## 服务器端

对用户提交的内容进行过滤或编码

- **过滤**：去掉一些危险的**标签**，去掉一些危险的**属性**，例如**请求资源的链接地址**
- 编码：对危险的标签进行HTML实体编码
- httponly 设置cookie仅用于传输，防止**通过JS读取cookie**