export default (func, ...types) => {
    return new Proxy(func, {
        apply(target, thisArgument, args) {
            types.forEach((type, idx) => {
                if (typeof args[idx] !== type) {
                    throw new TypeError(`第${idx + 1}参数类型有问题`)
                }
            })
            return Reflect.apply(target, thisArgument, args) // 上面都没报错才调用底层API执行
        }
    })
}