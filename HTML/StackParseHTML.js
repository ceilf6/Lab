const stack = []
root = document
current = root

for (token in tokens)
    if (token in startTag) {
        node = createNode(token)
        current.appendChild(node)
        stack.push(node)
        current = node
    }
    else if (token in endTag) {
        stack.pop()
        current = stack.top()
    }

// 此外 Webkit 还做了 状态机 + 特殊规则