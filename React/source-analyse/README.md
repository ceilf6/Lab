- 许多 FiberNode对象 通过链表串联用于表示 虚拟树
    - hook对象串联成的 链表用于实现一个 FiberNode函数组件 的状态变更
        
        FiberNode.memoizedState 存储其 hook链表 的头节点
        
        - 每一个 hook 又有自己的一个 updateQueue 链表队列，在遍历 update 后 ⇒ state