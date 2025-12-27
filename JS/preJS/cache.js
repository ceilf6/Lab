function cache(fn) {
    const memo = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (memo.has(key)) {
            return memo.get(key);
        }
        const result = fn.apply(this, args);
        memo.set(key, result);
        return result;
    }
}