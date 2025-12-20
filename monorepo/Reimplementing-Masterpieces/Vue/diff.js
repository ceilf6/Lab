/*
// 虚拟DOM vnode 结构
const vnode = {
  tag: 'div',
  key: 'unique-id',     // 可选
  props: { id: 'app' },
  children: [
    { tag: 'p', key: 'a', children: 'hello' },
    { tag: 'p', key: 'b', children: 'world' },
  ]
}
*/


// 渲染真实DOM
function createElement(vnode) {
  const el = document.createElement(vnode.tag);
  vnode.el = el;

  if (vnode.props) {
    for (let key in vnode.props) {
      el.setAttribute(key, vnode.props[key]);
    }
  }

  if (typeof vnode.children === 'string') {
    el.textContent = vnode.children;
  } else if (Array.isArray(vnode.children)) {
    vnode.children.forEach(child => {
      el.appendChild(createElement(child));
    });
  }

  return el;
}



function patch(parent, oldVNode, newVNode) {
  // 节点为空直接新增
  if (!oldVNode) {
    parent.appendChild(createElement(newVNode));
    return;
  }

  // 1. 标签不同，直接替换
  if (oldVNode.tag !== newVNode.tag) {
    const newEl = createElement(newVNode);
    parent.replaceChild(newEl, oldVNode.el);
    return;
  }

  // 2. 标签相同、属性不同：复用元素，更新属性
  const el = (newVNode.el = oldVNode.el);

  const oldProps = oldVNode.props || {};
  const newProps = newVNode.props || {};
  for (const key in newProps) {
    el.setAttribute(key, newProps[key]);
  }
  for (const key in oldProps) {
    if (!(key in newProps)) {
      el.removeAttribute(key);
    }
  }

  // 4. 文本不同：直接textContent
  if (typeof newVNode.children === 'string') {
    if (newVNode.children !== oldVNode.children) {
      el.textContent = newVNode.children;
    }
    return;
  }

  // 3. 子节点不同：双端比较
  const oldChildren = oldVNode.children || [];
  const newChildren = newVNode.children || [];

  let oldStart = 0, newStart = 0;
  let oldEnd = oldChildren.length - 1;
  let newEnd = newChildren.length - 1;

  const oldKeyMap = {};
  for (let i = oldStart; i <= oldEnd; i++) {
    const key = oldChildren[i].key;
    if (key != null) oldKeyMap[key] = i;
  }

  while (oldStart <= oldEnd && newStart <= newEnd) {
    const oldStartNode = oldChildren[oldStart];
    const oldEndNode = oldChildren[oldEnd];
    const newStartNode = newChildren[newStart];
    const newEndNode = newChildren[newEnd];

    if (!oldStartNode) {
      oldStart++;
    } else if (!oldEndNode) {
      oldEnd--;
    // 双端相同：继续
    } else if (sameVNode(oldStartNode, newStartNode)) {
      patch(el, oldStartNode, newStartNode);
      oldStart++; newStart++;
    } else if (sameVNode(oldEndNode, newEndNode)) {
      patch(el, oldEndNode, newEndNode);
      oldEnd--; newEnd--;
    // 头尾相同：复用
    } else if (sameVNode(oldStartNode, newEndNode)) {
      patch(el, oldStartNode, newEndNode);
      el.insertBefore(oldStartNode.el, oldEndNode.el.nextSibling);
      oldStart++; newEnd--;
    } else if (sameVNode(oldEndNode, newStartNode)) {
      patch(el, oldEndNode, newStartNode);
      el.insertBefore(oldEndNode.el, oldStartNode.el);
      oldEnd--; newStart++;
    } else {
      // 用 key 快速识别复用
      const idxInOld = oldKeyMap[newStartNode.key];
      if (idxInOld != null) {
        const moveNode = oldChildren[idxInOld];
        patch(el, moveNode, newStartNode);
        el.insertBefore(moveNode.el, oldStartNode.el);
        oldChildren[idxInOld] = undefined; // 占位
      } else {
        // 新节点
        el.insertBefore(createElement(newStartNode), oldStartNode.el);
      }
      newStart++;
    }
  }

  // 处理结束后：若旧有剩：删除
  while (oldStart <= oldEnd) {
    const oldNode = oldChildren[oldStart++];
    if (oldNode) el.removeChild(oldNode.el);
  }
  // 若新有剩：新增
  while (newStart <= newEnd) {
    const newNode = newChildren[newStart++];
    el.appendChild(createElement(newNode));
  }
}

// 辅助判断是否相同节点
function sameVNode(a, b) {
  return a.tag === b.tag && a.key === b.key;
}