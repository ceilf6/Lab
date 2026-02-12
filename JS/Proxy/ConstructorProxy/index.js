export default (Class, ...propNames) => {
    return new Proxy(Class, {
        construct(target, args) {
            const obj = Reflect.construct(target, args) // 第二个参数规定是args数组 // 拿到底层API后的结果

            // for (let i = 0; i < propNames.length; i++) {
            //     Object.defineProperty(obj, propNames[i], {
            //         value: args[i], // 
            //         writable: true,
            //         enumerable: true,
            //         configurable: true
            //     })
            // }
            propNames.forEach((name, idx) => {
                obj[name] = args[idx]
            })

            return obj
        }
    })
}