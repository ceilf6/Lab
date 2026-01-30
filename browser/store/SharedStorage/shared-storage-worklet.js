class MyOperation {
    async run(data) {
        // 从 Shared Storage 读取数据
        const group = await sharedStorage.get('experiment_group');
        const count = await sharedStorage.get('view_count');

        // 根据规则做决策（但不泄露原始值）
        if (group === 'A' && count > data.threshold) {
            // 可以触发一次“匿名信号”
            // 比如用于归因、频控、选择 URL 等
            return;
        }
    }
}

// 注册 operation 名称
register('my-operation', MyOperation);